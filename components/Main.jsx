import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCurrentUser } from '../redux/actions/index'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Profile from './main/Profile'
import UserProfile from './main/UserProfile'
import Feed from './main/Feed'
import Search from './main/Search'
import CustomTabBar from './general/CustomTabBar'
import AnimationContainer from './general/AnimatedContainer'
import { forSlide } from './styles/animations'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Dummy = () => null

const routes = [
    {
        name: 'Feed',
        Icon: (props) => <MaterialCommunityIcons name="home" {...props} />,
        component: Feed,
    },
    {
        name: 'Search',
        Icon: (props) => <MaterialCommunityIcons name="magnify" {...props} />,
        component: Search,
    },
    {
        name: 'Dummy',
        Icon: (props) => <MaterialCommunityIcons name="plus-box" {...props} />,
        component: Dummy,
        listeners: ({ navigation }) => ({
            tabPress: (event) => {
                event.preventDefault()
                navigation.navigate('Camera')
            },
        }),
    },
    {
        name: 'UserProfile',
        Icon: (props) => <MaterialCommunityIcons name="account-circle" {...props} />,
        component: UserProfile,
    },
]

export default function Main() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((store) => ({
        currentUser: store.usersState.currentUser,
    }))

    useEffect(() => {
        dispatch(fetchCurrentUser())
    }, [])

    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            {routes.map(({ name, component, listeners, Icon }, i) => (
                <Tab.Screen
                    key={i}
                    name={name}
                    options={{
                        tabBarIcon: ({ color, size }) => <Icon color={color} size={30} />,
                    }}
                    listeners={listeners}
                >
                    {(props) => <InnerStack {...props} component={component} name={name} />}
                </Tab.Screen>
            ))}
        </Tab.Navigator>
    )
}

const InnerStack = ({ component, name, children, ...rest }) => {
    const Component = component ? component : children
    return (
        <Stack.Navigator initialRouteName={name}>
            <Stack.Screen
                name={name}
                options={{
                    headerShown: false,
                }}
            >
                {(props) => <Component {...props} {...rest} />}
            </Stack.Screen>
            <Stack.Screen name="Profile" options={{ cardStyleInterpolator: forSlide }}>
                {({ route: { params: { uid } = {} } = {} }) => <Profile uid={uid} />}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

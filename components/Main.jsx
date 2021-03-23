import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/index'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Profile from './main/Profile'
import Feed from './main/Feed'
import Search from './main/Search'
import CustomTabBar from './general/CustomTabBar'
import AnimationContainer from './general/AnimatedContainer'
import { forSlide } from './styles/animations'

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Dummy = () => null

export default function Main({ navigation }) {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((store) => ({
        currentUser: store.userState.currentUser,
    }))

    useEffect(() => {
        fetchUser(dispatch)
    }, [])

    return (
        <Tab.Navigator tabBar={(props) => <CustomTabBar {...props} />}>
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={30} />
                    ),
                }}
            />
            <Tab.Screen
                name="Search"
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="magnify" color={color} size={30} />
                    ),
                }}
            >
                {() => (
                    <Stack.Navigator initialRouteName="Search">
                        {/* //TODO: extract this somehow to every component ;) */}
                        <Stack.Screen component={Search} name="Search" />
                        <Stack.Screen
                            component={Profile}
                            name="Profile"
                            options={{ cardStyleInterpolator: forSlide }}
                        />
                    </Stack.Navigator>
                )}
            </Tab.Screen>
            <Tab.Screen
                name="Dummy"
                component={Dummy}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={30} />
                    ),
                    tabBarLabel: 'Add',
                }}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault()
                        navigation.navigate('Camera')
                    },
                })}
            />
            <Tab.Screen
                name="UserProfile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={30} />
                    ),
                }}
            />
            {/*  <Tab.Screen
                name="Profile"
                options={{
                    hidden: true,
                }}
            >
                {(props) => (
                    <AnimationContainer {...props}>
                        <Profile {...props} />
                    </AnimationContainer>
                )}
            </Tab.Screen> */}
        </Tab.Navigator>
    )
}

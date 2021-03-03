import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/index'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Profile from './main/Profile'
import Feed from './main/Feed'


const Tab = createBottomTabNavigator()

export default function Main() {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((store) => ({
        currentUser: store.userState.currentUser,
    }))

    useEffect(() => {
        fetchUser(dispatch)
    }, [])

    return (
        <Tab.Navigator>
            <Tab.Screen
                name="Feed"
                component={Feed}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="home" color={color} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add-dummy"
                component={() => null}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
                    ),
                    tabBarLabel: 'Add'
                }}
                listeners={({ navigation }) => ({
                    tabPress: (event) => {
                        event.preventDefault()
                        navigation.navigate('Add')
                    },
                })}
            />
            <Tab.Screen
                name="Profile"
                component={Profile}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-circle" color={color} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

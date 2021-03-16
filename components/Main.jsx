import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/index'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Profile from './main/Profile'
import Feed from './main/Feed'

const Tab = createBottomTabNavigator()

const Dummy = () => null

export default function Main({ navigation }) {
    const dispatch = useDispatch()
    const { currentUser } = useSelector((store) => ({
        currentUser: store.userState.currentUser,
    }))

    useEffect(() => {
        fetchUser(dispatch)
    }, [])

    //TODO: add custom navigation tab
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
                name="Dummy"
                component={Dummy}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="plus-box" color={color} size={26} />
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

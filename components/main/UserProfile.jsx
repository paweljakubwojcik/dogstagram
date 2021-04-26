import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import Header from '../general/Header'
import Feather from 'react-native-vector-icons/Feather'

import Profile from './Profile'

export default function UserProfileWrapper() {
    const { currentUser } = useSelector((store) => ({
        currentUser: store.usersState.currentUser,
    }))

    return (
        <>
            <Header>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        marginRight: 'auto',
                    }}
                >
                    {currentUser.username}
                </Text>
                <TouchableOpacity style={{ margin: 5 }}>
                    <Feather name="menu" size={28} />
                </TouchableOpacity>
            </Header>
            <Profile uid={currentUser.uid} />
        </>
    )
}

import React from 'react'
import { View, Text } from 'react-native'

import { useDispatch, useSelector } from 'react-redux'

import Profile from './Profile'

export default function UserProfileWrapper() {
    const { currentUser } = useSelector((store) => ({
        currentUser: store.userState.currentUser,
    }))

    return <Profile uid={currentUser.uid} />
}

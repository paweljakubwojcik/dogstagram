import React from 'react'

import { useSelector } from 'react-redux'

import Profile from './Profile'

export default function UserProfileWrapper() {
    const { currentUser } = useSelector((store) => ({
        currentUser: store.usersState.currentUser,
    }))

    return <Profile uid={currentUser.uid} />
}

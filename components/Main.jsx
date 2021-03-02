import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../redux/actions/index'

import { Text } from 'react-native'
import { Container } from './styles/commonStyles'


export default function Main() {
    const dispatch = useDispatch()
    const {currentUser} = useSelector((store) => ({
        currentUser: store.userState.currentUser,
    }))

    useEffect(() => {
        fetchUser(dispatch)
    }, [])

    return (
        <Container>
            <Text>Hello {currentUser?.name}</Text>
        </Container>
    )
}


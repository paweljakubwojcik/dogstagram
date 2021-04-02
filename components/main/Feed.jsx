import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Container } from '../styles/commonStyles'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUsersData } from '../../redux/actions'

export default function Feed() {
    const dispatch = useDispatch()
    const { users } = useSelector((store) => ({
        posts: store.usersState.feed,
        users: store.userState.following,
    }))

    console.log(users)

    useEffect(() => {
        users.forEach((user) => {
            dispatch(fetchUsersData(user))
        })
    }, [])

    return (
        <Container>
            <View>
                <Text>Feed</Text>
            </View>
        </Container>
    )
}

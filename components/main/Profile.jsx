import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../styles/commonStyles'
import Button from '../general/Button'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUserId, fetchUserData, fetchUserPosts } from '../../redux/actions/index'
import { followUser, logout, unFollowUser } from '../../services/firebase'

export default function Profile({ uid }) {
    const dispatch = useDispatch()

    const { isFollowing, isCurrentUser, posts, user } = useSelector((store) => {
        const isCurrentUser = uid === store.usersState.currentUser.uid
        return {
            isFollowing: store.usersState.currentUser.following.includes(uid),
            isCurrentUser,
            posts: store.postState.posts.filter((post) => post.owner === uid),
            user: isCurrentUser ? store.usersState.currentUser : store.usersState.users[uid],
        }
    })

    useEffect(() => {
        if (!user) {
            dispatch(fetchUserData(uid))
        }
        dispatch(fetchPostsByUserId(uid))
    }, [uid])

    const onFollow = () => {
        followUser(user.uid)
    }

    const onUnfollow = () => {
        unFollowUser(user.uid)
    }

    const onLogout = () => {
        logout()
    }

    console.log({ user, posts })

    if (!user)
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )

    return (
        <>
            <UserInfoContainer>
                <Text>{user?.fullName}</Text>
                {!isCurrentUser ? (
                    isFollowing ? (
                        <Button onPress={onUnfollow}>Following</Button>
                    ) : (
                        <Button onPress={onFollow}>Follow</Button>
                    )
                ) : (
                    <Button onPress={onLogout}>logout</Button>
                )}
            </UserInfoContainer>
            <Container>
                <FlatList
                    style={{
                        width: 400,
                    }}
                    numColumns={3}
                    horizontal={false}
                    data={posts}
                    renderItem={({ item }) => (
                        <ImageTile>
                            <Text>{item.URL}</Text>
                            <Image
                                style={{
                                    flex: 1,
                                    aspectRatio: 1 / 1,
                                }}
                                source={{ uri: item.URL }}
                            />
                        </ImageTile>
                    )}
                />
            </Container>
        </>
    )
}

const UserInfoContainer = styled.View`
    display: flex;
    justify-content: center;
    align-items: center;

    height: 200px;
`

const ImageTile = styled.View`
    width: 33%;
`

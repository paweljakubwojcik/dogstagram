import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../styles/commonStyles'
import Button from '../general/Button'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUserId, fetchUserPosts } from '../../redux/actions/index'
import {
    followUser,
    getUserById,
    getUserPosts,
    logout,
    unFollowUser,
} from '../../services/firebase'

export default function Profile({ uid }) {
    const dispatch = useDispatch()

    const { isFollowing, isCurrentUser, posts } = useSelector((store) => ({
        isFollowing: store.userState.following.includes(uid),
        isCurrentUser: uid === store.userState.currentUser.uid,
        posts: store.posts.filter((post) => post.owner === uid),
    }))

    const [user, setUser] = useState(null)

    useEffect(() => {
        if (!user || user?.uid !== uid) {
            ;(async () => {
                const user = await getUserById(uid)
                setUser(user)
            })()
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
                <Text>{user?.name}</Text>
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

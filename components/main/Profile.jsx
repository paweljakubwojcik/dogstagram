import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../styles/commonStyles'
import Button from '../general/Button'


import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPosts } from '../../redux/actions/index'
import {
    followUser,
    getUserById,
    getUserPosts,
    logout,
    unFollowUser,
} from '../../services/firebase'

export default function Profile({ route: { params } }) {
    const { isFollowing, currentUser } = useSelector((store) => ({
        isFollowing: params ? store.userState.following.includes(params?.uid) : false,
        currentUser: store.userState.currentUser,
    }))

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    const isCurrentUser = params?.uid === currentUser.uid || !params

    useEffect(() => {
        const uid = params ? params.uid : currentUser.uid

        if (!user || user?.uid !== uid) {
            setUser(null)
            setPosts([])
            ;(async () => {
                const user = await getUserById(uid)
                setUser(user)

                const posts = await getUserPosts(uid)
                setPosts(posts)
            })()
        }
    }, [params])

    const onFollow = () => {
        followUser(user.uid)
    }

    const onUnfollow = () => {
        unFollowUser(user.uid)
    }

    const onLogout = () => {
        logout()
    }

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

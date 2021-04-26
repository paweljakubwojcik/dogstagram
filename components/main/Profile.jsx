import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { BoldText, Container, FlexColumnContainer } from '../styles/commonStyles'
import Button from '../general/Button'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUserId, fetchUserData, fetchUserPosts } from '../../redux/actions/index'
import { followUser, logout, unFollowUser } from '../../services/firebase'
import Avatar from '../general/Avatar'

const width = Dimensions.get('window').width

export default function Profile({ uid }) {
    const dispatch = useDispatch()

    const { isFollowing, isCurrentUser, posts, user } = useSelector((store) => {
        const isCurrentUser = uid === store.usersState.currentUser.uid
        console.log(store)
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

    if (!user)
        return (
            <View>
                <Text>Loading</Text>
            </View>
        )

    return (
        <>
            <UserInfoContainer>
                <FlexRowContainer style={{ width: '100%', marginVertical: 10 }}>
                    <Avatar size={92} style={{ marginRight: 'auto' }} />
                    <Counter>
                        <CounterText>{user.followingCount}</CounterText>
                        <Text>Following</Text>
                    </Counter>
                    <Counter>
                        <CounterText>{user.followersCount}</CounterText>
                        <Text>Followers</Text>
                    </Counter>
                </FlexRowContainer>
                <View style={{ width: '100%' }}>
                    <BoldText>{user?.fullName || user?.username}</BoldText>
                    {!isCurrentUser ? (
                        isFollowing ? (
                            <Button onPress={onUnfollow}>Following</Button>
                        ) : (
                            <Button onPress={onFollow}>Follow</Button>
                        )
                    ) : (
                        <Button onPress={onLogout}>logout</Button>
                    )}
                </View>
            </UserInfoContainer>
            <Container>
                <FlatList
                    style={{ width }}
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

    padding: 15px;

    height: 200px;
`

const FlexRowContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`
const Counter = styled(FlexColumnContainer)`
    margin: 10px;
`

const CounterText = styled(BoldText)`
    font-size: 18px;
`

const ImageTile = styled.View`
    width: 33%;
`

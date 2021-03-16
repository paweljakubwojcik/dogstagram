import React, { useEffect } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../styles/commonStyles'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPosts } from '../../redux/actions/index'

export default function Profile() {
    const dispatch = useDispatch()
    const { currentUser, posts } = useSelector((store) => ({
        posts: store.userState.posts,
        currentUser: store.userState.currentUser,
    }))

    useEffect(() => {
        fetchUserPosts(dispatch)
    }, [])

    return (
        <>
            <UserInfoContainer>
                <Text>{currentUser?.name}</Text>
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

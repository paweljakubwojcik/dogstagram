import React, { useEffect, useState } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import styled from 'styled-components/native'
import { Container } from '../styles/commonStyles'
import Button from '../general/Button'

import firebase from 'firebase'

import { useDispatch, useSelector } from 'react-redux'
import { fetchUserPosts } from '../../redux/actions/index'

export default function Profile({ route: { params } }) {
    
    const { isFollowing } = useSelector((store) => ({
        isFollowing: params ? store.userState.following.includes(params?.uid) : false,
    }))

    const [posts, setPosts] = useState([])
    const [user, setUser] = useState(null)
    /* const [isFollowing, setFollowing] = useState(false) */
    const isCurrentUser = params?.uid === firebase.auth().currentUser.uid || !params

    useEffect(() => {
        const uid = params ? params.uid : firebase.auth().currentUser.uid

        if (!user || user?.uid !== uid) {
            setUser(null)
            setPosts([])

            firebase
                .firestore()
                .collection('users')
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        setUser({ ...snapshot.data(), uid })
                    } else {
                        console.log('does not exist')
                    }
                })

            firebase
                .firestore()
                .collection('post')
                .doc(uid)
                .collection('posts')
                .orderBy('creation', 'desc')
                .get()
                .then((snapshot) => {
                    const posts = snapshot.docs.map((doc) => {
                        const data = doc.data()
                        const id = doc.id
                        return { ...data, id }
                    })
                    setPosts(posts)
                })
                .catch((error) => console.error(error))
        }
    }, [params])

    const onFollow = () => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('following')
            .doc(user.uid)
            .set({})
    }

    const onUnfollow = () => {
        firebase
            .firestore()
            .collection('users')
            .doc(firebase.auth().currentUser.uid)
            .collection('following')
            .doc(user.uid)
            .delete()
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
                {!isCurrentUser &&
                    (isFollowing ? (
                        <Button onPress={onUnfollow}>Following</Button>
                    ) : (
                        <Button onPress={onFollow}>Follow</Button>
                    ))}
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

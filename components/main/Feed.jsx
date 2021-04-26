import React, { useEffect } from 'react'
import { FlatList, Dimensions, Text, View, Image } from 'react-native'
import { Container } from '../styles/commonStyles'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUserFollowing, fetchPostsByUserId, fetchUsersData } from '../../redux/actions'
import PostTile from '../general/PostTile'
import Header from '../general/Header'
import logo from '../../assets/Dogstagram_logo.png'

const width = Dimensions.get('window').width

export default function Feed({ navigation }) {
    const dispatch = useDispatch()
    const { posts, following, uid } = useSelector((store) => {
        const { uid, following } = store.usersState.currentUser
        const posts = store.postState.posts.filter(
            (post) =>
                following.includes(post.owner) || post.owner === store.usersState.currentUser.uid
        )
        return {
            posts,
            following,
            uid,
        }
    })

    console.log({ posts })

    useEffect(() => {
        dispatch(fetchPostsByUserFollowing(following))
        if (uid) dispatch(fetchPostsByUserId(uid))
    }, [following, uid])

    return (
        <Container>
            <Header>
                <Image
                    source={logo}
                    style={{
                        resizeMode: 'contain',
                        width: 120,
                        height: '100%',
                    }}
                />
            </Header>
            <FlatList
                style={{ width }}
                numColumns={1}
                horizontal={false}
                data={posts}
                renderItem={({ item }) => <PostTile post={item} navigation={navigation} />}
            />
        </Container>
    )
}

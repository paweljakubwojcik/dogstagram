import React, { useEffect } from 'react'
import { View, Text, FlatList, Image, Dimensions } from 'react-native'
import { Container } from '../styles/commonStyles'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUserFollowing, fetchPostsByUserId, fetchUsersData } from '../../redux/actions'
import PostTile from '../general/PostTile'

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

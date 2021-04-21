import React, { useEffect } from 'react'
import { View, Text } from 'react-native'
import { Container } from '../styles/commonStyles'

import { useDispatch, useSelector } from 'react-redux'
import { fetchPostsByUserFollowing, fetchUsersData } from '../../redux/actions'

export default function Feed() {
    const dispatch = useDispatch()
    const { posts, following } = useSelector((store) => {
        const following = store.usersState.currentUser.following
        const posts = store.postState.posts.filter(
            (post) =>
                following.includes(post.owner) || post.owner === store.usersState.currentUser.uid
        )
        return {
            posts,
            following,
        }
    })

    console.log({ posts })

    useEffect(() => {
        dispatch(fetchPostsByUserFollowing(following))
    }, [following])

    return (
        <Container>
            <View>
                <Text>Feed</Text>
            </View>
        </Container>
    )
}

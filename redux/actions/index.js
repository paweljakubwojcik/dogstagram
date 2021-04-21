import {
    getCurrentUser,
    getUserById,
    getUserPosts,
    listenToFollowingUpdates,
} from '../../services/firebase'
import {
    CURRENT_USER_STATE_CHANGE,
    USERS_DATA_STATE_CHANGE,
    FETCH_POSTS,
    USER_FOLLOWING_STATE_CHANGE,
} from '../constants'

export function fetchCurrentUser() {
    return (dispatch, getState) => {
        ;(async () => {
            try {
                const user = await getCurrentUser()
                dispatch({ type: CURRENT_USER_STATE_CHANGE, payload: user })
                listenToFollowingUpdates(user.uid, (following) => {
                    dispatch({
                        type: USER_FOLLOWING_STATE_CHANGE,
                        payload: { uid: user.uid, following },
                    })
                })
            } catch (error) {
                console.log(error)
            }
        })()
    }
}

export function fetchPostsByUserId(uid) {
    return (dispatch, getState) => {
        ;(async () => {
            try {
                const posts = await getUserPosts(uid)
                dispatch({ type: FETCH_POSTS, payload: posts })
            } catch (error) {
                console.log(error)
            }
        })()
    }
}

/**
 *
 * @param {Array<string>} following
 * @returns
 */
export function fetchPostsByUserFollowing(following) {
    return (dispatch, getState) => {
        following.forEach((uid) => {
            dispatch(fetchPostsByUserId(uid))
        })
        console.log(getState())
    }
}

export function fetchUserData(uid) {
    return (dispatch, getState) => {
        const isFound = getState().usersState.users.some((el) => el.uid === uid)
        if (!isFound) {
            ;(async () => {
                const user = await getUserById(uid).then((snapshot) => {
                    if (user) {
                        dispatch({
                            type: USERS_DATA_STATE_CHANGE,
                            user: { ...snapshot.data(), uid: snapshot.uid },
                        })
                        console.log(getState())
                    } else {
                        console.log('does not exist')
                    }
                })
            })()
        }
    }
}

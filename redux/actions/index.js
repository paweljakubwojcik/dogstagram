import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import {
    USER_POSTS_STATE_CHANGE,
    USER_STATE_CHANGE,
    USER_FOLLOWING_STATE_CHANGE,
    USERS_DATA_STATE_CHANGE,
    USERS_POSTS_STATE_CHANGE,
} from '../constants'

export function fetchUser(dispatch) {
    const uid = firebase.auth().currentUser.uid

    firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                dispatch({
                    type: USER_STATE_CHANGE,
                    currentUser: { ...snapshot.data(), uid },
                })
            } else {
                console.log('does not exist')
            }
        })

    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('following')
        .onSnapshot(
            (snapshot) => {
                const following = snapshot.docs.map((doc) => {
                    const id = doc.id
                    return id
                })
                dispatch({ type: USER_FOLLOWING_STATE_CHANGE, data: following })
            },
            (error) => {
                throw error
            }
        )
}

export function fetchUserPosts(dispatch) {
    firebase
        .firestore()
        .collection('post')
        .doc(firebase.auth().currentUser.uid)
        .collection('posts')
        .orderBy('creation', 'desc')
        .get()
        .then((snapshot) => {
            const posts = snapshot.docs.map((doc) => {
                const data = doc.data()
                const id = doc.id
                return { ...data, id }
            })
            dispatch({ type: USER_POSTS_STATE_CHANGE, posts })
        })
        .catch((error) => console.error(error))
}

export function fetchUsersData(uid) {
    return (dispatch, getState) => {
        const isFound = getState().usersState.users.some((el) => el.uid === uid)
        if (!isFound) {
            firebase
                .firestore()
                .collection('users')
                .doc(uid)
                .get()
                .then((snapshot) => {
                    if (snapshot.exists) {
                        dispatch({
                            type: USERS_DATA_STATE_CHANGE,
                            user: { ...snapshot.data(), uid: snapshot.uid },
                        })
                        dispatch(fetchUsersFollowingPosts(uid))
                        console.log(getState())
                    } else {
                        console.log('does not exist')
                    }
                })
        }
    }
}

export function fetchUsersFollowingPosts(uid) {
    return (dispatch, getState) => {
        firebase
            .firestore()
            .collection('post')
            .doc(uid)
            .collection('posts')
            .orderBy('creation', 'asc')
            .get()
            .then((snapshot) => {
                // const uid = snapshot.query.EP.path.segments[1]
                const user = getState().usersState.users.find((el) => el.uid === uid)

                let posts = snapshot.docs.map((doc) => {
                    const data = doc.data()
                    const id = doc.id
                    return { id, ...data, user }
                })

                dispatch({ type: USERS_POSTS_STATE_CHANGE, posts, uid })
            })
    }
}

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'
import { USER_POSTS_STATE_CHANGE, USER_STATE_CHANGE } from '../constants'

export function fetchUser(dispatch) {
    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                /*  console.log(snapshot.data()) */
                dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
            } else {
                console.log('does not exist')
            }
        })
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

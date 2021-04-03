import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

export const getUserById = async (uid) => {
    const snapshot = await firebase.firestore().collection('users').doc(uid).get()
    if (snapshot.exists) {
        return { ...snapshot.data(), uid }
    } else {
        console.log('does not exist')
    }
}

export const getUserPosts = async (uid) => {
    const snapshot = await firebase
        .firestore()
        .collection('post')
        .doc(uid)
        .collection('posts')
        .orderBy('creation', 'desc')
        .get()
        
    if (snapshot.exist)
        return snapshot.docs.map((doc) => {
            const data = doc.data()
            const id = doc.id
            return { ...data, id, owner: uid }
        })
    else console.log('no posts')
}

export const followUser = (uid) => {
    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('following')
        .doc(uid)
        .set({})
}

export const unFollowUser = (uid) => {
    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection('following')
        .doc(uid)
        .delete()
}

export const logout = () => {
    firebase.auth().signOut()
}

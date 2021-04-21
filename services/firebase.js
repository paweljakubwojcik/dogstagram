import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

import dayjs from 'dayjs'

export const getCurrentUser = async () => {
    const uid = firebase.auth().currentUser.uid

    return await getUserById(uid)
}

/**
 *
 * @param {Strin} uid - user id
 * @returns
 */
export const getUserById = async (uid) => {
    const snapshot = await firebase.firestore().collection('users').doc(uid).get()
    if (snapshot.exists) {
        return { ...snapshot.data(), uid }
    } else {
        console.log('does not exist')
        throw new Error(`user ${uid} does not exist`)
    }
}

/**
 *
 * @param {String} uid - user id
 * @returns array of posts
 */
export const getUserPosts = async (uid) => {
    // idea to paginate based on date instead of index due to limitations in quering of firebase
    const timestampNow = Date.now()
    const timestampWeekEarlier = dayjs(timestampNow).subtract(7, 'day').valueOf()

    const snapshot = await firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('posts')
        .where('dateCreated', '<=', timestampNow)
        .where('dateCreated', '>', timestampWeekEarlier)
        .orderBy('dateCreated', 'desc')
        .get()

    if (snapshot.exist)
        return snapshot.docs.map((doc) => {
            const data = doc.data()
            const id = doc.id
            return { ...data, id, owner: uid }
        })
    else return []
}

/**
 *
 * @param {String} uid
 * @param {Function} callback (following)=>{}
 */
export const listenToFollowingUpdates = (uid, callback) => {
    firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('following')
        .onSnapshot(
            (snapshot) => {
                const following = snapshot.docs.map((doc) => {
                    const id = doc.id
                    return id
                })
                callback(following)
            },
            (error) => {
                throw error
            }
        )
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

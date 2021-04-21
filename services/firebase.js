import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

import dayjs from 'dayjs'
import { useState } from 'react'

const Auth = firebase.auth()
const Firestore = firebase.firestore()
const Storage = firebase.storage()

const { STATE_CHANGED } = firebase.storage.TaskEvent

/**
 * @param {Object} registerData {email, password, name}
 */
export const registerUser = async ({ email, password, name }) => {
    try {
        const response = await Auth.createUserWithEmailAndPassword(email, password)

        await Firestore.collection('users').doc(Auth.currentUser.uid).set({
            username: name,
            emailAddress: email,
            dateCreated: Date.now(),
        })
        return response
    } catch (error) {
        throw error
    }
}

export const loginUser = ({ email, password }) => {
    Auth.signInWithEmailAndPassword(email, password)
        .then((res) => {
            console.log(res)
        })
        .catch((e) => {
            console.log(e)
        })
}

export const getCurrentUser = async () => {
    const uid = Auth.currentUser.uid

    return await getUserById(uid)
}

/**
 *
 * @param {String} uid - user id
 * @returns
 */
export const getUserById = async (uid) => {
    const snapshot = await Firestore.collection('users').doc(uid).get()
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
    const timestampNow = firebase.firestore.FieldValue.serverTimestamp()
    const timestampWeekEarlier = dayjs(timestampNow).subtract(7, 'day').valueOf()

    const snapshot = await Firestore.collection('users')
        .doc(uid)
        .collection('posts')
        /* .where('dateCreated', '<=', timestampNow)
        .where('dateCreated', '>', timestampWeekEarlier)
        .orderBy('dateCreated', 'desc') */
        .get()

    return snapshot.docs.map((doc) => {
        const data = doc.data()
        const id = doc.id
        return { ...data, id, owner: uid }
    })
}

/**
 *
 * @param {String} uid
 * @param {Function} callback (following)=>{}
 */
export const listenToFollowingUpdates = (uid, callback) => {
    Firestore.collection('users')
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
    Firestore.collection('users').doc(Auth.currentUser.uid).collection('following').doc(uid).set({})
    Firestore.collection('users').doc(uid).collection('followers').doc(Auth.currentUser.uid).set({})
}

export const unFollowUser = (uid) => {
    Firestore.collection('users')
        .doc(Auth.currentUser.uid)
        .collection('following')
        .doc(uid)
        .delete()
    Firestore.collection('users')
        .doc(uid)
        .collection('followers')
        .doc(Auth.currentUser.uid)
        .delete()
}

export const logout = () => {
    Auth.signOut()
}

/**
 *
 * @param {String} search - query that will be searched in DB
 * @returns Array of found users
 */
export const searchUsersByName = async (search) => {
    try {
        const snapshot = await Firestore.collection('users')
            .where('username', '>=', search)
            .limit(25)
            .get()
        const users = snapshot.docs.map((doc) => {
            const data = doc.data()
            const id = doc.id
            return { ...data, id }
        })
        return users
    } catch (error) {
        throw error
    }
}

export const useUploadImage = (
    image,
    options = { onComplete: () => null, additionalFields: {} }
) => {
    const [bytesTransferred, setBytesTransferred] = useState(0)
    const initialImage = image
    const initialOptions = options

    const uploadImage = async (
        image = initialImage,
        { onComplete, additionalFields } = initialOptions
    ) => {
        try {
            const response = await fetch(image)
            const blob = await response.blob()
            const path = `post/${Auth.currentUser.uid}/${Math.random().toString(36)}`
            const task = Storage.ref().child(path).put(blob)

            const next = (snapshot) => {
                console.log(`trasferred: ${snapshot.bytesTransferred}`)
                setBytesTransferred(snapshot.bytesTransferred)
            }

            const complete = async () => {
                const url = await task.snapshot.ref.getDownloadURL()
                await Firestore.collection('users')
                    .doc(Auth.currentUser.uid)
                    .collection('posts')
                    .add({
                        URL: url,
                        dateCreated: firebase.firestore.FieldValue.serverTimestamp(),
                        ...additionalFields,
                    })
                onComplete()
            }

            const error = (snapshot) => {
                console.log(snapshot)
            }

            task.on(STATE_CHANGED, { next, error, complete })
        } catch (e) {
            console.log(e)
        }
    }

    return { uploadImage, bytesTransferred }
}

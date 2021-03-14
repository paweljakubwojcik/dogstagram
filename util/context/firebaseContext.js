import React, { createContext } from 'react'
import { config } from './config'
import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

const FirebaseContext = createContext({
    storage: null,
    auth: null,
})

if (firebase.apps.length === 0) firebase.initializeApp(config)

const auth = firebase.auth()
const firestore = firebase.firestore()
const storage = firebase.storage()

function FirebaseProvider(props) {
    return (
        <FirebaseContext.Provider value={{ auth, firestore, storage }} {...props}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseContext, FirebaseProvider }

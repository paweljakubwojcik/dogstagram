import React, { createContext } from 'react'
import { config } from './config'
import firebase from 'firebase/app'
import 'firebase/firebase-auth'
import 'firebase/firebase-firestore'

const FirebaseContext = createContext({
    storage: null,
    auth: null,
})

firebase.initializeApp(config)
const auth = firebase.auth()
const firestore = firebase.firestore()

function FirebaseProvider(props) {
    return (
        <FirebaseContext.Provider value={{ auth, firestore }} {...props}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseContext, FirebaseProvider }

import React, { createContext } from 'react'
import { config } from './config'
import firebase from 'firebase'

const FirebaseContext = createContext({
    storage: null,
    auth: null,
})

firebase.initializeApp(config)
const storage = firebase.storage()
const auth = firebase.auth()

function FirebaseProvider(props) {
    return (
        <FirebaseContext.Provider value={{ storage, auth }} {...props}>
            {props.children}
        </FirebaseContext.Provider>
    )
}

export { FirebaseContext, FirebaseProvider }

import firebase from 'firebase/app'
import 'firebase/auth'
import { USER_STATE_CHANGE } from '../constants'

export function fetchUser(dispatch) {
    firebase
        .firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((snapshot) => {
            if (snapshot.exists) {
                console.log(snapshot.data())
                dispatch({ type: USER_STATE_CHANGE, currentUser: snapshot.data() })
            } else {
                console.log('does not exist')
            }
        })
}

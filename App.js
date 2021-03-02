import React, { useState, useContext, useEffect } from 'react'
import { Text } from 'react-native'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FirebaseContext, FirebaseProvider } from './util/context/firebaseContext'

import Landing from './components/auth/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Main from './components/Main'

import { Container } from './components/styles/commonStyles'

const Stack = createStackNavigator()

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
    return (
        <FirebaseProvider>
            <Application />
        </FirebaseProvider>
    )
}

const Application = () => {
    const { auth } = useContext(FirebaseContext)
    const [user, setUser] = useState(null)
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        auth.onAuthStateChanged((user) => {
            setUser(user)
            setLoaded(true)
        })
    }, [])

    if (!loaded) return <Loader />

    if (user)
        return (
            <Provider store={store}>
                <Main />
            </Provider>
        )

    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Landing">
                <Stack.Screen name="Landing" component={Landing} options={{ headerShown: false }} />
                <Stack.Screen
                    name="Register"
                    component={Register}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const Loader = () => {
    return (
        <Container>
            <Text>Loading...</Text>
        </Container>
    )
}

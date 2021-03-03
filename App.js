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
import Add from './components/main/Add'

import { Container } from './components/styles/commonStyles'

const Stack = createStackNavigator()

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
    return (
        <FirebaseProvider>
            <NavigationContainer>
                <Application />
            </NavigationContainer>
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
                <Stack.Navigator initialRouteName="Main">
                    <Stack.Screen
                        name="Main"
                        component={Main}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen name="Add" component={Add} />
                </Stack.Navigator>
            </Provider>
        )

    return (
        <Stack.Navigator initialRouteName="Landing" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Landing" component={Landing} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Login" component={Login} />
        </Stack.Navigator>
    )
}

const Loader = () => {
    return (
        <Container>
            <Text>Loading...</Text>
        </Container>
    )
}

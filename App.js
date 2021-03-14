import React, { useState, useContext, useEffect } from 'react'
import { StatusBar, Text } from 'react-native'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { FirebaseContext, FirebaseProvider } from './util/context/firebaseContext'

import Landing from './components/auth/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import Main from './components/Main'
import Add from './components/main/Add'

import { Container } from './components/styles/commonStyles'

// using material top navigator for swipe effects
const SwipeStack = createMaterialTopTabNavigator()

const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App({ ...rest }) {
    return (
        <FirebaseProvider>
            <NavigationContainer>
                <StatusBar />
                <Application {...rest} />
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
                <SwipeStack.Navigator
                    initialRouteName="Main"
                    screenOptions={{
                        gestureEnabled: true,
                        headerShown: false,
                    }}
                    tabBar={() => null}
                    timingConfig={{
                        duration: 200,
                    }}
                    lazy={true}
                >
                    <SwipeStack.Screen
                        name="Add"
                        component={Add}
                        /*  options={{
                            gestureDirection: 'horizontal-inverted',
                            cardStyleInterpolator: forSlide,
                        }} */
                    />
                    <SwipeStack.Screen
                        name="Main"
                        component={Main}
                        /* options={{ gestureDirection: 'horizontal' }} */
                    />
                </SwipeStack.Navigator>
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

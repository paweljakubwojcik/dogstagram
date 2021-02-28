import React, { useState, useContext } from 'react'
import { Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { FirebaseContext, FirebaseProvider } from './util/context/firebaseContext'

import Landing from './components/auth/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import { useEffect } from 'react'
import { Container } from './components/commonStyles'

const Stack = createStackNavigator()

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

    if (user) return <DashBoard />

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

const DashBoard = () => {
    return (
        <Container>
            <Text>Dashboard</Text>
        </Container>
    )
}

const Loader = () => {
    return (
        <Container>
            <Text>Loading...</Text>
        </Container>
    )
}

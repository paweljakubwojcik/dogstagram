import React from 'react'
import Button from '../general/Button'
import styled from 'styled-components/native'
import { Container } from '../styles/commonStyles'

export default function Landing({ navigation }) {
    return (
        <Container>
            <Button title="Register" onPress={() => navigation.navigate('Register')} />
            <Button title="Login" onPress={() => navigation.navigate('Login')} />
        </Container>
    )
}

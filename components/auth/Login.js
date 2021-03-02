import React, { useContext } from 'react'
import { FirebaseContext } from '../../util/context/firebaseContext'

import { View, TextInput } from 'react-native'
import { useForm } from '../../util/hooks/useForm'
import Button from '../general/Button'
import { Container } from '../styles/commonStyles'

export default function Login() {
    const { auth } = useContext(FirebaseContext)
    const { addValue, onSubmit } = useForm((values) => {
        const { email, password } = values
        auth.signInWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })

    return (
        <Container>
            <TextInput placeholder="email" onChangeText={(email) => addValue({ email })} />
            <TextInput
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => addValue({ password })}
            />
            <Button title="Login" onPress={onSubmit} />
        </Container>
    )
}

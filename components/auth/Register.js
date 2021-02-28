import React, { useContext } from 'react'
import { FirebaseContext } from '../../util/context/firebaseContext'

import { View, TextInput } from 'react-native'
import { useForm } from '../../util/hooks/useForm'
import Button from '../general/Button'
import { Container } from '../commonStyles'

export default function Register() {
    const { auth } = useContext(FirebaseContext)
    const { addValue, onSubmit } = useForm((values) => {
        const { email, password, name } = values
        auth.createUserWithEmailAndPassword(email, password)
            .then((res) => {
                console.log(res)
            })
            .catch((e) => {
                console.log(e)
            })
    })

    return (
        <Container>
            <TextInput placeholder="name" onChangeText={(name) => addValue({ name })} />
            <TextInput placeholder="email" onChangeText={(email) => addValue({ email })} />
            <TextInput
                placeholder="password"
                secureTextEntry={true}
                onChangeText={(password) => addValue({ password })}
            />
            <Button title="Register" onPress={onSubmit} />
        </Container>
    )
}

import React, { useContext } from 'react'

import { View, TextInput } from 'react-native'
import { registerUser } from '../../services/firebase'
import { useForm } from '../../util/hooks/useForm'
import Button from '../general/Button'
import { Container } from '../styles/commonStyles'

export default function Register() {
    const { addValue, onSubmit } = useForm((values) => {
        const { email, password, name } = values
        registerUser({ email, password, name })
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

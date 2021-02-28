import React from 'react'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
    margin: 20px;
    width: 120px;
    padding: 12px;
    border-radius: 10px;
    background-color: #af35ad;
`
const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: #fff;
`

export default function Button({ onPress, title, disabled }) {
    return (
        <ButtonContainer onPress={onPress}>
            <ButtonText>{title}</ButtonText>
        </ButtonContainer>
    )
}

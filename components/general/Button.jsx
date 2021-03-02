import React from 'react'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
    margin: 20px;
    width: 120px;
    padding: 12px;
    border-radius: 10px;
    background-color: #af35ad;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`
const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: #fff;
`

export default function Button({ onPress, title, disabled, ...rest }) {
    return (
        <ButtonContainer onPress={onPress} {...rest}>
            <ButtonText>{title}</ButtonText>
        </ButtonContainer>
    )
}

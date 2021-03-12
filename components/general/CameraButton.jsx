import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import styled from 'styled-components/native'

const gap = 4

const ButtonContainer = styled.TouchableOpacity`
    display: flex;
    margin-bottom: auto;

    width: ${(props) => props.radius * 2}px;
    border-radius: ${(props) => props.radius}px;
    border: solid 4px #fff;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`

const ButtonInner = styled.View`
    flex: 1;
    margin: ${gap}px;
    height: ${(props) => (props.radius - gap) * 2}px;
    border-radius: ${(props) => props.radius - gap}px;
    background-color: #fff;
`

export default function Button({ onPress, radius = 40, ...rest }) {
    return (
        <ButtonContainer onPress={onPress} radius={radius} {...rest} style={{ aspectRatio: 1 }}>
            <ButtonInner radius={radius} style={{ aspectRatio: 1 }} />
        </ButtonContainer>
    )
}

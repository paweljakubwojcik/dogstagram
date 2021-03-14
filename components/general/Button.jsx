import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/native'

const ButtonContainer = styled.TouchableOpacity`
    margin: 10px;
    padding: 12px;
    border-radius: 10px;
    background-color: ${(props) => (props.transparent ? 'transparent' : '#af35ad')};
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`

const CircleContainer = styled.TouchableOpacity`
    margin: 10px;
    padding: 4px;
    border-radius: 200px;
    background-color: ${(props) => (props.transparent ? 'transparent' : '#00000044')};
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
`

const ButtonText = styled.Text`
    font-size: 16px;
    text-align: center;
    color: #fff;
`

export default function Button({
    onPress,
    title,
    disabled,
    transparent,
    circle,
    children,
    ...rest
}) {
    const Container = circle ? CircleContainer : ButtonContainer
    return (
        <Container onPress={onPress} {...rest} transparent={transparent}>
            <ButtonText>{children ? children : title}</ButtonText>
        </Container>
    )
}

Button.propsTypes = {
    transparent: PropTypes.bool,
}

import React from 'react'
import { View, Text, Image } from 'react-native'
import styled from 'styled-components/native'

export default function Avatar({ image, size = 28, ...rest }) {
    return (
        <Circle size={size} {...rest}>
            {image ? (
                <Image />
            ) : (
                <View style={{ backgroundColor: '#666666', width: '100%', height: '100%' }}></View>
            )}
        </Circle>
    )
}

const Circle = styled.View`
    border-radius: ${(props) => props.size / 2}px;
    overflow: hidden;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
`

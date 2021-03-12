import React from 'react'
import { View, Text, Image } from 'react-native'
import { Container } from '../styles/commonStyles'

export default function ImagePreview({ image }) {
    console.log(image)
    return (
        <Container>
            <Image source={{ uri: image }} style={{ flex: 1, width: '100%' }} />
        </Container>
    )
}

import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, Image, Dimensions } from 'react-native'
import { Container } from '../styles/commonStyles'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Button from '../general/Button'

const { height, width } = Dimensions.get('screen')

export default function ImagePreview({
    route: {
        params: { image, imagePosition, isFlipped },
    },
}) {
    const [full, setFull] = useState(true)

    const imageOffset = -imagePosition
    const containerStyle = full ? { top: imageOffset, height } : { height: '100%' }
    const flip = isFlipped
        ? {
              transform: [{ rotateY: '180deg' }],
          }
        : {}

    return (
        <Container>
            <ImageDisplay style={{ aspectRatio: 1 }}>
                <ImageContainer style={[containerStyle, flip]}>
                    <Image
                        source={{ uri: image }}
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'contain',
                        }}
                    />
                </ImageContainer>
                <Button
                    style={{
                        marginTop: 'auto',
                        marginLeft: 'auto',
                    }}
                    onPress={() => setFull((full) => !full)}
                    circle
                >
                    <MaterialIcons name="fullscreen" size={40} />
                </Button>
            </ImageDisplay>

            <Button onPress={() => null}>public</Button>
        </Container>
    )
}

const ImageDisplay = styled.View`
    background-color: #000;
    width: 100%;
    position: relative;
    top: 0;
    /* align-items: center; */

    overflow: hidden;
`

const ImageContainer = styled.View`
    width: 100%;
`

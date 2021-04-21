import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../util/context/firebaseContext'
import styled from 'styled-components/native'
import { View, TextInput, Image, Dimensions } from 'react-native'
import { Container } from '../styles/commonStyles'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Button from '../general/Button'

import { useUploadImage } from '../../services/firebase'

const { height, width } = Dimensions.get('screen')

//TODO: flip image using image-manipulator, as otherwise it's not flipped after saving in firestore
export default function ImagePreview({
    navigation,
    route: {
        params: { image, imagePosition, isFlipped },
    },
}) {
    const [full, setFull] = useState(true)

    const [caption, setCaption] = useState('')

    const { uploadImage } = useUploadImage()

    const onUpload = () => {
        uploadImage(image, {
            additionalFields: {
                caption,
            },
            onComplete: () => {
                navigation.navigate('Dashboard', { screen: 'Main' })
            },
        })
    }

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
            <TextInput
                placeholder={' add description ...'}
                onChangeText={(caption) => setCaption(caption)}
            />
            <Button onPress={() => onUpload()}>Upload</Button>
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

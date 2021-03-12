import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { Camera } from 'expo-camera'

import * as ImagePicker from 'expo-image-picker'
import ImagePreview from './ImagePreview'

import { Container } from '../styles/commonStyles'
import Button from '../general/Button'
import CameraButton from '../general/CameraButton'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

//TODO: check supported aspect ratio before rendering
//TODO: possibly change to react-native-customized-image-picker

const { height, width } = Dimensions.get('screen')
const { currentHeight } = StatusBar
const imagePosition = ((height - width) * 3) / 7 - currentHeight // position to know where crop image

export default function Add({ navigation }) {
    const [permissions, setPermissions] = useState({
        camera: null,
        library: null,
    })
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [camera, getCameraRef] = useState(null)
    const [image, setImage] = useState(null)
    const [transition, setTransition] = useState(true)

    // getting supported aspect ratios
    useEffect(() => {
        ;(async () => {
            if (camera) {
                //console.log(await camera.getSupportedRatiosAsync())
            }
        })()
    }, [camera])

    useEffect(() => {
        const transEnd = navigation.addListener('transitionEnd', (e) => {
            setTransition(false)
        })

        return transEnd
    }, [navigation])

    //getting permisions for image picker
    useEffect(() => {
        ;(async () => {
            try {
                if (Platform.OS !== 'web') {
                    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
                    if (status)
                        setPermissions((permissions) => ({
                            ...permissions,
                            library: status === 'granted',
                        }))
                    if (status !== 'granted') {
                        alert('Sorry, we need camera roll permissions to make this work!')
                    }
                }
            } catch (e) {
                throw e
            }
        })()
    }, [Platform])

    // getting permission for camera
    useEffect(() => {
        ;(async () => {
            try {
                if (Platform.OS !== 'web') {
                    const { status } = await Camera.requestPermissionsAsync()
                    setPermissions((permissions) => ({
                        ...permissions,
                        camera: status === 'granted',
                    }))
                }
            } catch (e) {
                throw e
            }
        })()
    }, [Platform])

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync()
            setImage(data.uri)
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        })
        if (!result.cancelled) {
            setImage(result.uri)
        }
    }

    if (permissions.camera === null) {
        return <View />
    }
    if (permissions.camera === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <Container
            style={{
                marginTop: StatusBar.currentHeight,
            }}
        >
            {image ? (
                <ImagePreview image={image} />
            ) : (
                <>
                    <CameraContainer black={transition}>
                        {!transition && (
                            <Camera
                                type={type}
                                ratio={'4:3'}
                                style={styles.fixedRatio}
                                ref={getCameraRef}
                            />
                        )}
                    </CameraContainer>
                    <Overlay>
                        <BlackOverlay style={{ flexGrow: 3 }}>
                            <Button
                                onPress={() => navigation.goBack()}
                                transparent
                                style={{ marginLeft: 'auto' }}
                            >
                                <MaterialIcons name="close" color={'#fff'} size={40} />
                            </Button>
                        </BlackOverlay>
                        <CameraGap></CameraGap>
                        <BlackOverlay style={{ flexGrow: 4 }} />
                        <ButtonContainer>
                            <Button onPress={pickImage} transparent>
                                <MaterialIcons name="image" color={'#fff'} size={40} />
                            </Button>
                            <CameraButton onPress={takePicture} />
                            <Button
                                onPress={() => {
                                    setType(
                                        type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back
                                    )
                                }}
                                transparent
                            >
                                <MaterialIcons name="flip-camera-ios" color={'#fff'} size={40} />
                            </Button>
                        </ButtonContainer>
                    </Overlay>
                </>
            )}
        </Container>
    )
}

const styles = StyleSheet.create({
    fixedRatio: {
        aspectRatio: 3 / 4,
    },
})

const CameraContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex: 1;
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: ${(props) => (props.black ? '#000' : 'transparent')};
`

const BlackOverlay = styled.View`
    background-color: #00000099;
    flex: 1;
`

const CameraGap = styled.View`
    position: relative;
    background-color: transparent;
    width: ${width}px;
    height: ${width}px;
`

const ButtonContainer = styled.View`
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30%;
    flex-direction: row;
    justify-content: space-around;
    align-items: flex-end;
`

const Overlay = styled.View`
    position: absolute;

    width: 100%;
    height: 100%;
`

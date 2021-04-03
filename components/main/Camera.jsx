import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Platform, Dimensions, StatusBar } from 'react-native'
import styled from 'styled-components/native'
import { Camera } from 'expo-camera'

import * as ImagePicker from 'expo-image-picker'
import Button from '../general/Button'
import CameraButton from '../general/CameraButton'
import { Container } from '../styles/commonStyles'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

const { height, width } = Dimensions.get('screen')
const { currentHeight } = StatusBar
const imagePosition = ((height - width) * 3) / 7 // position to know where to crop image

//TODO: check supported aspect ratio before rendering
//TODO: possibly change to react-native-customized-image-picker
export default function CameraComponent({ navigation }) {
    const [permissions, setPermissions] = useState({
        camera: null,
        library: null,
    })
    const [type, setType] = useState(Camera.Constants.Type.back)
    const [camera, getCameraRef] = useState(null)

    // getting supported aspect ratios
    useEffect(() => {
        ;(async () => {
            if (camera) {
                console.log(await camera.getSupportedRatiosAsync())
            }
        })()
    }, [camera])

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
            if (Platform.OS !== 'web') {
                try {
                    const { status } = await Camera.requestPermissionsAsync()
                    setPermissions((permissions) => ({
                        ...permissions,
                        camera: status === 'granted',
                    }))
                } catch (e) {
                    throw e
                }
            }
        })()
    }, [Platform])

    const navigate = (image, options) => {
        navigation.push('ImagePreview', { image, imagePosition, ...options })
    }

    const takePicture = async () => {
        if (camera) {
            const data = await camera.takePictureAsync()
            const isFlipped = type === Camera.Constants.Type.front
            navigate(data.uri, { isFlipped })
        }
    }

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            quality: 1,
        })
        if (!result.cancelled) {
            navigate(result.uri)
        }
    }

    if(Platform.OS === 'web'){
        return (
            <Container>
                <Text>{"You can't acces camera through web browser "}</Text>
                <Button
                    onPress={() => navigation.jumpTo('Main')}
                    transparent
                    style={{ marginLeft: 'auto' }}
                >
                    <MaterialIcons name="close" color={'#fff'} size={40} />
                </Button>
            </Container>
        )
    }

    if (permissions.camera === null) {
        return <View />
    }
    if (permissions.camera === false) {
        return <Text>No access to camera</Text>
    }

    return (
        <Container>
            <CameraContainer style={styles.fixedRatio}>
                <StatusBar />
                <Camera
                    type={type}
                    ratio={'19:9'}
                    style={styles.fixedRatio}
                    ref={getCameraRef}
                    autoFocus={Camera.Constants.AutoFocus.on}
                />
            </CameraContainer>
            <Overlay>
                <BlackOverlay style={{ flexGrow: 3 }}>
                    <Button
                        onPress={() => navigation.jumpTo('Main')}
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
        </Container>
    )
}

const styles = StyleSheet.create({
    fixedRatio: {
        aspectRatio: 9 / 19,
        height,
    },
})

const CameraContainer = styled.View`
    display: flex;
    flex-direction: row;
    position: absolute;
    z-index: -1;
    width: 100%;

    background-color: ${(props) => (props.black ? '#000' : 'transparent')};
`

const BlackOverlay = styled.View`
    background-color: #11111199;
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

import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'
import { Camera } from 'expo-camera'
import { Container } from '../styles/commonStyles'
import Button from '../general/Button'


//TODO: chaeck supported aspect ratio before rendering

export default function Add() {
    const [hasPermission, setHasPermission] = useState(null)
    const [type, setType] = useState(Camera.Constants.Type.back)
    const camera = useRef(null)

    useEffect(() => {
        ;(async () => {
            if (camera.current) {
                console.log(await camera.current.getSupportedRatiosAsync())
            }
        })()
    }, [camera.current])

    useEffect(() => {
        ;(async () => {
            const { status } = await Camera.requestPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    if (hasPermission === null) {
        return <View />
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>
    }
    return (
        <Container>
            <CameraContainer style={styles.cameraContainer}>
                <Camera type={type} ratio={'4:3'} style={styles.fixedRatio} ref={camera} />
            </CameraContainer>
            <ButtonContainer>
                <Button
                    onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                                ? Camera.Constants.Type.front
                                : Camera.Constants.Type.back
                        )
                    }}
                >
                    Flip
                </Button>
            </ButtonContainer>
        </Container>
    )
}

const styles = StyleSheet.create({
    fixedRatio: {
        aspectRatio: 3 / 4,
    },
    cameraContainer: {
        flexGrow: 1,
        flexDirection: 'row',
    },
})

const CameraContainer = styled.View`
    display: flex;
    flex-direction: row;
    flex: 1;
    position: absolute;
    width: 100%;
    height: 100%;
`

const ButtonContainer = styled.View`
    position: absolute;
    bottom: 0;
`

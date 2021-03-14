import React, { useState, useContext } from 'react'
import { FirebaseContext } from '../../util/context/firebaseContext'
import styled from 'styled-components/native'
import { View, TextInput, Image, Dimensions } from 'react-native'
import { Container } from '../styles/commonStyles'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Button from '../general/Button'

import firebase from 'firebase/app'
import 'firebase/firebase-firestore'
import 'firebase/firebase-storage'

const firestore = firebase.firestore()
const storage = firebase.storage()
const { STATE_CHANGED } = firebase.storage.TaskEvent

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

    const uploadImage = async () => {
        // getting the data from the image
        console.log('upload')
        try {
            const response = await fetch(image)
            const blob = await response.blob()
            const path = `post/${firebase.auth().currentUser.uid}/${Math.random().toString(36)}`
            const task = storage.ref().child(path).put(blob)

            const next = (snapshot) => console.log(`trasferred: ${snapshot.bytesTransferred}`)

            const complete = () => {
                task.snapshot.ref.getDownloadURL().then((url) => {
                    savePostData(url)
                })
            }

            const error = (snapshot) => {
                console.log(snapshot)
            }

            task.on(STATE_CHANGED, { next, error, complete })
        } catch (e) {
            console.log(e)
        }
    }

    const savePostData = (URL) => {
        firestore
            .collection('post')
            .doc(firebase.auth().currentUser.uid)
            .collection('posts')
            .add({
                URL,
                caption,
                creation: firebase.firestore.FieldValue.serverTimestamp(),
            })
            .then(() => {
                navigation.navigate('Dashboard', { screen: 'Main' })
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
            <Button onPress={() => uploadImage()}>Upload</Button>
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

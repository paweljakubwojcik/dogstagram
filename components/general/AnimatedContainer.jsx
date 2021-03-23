import React, { useRef } from 'react'
import styled from 'styled-components/native'
import { Animated, Dimensions } from 'react-native'
import { useEffect } from 'react'

const { width } = Dimensions.get('screen')

const timeout = 300

export default function AnimatedContainer({ children, navigation }) {
    const swipeAnim = useRef(new Animated.Value(width)).current

    const swipeIn = () => {
        Animated.timing(swipeAnim, {
            toValue: 0,
            duration: timeout,
            useNativeDriver: true,
        }).start()
    }

    const swipeOut = () => {
        Animated.timing(swipeAnim, {
            toValue: width,
            duration: timeout,
            useNativeDriver: true,
        }).start()
    }

    useEffect(() => {
        const cleanUp = navigation.addListener('blur', swipeOut)
        const cleanUp2 = navigation.addListener('focus', swipeIn)
        return () => {
            cleanUp()
            cleanUp2()
        }
    }, [navigation])

    return (
        <SwipeInContainer
            style={{
                transform: [
                    {
                        translateX: swipeAnim,
                    },
                ],
            }}
        >
            {children}
        </SwipeInContainer>
    )
}

const SwipeInContainer = styled(Animated.View)`
    flex: 1;
    position: relative;
`

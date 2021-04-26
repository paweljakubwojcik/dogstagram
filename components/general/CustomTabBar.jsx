import React, { useEffect, useState } from 'react'
import styled from 'styled-components/native'

const color = '#333'
const focusColor = '#af35ad'

export default function MyTabBar({ state, descriptors, navigation }) {
    const [focusedIndex, setFocused] = useState(0)

    const focusedOptions = descriptors[state.routes[state.index].key].options

    if (focusedOptions.tabBarVisible === false) {
        return null
    }

    useEffect(() => {
        // if we want screen to be hidden , we dont update icon when navigating to it
        if (!descriptors[state.routes[state.index].key].options.hidden) setFocused(state.index)
    }, [state.index])

    return (
        <CustomTabNavigator>
            {state.routes.map((route, index) => {
                const {
                    options: { tabBarIcon, hidden },
                } = descriptors[route.key]

                const isFocused = focusedIndex === index

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    })

                    if (!event.defaultPrevented) {
                        navigation.navigate(route.name)
                    }
                }

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    })
                }
                return (
                    !hidden && (
                        <CustomTabButton
                            key={index}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            onPress={onPress}
                            onLongPress={onLongPress}
                        >
                            {tabBarIcon && tabBarIcon({ color: isFocused ? focusColor : color })}
                        </CustomTabButton>
                    )
                )
            })}
        </CustomTabNavigator>
    )
}

const CustomTabNavigator = styled.View`
    background-color: white;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-color: #4e4e4e22;
    border-top-width: 1px;
`

const CustomTabButton = styled.TouchableOpacity`
    margin: 10px 12px;
`

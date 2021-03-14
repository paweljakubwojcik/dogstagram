import React, { useState, useEffect } from 'react'
import { Dimensions, StatusBar } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack'

import { Container } from '../styles/commonStyles'
import Camera from './Camera'
import ImagePreview from './ImagePreview'

const Stack = createStackNavigator()

export default function Add() {
    return (
        <Stack.Navigator
            initialRouteName="Camera"
            screenOptions={{ headerShown: false, gestureEnabled: true }}
        >
            <Stack.Screen name="Camera" component={Camera} />
            <Stack.Screen name="ImagePreview" component={ImagePreview} />
        </Stack.Navigator>
    )
}

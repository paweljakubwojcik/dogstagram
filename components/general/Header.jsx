import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import styled from 'styled-components/native'

export default function Header({ children, ...props }) {
    return (
        <View
            style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                width: '100%',
                height: 60,
                borderColor: '#4e4e4e22',
                borderBottomWidth: 1,
                paddingVertical: 10,
                paddingHorizontal: 15,
                backgroundColor: '#fff',
            }}
            {...props}
        >
            {children}
        </View>
    )
}

import React, { useState } from 'react'
import styled from 'styled-components/native'
import { View, Text, TextInput } from 'react-native'
import { searchUsersByName } from '../../services/firebase'

import { FlatList } from 'react-native-gesture-handler'

export default function Search({ navigation }) {
    const [users, setUsers] = useState([])

    const searchUsers = async (search) => {
        if (search) {
            const found = await searchUsersByName(search)
            setUsers(found)
        } else setUsers([])
    }

    return (
        <Container>
            <SearchInput placeholder={'search...'} onChangeText={searchUsers} />
            <FlatList
                numColumns={1}
                horizontal={false}
                data={users}
                renderItem={({ item }) => (
                    <UserLink
                        onPress={() =>
                            navigation.navigate('Profile', { uid: item.id, name: item.name })
                        }
                    >
                        <Text>{item.username}</Text>
                    </UserLink>
                )}
            />
        </Container>
    )
}

const Container = styled.View`
    display: flex;
    flex: 1;
    align-items: stretch;
`

const SearchInput = styled.TextInput`
    font-size: 20px;
    padding: 12px;
    margin: 12px;
`

const UserLink = styled.TouchableOpacity`
    display: flex;
    padding: 12px;
    border-radius: 20px;
    margin: 3px;
    height: 40px;
    background-color: #00000011;
`

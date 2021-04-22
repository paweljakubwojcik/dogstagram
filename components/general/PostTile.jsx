import React from 'react'
import styled from 'styled-components/native'
import {
    Image,
    Text,
    View,
    Dimensions,
    TouchableHighlight,
    TouchableOpacity,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Feather from 'react-native-vector-icons/Feather'

const iconsLiked = 'heart'
const iconsNotLiked = 'heart-outline'

const buttons = [{ name: 'heart', action: () => {} }, { name: 'message-circle' }, { name: 'send' }]

export default function PostTile({ post, navigation, ...rest }) {
    const { username, URL, caption, owner } = post
    return (
        <Container>
            <Title>
                <TouchableWithoutFeedback
                    onPress={() => navigation.navigate('Profile', { uid: owner, name: username })}
                >
                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{username}</Text>
                </TouchableWithoutFeedback>
            </Title>
            <Image
                style={{
                    aspectRatio: 1 / 1,
                }}
                source={{ uri: URL }}
            />
            <View style={{ paddingHorizontal: 12 }}>
                <Actions>
                    {buttons.map(({ name, action }, index) => (
                        <TouchableOpacity
                            style={{ marginHorizontal: 8, marginLeft: index === 0 ? 0 : 8 }}
                        >
                            <Feather name={name} size={28} />
                        </TouchableOpacity>
                    ))}
                </Actions>
                <LikesCount>4 335 polubień</LikesCount>
                <Caption>
                    <Text style={{ fontWeight: 'bold' }}>{username}</Text> {caption}
                </Caption>
            </View>
        </Container>
    )
}

const Title = styled.View`
    display: flex;
    padding: 16px 12px;
`

const Container = styled.View`
    width: 100%;
    margin: 12px 0;
`

const Actions = styled.View`
    display: flex;
    flex-direction: row;
    padding: 12px 0;
`

const LikesCount = styled.Text`
    font-weight: bold;
    margin-bottom: 5px;
`

const Caption = styled.Text``

import React from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { green } from '../utils/colors';

const ItemContainer = styled.View`
  width: 100%;
  height: 80px;
  border-bottom-width: 1px;
  border-bottom-color: #cecece;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Title = styled.Text`
    font-size: 30px;
    opacity: 0.8;
    color: #cecece;
`

const SubTitle = styled.Text`
    margin-right: 5px;
    font-size: 38px;
    opacity: 0.5;
`

const CardsContainer = styled.View`
    flex-direction: row;
    padding: 5px;
`

export default function DeckItem({ item, navigation }) {
    const _onPress = () => {
        navigation.navigate(
            'DeckDetail', 
            { title: item.title, deck: item }
        );
    }

    return (
        <TouchableOpacity onPress={_onPress}>
            <ItemContainer>
                <Title>{item.title}</Title>
                <CardsContainer>
                    <SubTitle>{item.cards.length}</SubTitle>
                    <MaterialCommunityIcons name='cards' size={40} color={green} />
                </CardsContainer>
            </ItemContainer>
        </TouchableOpacity>
    )
}
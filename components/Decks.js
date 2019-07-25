import React, { Component } from 'react';
import { Dimensions, FlatList, Text } from 'react-native';
import styled from 'styled-components/native';

import DeckItem from './DeckItem';

const StyledView = styled.View`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  padding: 10px;
`

export default class Home extends Component {

  _keyExtractor = (item, index) => item.id;

  _renderItem = ({ item }) => (
    <DeckItem 
      key={item.id} 
      item={item} 
    />
  )

  render() {
    return (
      <StyledView>
        <FlatList
          data={[{ deckTitle: 'Deck 1', id: 'deck1', cards: 2 }, { deckTitle: 'Deck 2', id: 'deck2', cards: 1 }]}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </StyledView>
    )
  }
}

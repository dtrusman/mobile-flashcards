import React, { Component } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import DeckItem from './DeckItem';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';

const StyledView = styled.View`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  padding: 10px;
`

class Home extends Component {

  async componentDidMount() {
    const { dispatch } = this.props;

    const decks = await fetchDecks();
    
    dispatch(receiveDecks(decks));
  }

  _keyExtractor = item => { return "deck-key-" + item.id };

  _renderItem = ({ item }) => (
    <DeckItem
      key={item.id}
      item={item}
    />
  )

  render() {

    const { decks } = this.props;
    
    if (Object.values(decks).length === 0) {
      return (
        <View>
          <Text>No data found</Text>
        </View>
      )
    }

    return (
      <StyledView>
        <FlatList
          data={Object.values(decks)}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
        />
      </StyledView>
    )
  }
}

const mapStateToProps = decks => ({
  decks
});

export default connect(mapStateToProps)(Home)
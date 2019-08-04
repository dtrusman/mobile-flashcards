import React, { Component } from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import styled from 'styled-components/native';
import DeckItem from './DeckItem';
import { connect } from 'react-redux';
import { receiveDecks } from '../actions';
import { fetchDecks } from '../utils/api';
import { green } from '../utils/colors';

const StyledView = styled.View`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  padding: 10px;
`

const EmptyDeckListContainer = styled.View`
  justify-content: center;
  align-items: center;
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
`

const EmptyDeckListText = styled.Text`
  font-size: 50px;
  font-weight: bold;
  color: ${green};
`

class Home extends Component {

  async componentDidMount() {
    const { dispatch } = this.props;

    const decks = await fetchDecks();

    dispatch(receiveDecks(decks));
  }

  static getDerivedStateFromProps(props, state) {
    
  }

  _keyExtractor = item => { return "deck-key-" + item.id };

  _renderItem = ({ item }) => (
    <DeckItem
      key={item.id}
      item={item}
      navigation={this.props.navigation}
    />
  )

  render() {

    const { decks } = this.props;

    if (Object.values(decks).length === 0) {
      return (
        <EmptyDeckListContainer>
          <EmptyDeckListText>Add Decks to Play</EmptyDeckListText>
        </EmptyDeckListContainer>
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
import React, { Component } from 'react';
import { Dimensions, Text } from 'react-native';
import styled from 'styled-components/native';
import { lightGray, green, white } from '../utils/colors';
import { connect } from 'react-redux';
import { addDeck } from '../actions';
import { submitDeck } from '../utils/api';
import { generateId } from '../utils/helpers';

const StyledView = styled.View`
  justify-content: center;
  width: ${Dimensions.get('window').width};
  height: 40%;
  padding: 20px;
`
const Title = styled.Text`
  font-size: 25px;
  font-weight: bold;
  text-align: center;
`

const Input = styled.TextInput`
  width: 100%;
  height: 40px;
  padding: 6px;
  margin-top: 30px;
  align-self: center;
`

const Submit = styled.TouchableOpacity`
  width: 100%;
  height: 35px;
  margin-top: 15px;
  background-color: ${green};
  justify-content: center;
  align-items: center;
`

class AddDeck extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isFocused: false,
      text: ''
    }
  }

  handleFocus = event => {
    this.setState({ isFocused: true });

    if (this.props.onFocus) {
      this.props.onFocus(event);
    }
  }

  handleBlur = event => {
    this.setState({ isFocused: false });

    if (this.props.onFocus) {
      this.props.onBlur(event);
    }
  }

  handleSubmit = async () => {

    const { text } = this.state;

    // Create a deck object
    const deck = {
      id: generateId(),
      title: text,
      cards: []
    }

    // Clean deck title
    this.setState({ text: '' });

    this.props.dispatch(addDeck(deck.id, deck.title));

    submitDeck(deck)
  }

  render() {
    const { isFocused, text } = this.state;

    return (
      <StyledView>
        <Title>What is the title of your new deck?</Title>
        <Input
          placeholder={"DECK TITLE"}
          selectionColor={green}
          onFocus={this.handleFocus}
          onBlur={this.handlBlur}
          underlineColorAndroid={isFocused ? green : lightGray}
          onChangeText={(text) => this.setState({ text })}
          value={text}
        />
        <Submit onPress={this.handleSubmit}>
          <Text style={{ color: white, fontWeight: 'bold' }}>ADD DECK</Text>
        </Submit>
      </StyledView>
    )
  }
}

export default connect()(AddDeck)
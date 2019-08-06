import React, { Component } from 'react';
import styled from 'styled-components/native';
import { green, white, purple, red } from '../utils/colors';
import { removeDeck } from '../utils/api';
import { connect } from 'react-redux';

const StyledView = styled.View`
    justify-content: center;
    align-items: center;
    margin-top: 100px;
`

const Title = styled.Text`
    font-size: 40px;
`

const CardsNumber = styled.Text`
    font-size: 30px;
    margin-bottom: 50px;
    color: #cecece;
    opacity: 0.8;
`

const Button = styled.TouchableOpacity`
  width: 70%;
  height: 50px;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`

const ButtonText = styled.Text`
    font-size: 20px;
    font-weight: bold;
    color: ${white};
`

class DeckDetail extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Deck ${navigation.state.params.title}`,
        headerTitleStyle: { flex: 1, textAlign: 'center' },
        headerStyle: {
            backgroundColor: green
        },
        headerTintColor: white,
    });

    render() {
        const { deck } = this.props.navigation.state.params;

        return (
            <StyledView>
                <Title>{deck.title}</Title>
                <CardsNumber>{deck.cards.length}</CardsNumber>
                <Button style={{ backgroundColor: green }}>
                    <ButtonText>Add Cards</ButtonText>
                </Button>
                <Button style={{ backgroundColor: purple }}>
                    <ButtonText>Start Quiz</ButtonText>
                </Button>
            </StyledView>
        )
    }
}


export default connect()(DeckDetail)
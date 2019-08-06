import React, { Component } from 'react';
import { Dimensions, Text, ToastAndroid } from 'react-native';
import styled from 'styled-components/native';
import { lightGray, green, white } from '../utils/colors';
import { connect } from 'react-redux';
import { generateId } from '../utils/helpers';
import { saveCard } from '../utils/api';
import { addCard } from '../actions';

const StyledView = styled.View`
	justify-content: center;
	width: ${Dimensions.get('window').width};
	height: 40%;
	padding: 20px;
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

class AddCard extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isFocused: false,
            question: '',
            answer: ''
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

    handleSubmit = () => {
        const { question, answer } = this.state;
        const { deck } = this.props.navigation.state.params;

        if (question !== '' && answer !== '') {
            const card = {
                id: generateId(),
                question,
                answer,
            }

            saveCard(deck.id, card);

            this.props.navigation.goBack();

            this.props.dispatch(addCard(deck.id, question, answer));

        }
        else {
            ToastAndroid.show("You cannot submit a card without question and answer", ToastAndroid.SHORT);
        }
    }

    render() {
        const { isFocused, question, answer } = this.state;

        return (
            <StyledView>
                <Input
                    placeholder={"QUESTION"}
                    selectionColor={green}
                    onFocus={this.handleFocus}
                    onBlur={this.handlBlur}
                    underlineColorAndroid={isFocused ? green : lightGray}
                    onChangeText={(text) => this.setState({ question: text })}
                    value={question}
                />

                <Input
                    placeholder={"ANSWER"}
                    selectionColor={green}
                    onFocus={this.handleFocus}
                    onBlur={this.handlBlur}
                    underlineColorAndroid={isFocused ? green : lightGray}
                    onChangeText={(text) => this.setState({ answer: text })}
                    value={answer}
                />

                <Submit onPress={this.handleSubmit}>
                    <Text style={{ color: white, fontWeight: 'bold' }}>ADD CARD</Text>
                </Submit>
            </StyledView>
        )
    }
}

export default connect()(AddCard);
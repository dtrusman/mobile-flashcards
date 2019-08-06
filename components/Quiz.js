import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { green, white, red } from '../utils/colors';

const StyledView = styled.View`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  padding: 10px;
`

const Card = styled.View`
  width: 100%;
  height: 150px;
  border: 1px solid ${green};
  border-radius: 10px;
  padding: 10px;
`

const Question = styled.Text`
  width: 90%;
  font-size: 20px;
  font-weight: bold;
  text-align: center;
`

const Answer = styled.Text`
  font-size: 20px;
  margin-top: 15px;
  font-weight: bold;
  text-align: center;
`

const NumberQuestions = styled.Text`
  font-size: 14px;
  font-weight: bold;
`

const BtnShow = styled.TouchableOpacity`
	width: 100%;
	height: 50px;
	margin-top: 30px;
	background-color: ${green};
	justify-content: center;
	align-items: center;
`

const BtnCorrect = styled.TouchableOpacity`
	width: 50%;
	height: 40px;
	margin-top: 10px;
	background-color: ${green};
	justify-content: center;
	align-items: center;
`

const BtnIncorrect = styled.TouchableOpacity`
	width: 50%;
	height: 40px;
	margin-top: 10px;
	background-color: ${red};
	justify-content: center;
	align-items: center;
`

const Text = styled.Text`
    font-size: 18px;
    font-weight: bold;
    color: ${white}
`

const QuestionContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`

const AnswerContainer = styled.View`
    width: 100%;
    justify-content: space-between;
`

const BtnContainer = styled.View`
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
`

const CORRECTION = {
    CORRECT: 'CORRECT',
    INCORRECT: 'INCORRECT'
}

class Quiz extends Component {

    constructor(props) {
        super(props);

        this.state = {
            totalQuestions: 0,
            remaningQuestions: 1,
            correctAnswer: 0,
            showBtn: true,
            currentQuestionIndex: 0,
        }
    }

    componentDidMount() {
        const deck = this.props.navigation.getParam('deck');

        this.setState({
            totalQuestions: deck.cards.length
        });
    }

    showAnswer = () => {
        this.setState({ showBtn: false });
    }

    renderShowBtn = () => {
        const { showBtn } = this.state;

        if (showBtn) {
            return (
                <BtnShow onPress={this.showAnswer}>
                    <Text>Show Answer</Text>
                </BtnShow>
            )
        }
    }

    handleCorrection = (correction) => {
        this.setState((prevState) => ({
            correctAnswer: correction === CORRECTION.CORRECT ? prevState.correctAnswer + 1 : prevState.correctAnswer,
            currentQuestionIndex: prevState.currentQuestionIndex + 1 < prevState.totalQuestions ? prevState.currentQuestionIndex + 1 : 0,
            showBtn: !prevState.showBtn,
            remaningQuestions: prevState.remaningQuestions < prevState.totalQuestions ? prevState.remaningQuestions + 1 : 1
        }))
    }

    renderAnswer = () => {
        const { showBtn, currentQuestionIndex } = this.state;
        const deck = this.props.navigation.getParam('deck');

        if (!showBtn) {
            return (
                <AnswerContainer>
                    <Answer>{deck.cards[currentQuestionIndex].answer}</Answer>
                    <BtnContainer>
                        <BtnCorrect onPress={() => this.handleCorrection(CORRECTION.CORRECT)}>
                            <Text>Correct</Text>
                        </BtnCorrect>
                        <BtnIncorrect onPress={() => this.handleCorrection(CORRECTION.INCORRECT)}>
                            <Text>Inorrect</Text>
                        </BtnIncorrect>
                    </BtnContainer>
                </AnswerContainer>
            )
        }
    }

    render() {
        const { totalQuestions, remaningQuestions, currentQuestionIndex } = this.state;
        const deck = this.props.navigation.getParam('deck');

        return (
            <StyledView>
                <Card>
                    <QuestionContainer>
                        <Question>{deck.cards[currentQuestionIndex].question}</Question>
                        <NumberQuestions>{`${remaningQuestions}/${totalQuestions}`}</NumberQuestions>
                    </QuestionContainer>
                    {this.renderShowBtn()}
                    {this.renderAnswer()}
                </Card>
            </StyledView>
        )
    }
}

export default connect()(Quiz);
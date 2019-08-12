import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import styled from 'styled-components/native';
import { connect } from 'react-redux';
import { green, white, red } from '../utils/colors';

const StyledView = styled.View`
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
  padding: 10px;
`

const ErrorView = styled.View`
  height: 100%;
  justify-content: center;
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

const BtnRestart = styled.TouchableOpacity`
	width: 50%;
	height: 40px;
	margin-top: 10px;
	background-color: ${green};
	justify-content: center;
	align-items: center;
`

const BtnBack = styled.TouchableOpacity`
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
      correctAnswers: 0,
      showBtn: true,
      currentQuestionIndex: 0,
      end: false
    }
  }

  componentDidMount() {
    const deck = this.props.navigation.getParam('deck');

    if (deck.cards.length > 0) {
      this.setState({
        totalQuestions: deck.cards.length
      });
    }

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
      correctAnswers: correction === CORRECTION.CORRECT ? prevState.correctAnswers + 1 : prevState.correctAnswers,
      currentQuestionIndex: prevState.currentQuestionIndex + 1 < prevState.totalQuestions ? prevState.currentQuestionIndex + 1 : 0,
      showBtn: !prevState.showBtn,
      remaningQuestions: prevState.remaningQuestions < prevState.totalQuestions ? prevState.remaningQuestions + 1 : 1,
      end: prevState.remaningQuestions === prevState.totalQuestions ? true : false
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

  restart = () => {
    const deck = this.props.navigation.getParam('deck');

    this.setState({
      totalQuestions: deck.cards.length,
      remaningQuestions: 1,
      correctAnswers: 0,
      showBtn: true,
      currentQuestionIndex: 0,
      end: false
    })
  }

  renderFinalResult = () => {
    const { end, correctAnswers, totalQuestions } = this.state;

    const percent = (correctAnswers / totalQuestions * 100).toPrecision(4);

    if (end) {
      return (
        <View>
          <Text style={{ color: '#000000' }}>{`${correctAnswers} - ${percent}%`}</Text>
          <BtnRestart onPress={this.restart}>
            <Text>Restart</Text>
          </BtnRestart>

          <BtnBack onPress={() => this.props.navigation.goBack()}>
            <Text>Back</Text>
          </BtnBack>
        </View>
      )
    }
  }

  renderQuestion = () => {
    const { totalQuestions, remaningQuestions, currentQuestionIndex } = this.state;
    const deck = this.props.navigation.getParam('deck');
    return (
      <View>
        <QuestionContainer>
          <Question>{deck.cards[currentQuestionIndex].question}</Question>
          <NumberQuestions>{`${remaningQuestions}/${totalQuestions}`}</NumberQuestions>
        </QuestionContainer>
        {this.renderShowBtn()}
        {this.renderAnswer()}
      </View>
    )
  }

  render() {
    const { end, totalQuestions } = this.state;

    if (totalQuestions === 0) {
      return (
        <ErrorView>
          <Text style={{ color: '#000000', textAlign: "center", fontSize: 20 }}>Sorry, you cannot take a quiz because there are no cards in the deck</Text>
        </ErrorView>
      )
    }

    return (
      <StyledView>
        <Card>
          {end ? this.renderFinalResult() : this.renderQuestion()}
        </Card>
      </StyledView>
    )
  }
}

export default connect()(Quiz);
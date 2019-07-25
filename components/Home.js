import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native'

const StyledView = styled.View`
  justify-content: center;
  align-items: center;
  width: ${Dimensions.get('window').width};
  height: ${Dimensions.get('window').height};
`

const StyledText = styled.Text`
  color: red;
`

export default class Home extends Component {
    render() {
        return (
            <StyledView>
                <StyledText>HOME!</StyledText>
            </StyledView>
        )
    }
}

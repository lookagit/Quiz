import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';
/* Packages */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
/* Actions */
import { start } from '../../redux/quizState';
import { TouchableOpacity } from 'react-native';

const mainActions = { start };

class InitScreen extends Component {
  componentDidUpdate(prevProps) {
    const { questions, navigation } = this.props;
    if (questions.length) {
      navigation.navigate('QuestionsScreen');
    }
  }
  render() {
    const {
      start,
      navigation: {
        navigate
      }
    } = this.props;
    return (
      <View style={styles.conainer}>
        <Text>LETS START</Text>
        <TouchableOpacity 
          style={styles.buttonStyle}
          onPress={() => {
            start();
            navigate('QuestionsScreen');
          }}
        >
          <Text style={styles.textStyle}>CLICK HERE</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonStyle: { 
    width: 100, 
    height: 35, 
    justifyContent: 'center', 
    alignItems: 'center', 
    backgroundColor: 'yellow'
  },
  textStyle: { 
    color: 'blue', 
    fontSize: 20
  }
});

export default connect(
  ({ quizState }) => ({
    questions: quizState.questions
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(InitScreen);
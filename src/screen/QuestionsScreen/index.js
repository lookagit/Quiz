import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView
} from 'react-native';
/* Packages */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CheckBox from 'react-native-check-box'
/* Actions */
import { getAnswersStart, finished } from '../../redux/quizState';

const mainActions = { getAnswersStart, finished };

class QuestionsScreen extends Component {

  componentDidUpdate(prevProps) {
    console.log("JA SAM PROSP ", this.props);
    const { questions, answersNumber } = this.props;
    if (questions.length === answersNumber) {
      const {
        navigation: {
          navigate
        },
        finished
      } = this.props;
      finished();
      navigate('LastScreen');
    }
  }

  renderQuestion = (question, key, isCheckedTrue, isCheckedFalse) => (
    <View
      style={styles.questionWrapper}
      key={key}
    >
      <Text style={styles.questionText}>{`${key + 1} ${decodeURIComponent(question)}`}</Text>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <CheckBox
          style={styles.checkBox}
          onClick={() => this.props.getAnswersStart(key, true, 'Yes')}
          isChecked={isCheckedTrue}
          rightText="Yes"
        />
        <CheckBox
          style={styles.checkBox}
          onClick={() => this.props.getAnswersStart(key, false, 'No')}
          isChecked={isCheckedFalse}
          rightText="No"
        />
      </View>
    </View>
  );

  render() {
    const {
      questions,
      navigation: {
        navigate
      }
    } = this.props;
    return (
      <ScrollView
        contentContainerStyle={styles.conainer}
      >
        <Text>Good luck</Text>
        {
          questions.map((item, key) =>
            this.renderQuestion(item.question, key, item.isCheckedTrue, item.isCheckedFalse)
          )
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  conainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionWrapper: {
    flex: 1,
    flexDirection: 'column',
  },
  questionText: {
    color: 'black',
    textAlign: 'center'
  },
  checkBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});

export default connect(
  ({ quizState }) => ({
    questions: quizState.questions,
    answersNumber: quizState.answersNumber
  }),
  dispatch => bindActionCreators(mainActions, dispatch)
)(QuestionsScreen);
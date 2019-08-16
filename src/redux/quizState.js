import { mergeMap, map } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { from } from 'rxjs';
import axios from 'axios';
export const START = 'quiz/START';
export const STOP = 'quiz/STOP';
export const GET_QUESTIONS = 'quiz/GET_QUESTIONS';
export const GET_QUESTIONS_SUCCESS = 'quiz/GET_QUESTIONS_SUCCESS';
export const GET_QUESTIONS_FAILED = 'quiz/GET_QUESTIONS_FAILED';
export const ANSWER_SET = 'quiz/ANSWER_SET';
export const ANSWER_SET_START = 'quiz/ANSWER_SET_START';
export const FINISHED = 'quiz/FINISHED';

import moment from 'moment';
import Api from '../helper/Api';

const apiFetch = new Api();

const initState = {
  questions: [],
  startTime: null,
  endName: null,
  totalTime: null,
  errors: null,
  answersNumber: 0,
  score: 0,
  loading: false
}

export default (state = initState, { type, payload }) => {
  switch (type) {
    case START:
      return {
        ...state,
        startTime: payload.startTime
      };
    case GET_QUESTIONS:
      return {
        ...state,
        loading: true,
      }
    case GET_QUESTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        questions: [...payload]
      }
    case ANSWER_SET:
      return {
        ...state,
        questions: payload,
        answersNumber: payload.filter(item => item.isAnswered).length,
        score: payload.filter(item => {
          console.log("JA SAM ITEM ", item.correct_answer === item.answer, item.correct_answer, item.answer);
          return item.correct_answer === item.answer
        }).length,
      };
    case FINISHED:
      return {
        ...state,
        endTime: payload,
        totalTime: Math.abs(state.startTime.diff(payload, 'second'))
      };
    default:
      return state
  }
}

export const start = () => ({
  type: START,
  payload: {
    startTime: moment(),
    loading: true,
  }
})

export const finished = () => ({
  type: FINISHED,
  payload: moment()
})

export const getAnswersStart = (id, answer, responseType) => ({
  type: ANSWER_SET_START,
  payload: {
    id, 
    answer, 
    responseType
  }
})

export const getQuestions = action$ => action$.pipe(
    ofType(START),
    mergeMap(action => {
      return from(apiFetch.fetch('GET', '/api.php?amount=10&type=boolean&encode=url3986', {}))
    }),
    map(action => ({
      type: GET_QUESTIONS_SUCCESS,
      payload: action.data.results
    }))
  )

export const questionAnswer = (action$, store) => action$.pipe(
    ofType(ANSWER_SET_START),
    map(({ payload }) => {
      const { id, answer, responseType } = payload;
      console.log("JA SAM ANSWER ", answer);
      const { quizState } = store.value;
      const { questions } = quizState;
      const withAnswer = questions.map((item, index) => {
        if (index === id) {
          const responseAnswer = {
            ...item,
            answer,
            isAnswered: true,
            isCheckedTrue: responseType === 'Yes' ? true : false,
            isCheckedFalse: responseType === 'No' ? true : false
          };
          return responseAnswer;
        }
        return item;
      });
      return {
        type: ANSWER_SET,
        payload: withAnswer
      }
    })
  )


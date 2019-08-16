import { createStore, applyMiddleware, combineReducers } from 'redux';

/* Packages */
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { createEpicMiddleware, combineEpics } from 'redux-observable';

/* Reducers */
import quizState, { getQuestions, questionAnswer } from './quizState'

const combinedEpics = combineEpics(
  getQuestions,
  questionAnswer
)

const observableMiddleware = createEpicMiddleware();

const middlewares = [observableMiddleware];

if (__DEV__) { //Include logger only in dev builds.
  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry.error //Only show errors as non collapsed logs
  });

  middlewares.push(logger);
};

const store = createStore(
  combineReducers({
    quizState,
  }),
  applyMiddleware(...middlewares)
);

observableMiddleware.run(combinedEpics);

export default () => store;
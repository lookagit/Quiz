import React from 'react';
import { Provider } from 'react-redux';
import Router from './src/Router';

import store from './src/redux';

const createStore = store();
export default class App extends React.Component {
  render() {
    return (
      <Provider store={createStore}>
        <Router />
      </Provider>
    )
  }
}


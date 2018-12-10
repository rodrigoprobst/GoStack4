import React from 'react';
import { Provider } from 'react-redux';
import './config/reactotron';
import store from './store';

import Routes from './routes';

import GlobalStyled from './assets/styles/global';

const App = () => (
  <Provider store={store}>
    <GlobalStyled />
    <Routes />
  </Provider>
);

export default App;

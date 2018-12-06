import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Main from './pages/Main';

import GlobalStyled from './assets/styles/global';

const App = () => (
  <Provider store={store}>
    <GlobalStyled />
    <Main />
  </Provider>
);

export default App;

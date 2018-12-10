import React, { Component } from 'react';
// import styles from './styles';

import TodoList from '../TodoList';

export default class Main extends Component {
  state = {
    // loading: false,
  };

  render() {
    return <TodoList />;
  }
}

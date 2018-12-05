import React, { Component, Fragment } from 'react';

import Header from './Header';
import Container from './Container';
import Card from './Card';

class App extends Component {
  state = {
    posts: [
      {
        id: 1,
        img:
          'https://scontent.fbnu1-1.fna.fbcdn.net/v/t1.0-9/27545633_1785560428183232_5038773425776957723_n.jpg?_nc_cat=107&_nc_ht=scontent.fbnu1-1.fna&oh=7a2823c0182d575cbb68b2f8e1610fb8&oe=5C68EFFF',
        name: 'Rodrigo Becker Probst',
        momentPost: 'há 10 min',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: 2,
        img:
          'https://scontent.fbnu1-1.fna.fbcdn.net/v/t1.0-9/20708012_1690525021000251_6542146042100654834_n.jpg?_nc_cat=110&_nc_ht=scontent.fbnu1-1.fna&oh=bf55fad15e8253272fe93d269474ef58&oe=5C64268B',
        name: 'Joice Ramos',
        momentPost: 'há 20 min',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
      {
        id: 3,
        img: 'https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_smart_guy-512.png',
        name: 'Desconhecido',
        momentPost: 'há 40 min',
        content:
          'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      },
    ],
  };

  render() {
    const { posts } = this.state;
    return (
      <Fragment>
        <Header />
        <Container>{posts && posts.map(post => <Card key={post.id} data={post} />)}</Container>
      </Fragment>
    );
  }
}

export default App;

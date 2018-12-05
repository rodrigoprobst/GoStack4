import React, { Component } from 'react';
import moment from 'moment';
import { Container, Form } from './styles';
import logo from '../../assets/img/logo.png';

import api from '../../services/api';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: [],
    repositoryError: false,
    loading: false,
  };

  handleAddRepository = async (e) => {
    e.preventDefault();
    const { repositoryInput, repositories } = this.state;

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositories: [...repositories, repository],
        repositoryInput: '',
      });
    } catch (error) {
      this.setState({
        repositoryError: true,
        repositoryInput: '',
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const {
      repositories, repositoryInput, repositoryError, loading,
    } = this.state;
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            value={repositoryInput}
            type="text"
            placeholder="usuário/repositório"
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spin fa-spinner" /> : 'OK'}</button>
        </Form>
        <CompareList repositories={repositories} />
      </Container>
    );
  }
}

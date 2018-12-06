import React, { Component } from 'react';
import moment from 'moment';
import { Container, Form } from './styles';
import logo from '../../assets/img/logo.png';

import api from '../../services/api';

import CompareList from '../../components/CompareList';

export default class Main extends Component {
  state = {
    repositoryInput: '',
    repositories: JSON.parse(localStorage.getItem('repositories')) || [],
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

      localStorage.setItem('repositories', JSON.stringify([...repositories, repository]));
      this.setState({
        repositories: JSON.parse(localStorage.getItem('repositories')),
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

  handleRemoveRepository = async (e) => {
    e.preventDefault();
    const { repositories } = this.state;

    const repositoryId = parseInt(e.target.getAttribute('data-key'), 10);
    const newRepositories = repositories.filter(repository => repository.id !== repositoryId);

    localStorage.setItem('repositories', JSON.stringify(newRepositories));

    this.setState({
      repositories: newRepositories,
      repositoryInput: '',
    });
  };

  handleUpdateRepository = async (e) => {
    e.preventDefault();
    const { repositories } = this.state;
    const repositoryId = parseInt(e.target.getAttribute('data-key'), 10);
    const thisRepository = repositories.filter(repository => repository.id === repositoryId);
    const { full_name: fullName } = thisRepository[0];
    const newRepositories = repositories.filter(repository => repository.id !== repositoryId);

    try {
      const { data: repository } = await api.get(`/repos/${fullName}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      newRepositories.push(repository);

      localStorage.setItem('repositories', JSON.stringify(newRepositories));
      this.setState({
        repositories: newRepositories,
        repositoryInput: '',
      });
    } catch (error) {
      console.log(error);
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
        <CompareList
          handleUpdateRepository={this.handleUpdateRepository}
          handleRemoveRepository={this.handleRemoveRepository}
          repositories={repositories}
        />
      </Container>
    );
  }
}

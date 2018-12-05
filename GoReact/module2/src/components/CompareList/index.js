import React from 'react';
import PropTypes from 'prop-types';
import { Container, Repository } from './styles';

const CompareList = ({ repositories }) => (
  <Container>
    {repositories.map((repository) => {
      const {
        owner: { avatar_url: avatarUrl, login },
        id,
        name,
        stargazers_count: stargazersCount,
        forks_count: forksCount,
        open_issues: openIssues,
        lastCommit,
      } = repository;
      return (
        <Repository key={id}>
          <header>
            <img src={avatarUrl} alt={login} />
            <strong>{name}</strong>
            <small>{login}</small>
          </header>
          <ul>
            <li>
              {stargazersCount}
              {' '}
              <small>stars</small>
            </li>
            <li>
              {forksCount}
              {' '}
              <small>forks</small>
            </li>
            <li>
              {openIssues}
              {' '}
              <small>issues</small>
            </li>
            <li>
              {lastCommit}
              {' '}
              <small>last commit</small>
            </li>
          </ul>
        </Repository>
      );
    })}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues: PropTypes.number,
      lastCommit: PropTypes.string,
      owner: PropTypes.arrayOf({
        avatar_url: PropTypes.string,
        login: PropTypes.string,
      }),
    }),
  ).isRequired,
};

export default CompareList;

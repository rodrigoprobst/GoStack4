import React from 'react';
import PropTypes from 'prop-types';
import CardHeader from './CardHeader';

const Container = ({ data }) => {
  const {
    img, name, momentPost, content,
  } = data;
  return (
    <div className="card">
      <CardHeader img={img} name={name} momentPost={momentPost} />
      <hr />
      <p>{content}</p>
    </div>
  );
};

Container.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    momentPost: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

export default Container;

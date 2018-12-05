import React from 'react';
import PropTypes from 'prop-types';

const Container = ({ img, name, momentPost }) => (
  <div className="flex">
    <img src={img} alt={name} title={name} className="image-user" />
    <h3>
      {name}
      <br />
      <small>{momentPost}</small>
    </h3>
  </div>
);

Container.defaultProps = {
  img: 'https://cdn0.iconfinder.com/data/icons/avatars-3/512/avatar_smart_guy-512.png',
};

Container.propTypes = {
  img: PropTypes.string,
  name: PropTypes.string.isRequired,
  momentPost: PropTypes.string.isRequired,
};

export default Container;

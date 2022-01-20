import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { id, image, title, price } = this.props;

    return (
      <Link to={ `/product/${id}` }>
        <div data-testid="product">
          <img
            src={ image }
            alt={ title }
          />
          <h3>{ title }</h3>
          <p>{ price }</p>
        </div>
      </Link>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

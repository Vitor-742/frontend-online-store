import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { image, title, price } = this.props;

    return (
      <div data-testid="product">
        <img
          src={ image }
          alt={ title }
        />
        <h3>{ title }</h3>
        <p>{ price }</p>
      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

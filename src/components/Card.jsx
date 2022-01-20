import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Card extends Component {
  render() {
    const { image, title, price, addCart, id } = this.props;

    return (
      <div data-testid="product">
        <img
          src={ image }
          alt={ title }
        />
        <h3>{ title }</h3>
        <p>{ price }</p>
        <button data-testid="product-add-to-cart" onClick={ () => addCart(id) }>Adicionar ao carrinho</button>
      </div>
    );
  }
}

Card.propTypes = {
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

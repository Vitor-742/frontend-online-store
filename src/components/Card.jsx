import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { product, addCart } = this.props;
    const { thumbnail, title, price, id } = product;

    return (
      <div>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div data-testid="product">
            <img src={ thumbnail } alt={ title } />
            <h3 data-testid="shopping-cart-product-name">{ title }</h3>
            <p>{ price }</p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addCart(product) }
        >
          Adicionar ao carrinho
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string,
  thumbnail: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

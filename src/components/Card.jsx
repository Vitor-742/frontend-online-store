import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  render() {
    const { image, title, price, addCart, id } = this.props;

    return (
      <div>
        <Link to={ `/product/${id}` } data-testid="product-detail-link">
          <div data-testid="product">
            <img src={ image } alt={ title } />
            <h3>{ title }</h3>
            <p>{ price }</p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ () => addCart(id) }
        >
          Adicionar ao carrinho
        </button>
      </div> // pode ter erro
    );
  }
}

Card.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

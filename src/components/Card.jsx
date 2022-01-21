import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default class Card extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      productQuantity: 1,
    };
  }

  handleClick(event) {
    const { name } = event.target;

    if (name === 'add') {
      this.setState((state) => {
        this.setState({ productQuantity: state.productQuantity + 1 });
      });
    } else {
      this.setState((state) => {
        const { productQuantity } = state;
        if (productQuantity > 0) this.setState({ productQuantity: productQuantity - 1 });
      });
    }
  }
  render() {
    const { id, image, title, price, remove } = this.props;
    const { productQuantity } = this.state;

    return (
      <div>
      <Link to={`/product/${id}`} data-testid="product-detail-link">
        <div data-testid="product">
          <img
            src={image}
            alt={title}
          />
          <h3>{title}</h3>
          <p>{price}</p>
        </div>
      </Link>
      <button
          data-testid="product-decrease-quantity"
          type="buton"
          name="sub"
          onClick={this.handleClick}>
          -
        </button>
        <p>{productQuantity}</p>
        <button
          data-testid="product-increase-quantity"
          type="button"
          name="add"
          onClick={this.handleClick}>
          +
        </button>
        <button
          type="button"
          onClick={ () => remove() }
        >
          x
        </button>
      </div>
    );
  }
}

Card.propTypes = {
  id: PropTypes.string,
  image: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.string,
}.isRequired;

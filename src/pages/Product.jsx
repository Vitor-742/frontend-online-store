import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      title: '',
    };
  }

  componentDidMount() {
    this.getDetails();
  }

  getDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductDetails(id);
    this.setState({ title: product.title });
  }

  addCart = (id) => {
    const aux = [...JSON.parse(localStorage.getItem('cartIds')), id];
    localStorage.setItem('cartIds', JSON.stringify(aux));
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const { title } = this.state;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f6d2.png" alt="carrinho" />
        </Link>
        <div>
          <h1 data-testid="product-detail-name">{ title }</h1>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addCart(id) }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>

    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;

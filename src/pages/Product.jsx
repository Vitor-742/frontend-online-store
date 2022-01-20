import React from 'react';
import PropTypes from 'prop-types';
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

  render() {
    const { title } = this.state;
    return (
      <h1 data-testid="product-detail-name">{ title }</h1>
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

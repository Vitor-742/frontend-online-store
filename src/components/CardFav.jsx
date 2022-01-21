import React from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

class CardFav extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.montaArray();
  }

    montaArray = () => {
      const { id } = this.props;
      this.setState({ loading: false }, async () => {
        const product = await getProductDetails(id);
        this.setState({
          produto: product,
          loading: true,
        });
      });
    }

    render() {
      const { loading, produto } = this.state;
      return (
        <div>
          {loading && <p data-testid="shopping-cart-product-name">{produto.title}</p>}
          <p data-testid="shopping-cart-product-quantity">1</p>
        </div>

      );
    }
}

CardFav.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CardFav;

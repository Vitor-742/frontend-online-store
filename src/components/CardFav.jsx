import React from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

class CardFav extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      loading: false,
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

  removeItem() {
    if (localStorage.getItem('cartIds')) {
        const cartIds= localStorage.getItem('cartIds').split('-').filter((item) => item !== '')
        console.log(cartIds)
    }
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
      const { loading, produto, productQuantity } = this.state;
      return (
        <div>
          {loading && <p data-testid="shopping-cart-product-name">{produto.title}</p>}
          <div  data-testid="shopping-cart-product-quantity" >
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
          onClick= { () => this.removeItem()}
        >
          x
        </button>
          </div>
        </div>
       
      );
    }
}

CardFav.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CardFav;
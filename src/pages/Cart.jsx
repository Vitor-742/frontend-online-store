import React from 'react';
import { Link } from 'react-router-dom';
import CardFav from '../components/CardFav';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartIds: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setarCartIds();
  }

  setarCartIds= () => {
    const cartIds = JSON.parse(localStorage.getItem('cartIds'));
    this.setState({ loading: false }, () => {
      this.setState({
        cartIds,
        loading: true,
      });
    });
  }

  render() {
    const { cartIds, loading } = this.state;
    return (
      <div>
        <Link to="/checkout" data-testid="checkout-products">Finalizar compra</Link>
        { cartIds.length > 0 && loading
          ? cartIds.map((product) => (
            <CardFav
              product={ product }
              key={ product.id }
              func={ this.setarCartIds }
            />))
          : <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
      </div>
    );
  }
}

export default Cart;

import React from 'react';
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
    if (typeof localStorage.getItem('cartIds') === 'string') {
      const cartIds = localStorage.getItem('cartIds')
        .split('-')
        .filter((item) => item !== '');
      this.setState({ loading: false }, () => {
        this.setState({
          cartIds,
          loading: true,
        });
      });
    }
  }

  render() {
    const { cartIds, loading } = this.state;
    return (
      <div>
        { cartIds.length > 0 && loading
          ? cartIds.map((id) => (
            <CardFav
              id={ id }
              key={ id }
              func={ this.setarCartIds }
            />))
          : <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
      </div>
    );
  }
}

export default Cart;

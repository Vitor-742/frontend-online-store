import React from 'react';
import CardFav from '../components/CardFav';

class Cart extends React.Component {
  constructor() {
    super();
    this.state = {
      cartIds: [],
    };
  }

  componentDidMount() {
    this.setarCartIds();
  }

  setarCartIds() {
    if (localStorage.getItem('cartIds')) {
      this.setState({
        cartIds: localStorage.getItem('cartIds').split('-').filter((item) => item !== ''),
      });
    }
  }

  render() {
    const { cartIds } = this.state;
    return (
      <div>
        <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>
        { cartIds && cartIds.map((id) => <CardFav id={ id } key={ id } />)}
      </div>
    );
  }
}

export default Cart;

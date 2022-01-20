import React from 'react';
import CardFav from '../components/CardFav'

class Cart extends React.Component {

  componentDidMount() {
    this.setArray()
  }

  setArray = async() => {
    /* this.setState({ cartIds: cartIds }) */
  }

  render() {
    const cartIds = localStorage.getItem('cartIds').split('-').filter((item) => item !== '')
    return (
      <div>
        { !localStorage.getItem('cartIds')
        && <h1 data-testid="shopping-cart-empty-message">Seu carrinho está vazio</h1>}
        {cartIds.map((id) => <CardFav id={id} key={id} />)}
      </div>
    );
  }
}

export default Cart;

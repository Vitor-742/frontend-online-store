import React from 'react';
import { Link } from 'react-router-dom';

class Checkout extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  componentDidMount() {
    this.buscaCarrinho();
  }

  buscaCarrinho() {
    const items = JSON.parse(localStorage.getItem('cartIds'));
    const totalPrice = items.reduce((acc, item) => acc + item.price, 0);
    this.setState({
      totalPrice,
      items,
      loading: true,
    });
  }

  render() { // o requisito pede tbm para nao deixar submeter caso os campos nao estejam preenchidos
    const { loading, items, totalPrice } = this.state;
    return (
      <section>
        <div>
          {loading && items.map((item) => <p key={ item.id }>{item.title}</p>)}
          <p>{`preço total: ${totalPrice}`}</p>
        </div>
        <div>
          <input type="text" data-testid="checkout-fullname" placeholder="Nome" />
          <input type="text" data-testid="checkout-email" placeholder="Email" />
          <input type="text" data-testid="checkout-cpf" placeholder="CPF" />
          <input type="text" data-testid="checkout-phone" placeholder="Telefone" />
          <input type="text" data-testid="checkout-cep" placeholder="CEP" />
          <input type="text" data-testid="checkout-address" placeholder="Endereço" />
          <Link to="/"><button type="button">Comprar</button></Link>
        </div>
      </section>

    );
  }
}

export default Checkout;

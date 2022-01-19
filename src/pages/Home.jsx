import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromQuery } from '../services/api';
import Card from '../components/Card';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      inputText: '',
    };
  }

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleClick = async () => {
    const { inputText } = this.state;
    const requisicao = await getProductsFromQuery(inputText);
    this.setState({ productsList: requisicao });
  }

  render() {
    const { productsList } = this.state;
    const initailMessage = (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>);

    return (
      <div>
        { productsList.length === 0 && initailMessage }
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f6d2.png" alt="carrinho" />
        </Link>
        <input
          data-testid="query-input"
          type="text"
          onChange={ this.handleChange }
        />
        <button
          data-testid="query-button"
          type="button"
          onClick={ this.handleClick }
        >
          Buscar
        </button>

        { productsList.length !== 0 && productsList.map((product) => (<Card
          key={ product.id }
          image={ product.thumbnail }
          title={ product.title }
          price={ product.price }
        />))}
      </div>
    );
  }
}

export default Home;

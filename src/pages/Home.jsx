import React from 'react';
import { Link } from 'react-router-dom';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
    };
  }

  render() {
    const { productsList } = this.state;
    const initailMessage = (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>
    );
    return (
      <div>
        { productsList.length === 0 && initailMessage }
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f6d2.png" alt="carrinho" />
        </Link>
      </div>
    );
  }
}

export default Home;

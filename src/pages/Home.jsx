import React from 'react';
import { Link } from 'react-router-dom';
import { getProductsFromQuery, getCategories } from '../services/api';
import Card from '../components/Card';

// Camila Zegarra contribuiu com esse código através de vídeo conferência
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      inputText: '',
      categories: [],
    };
    this.updateCategories = this.updateCategories.bind(this);
  }

  componentDidMount() {
    this.updateCategories();
  }

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleClick = async () => {
    const { inputText } = this.state;
    const requisicao = await getProductsFromQuery(inputText);
    this.setState({ productsList: requisicao });
  }

  async updateCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { productsList, categories } = this.state;
    const initailMessage = (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>);

    return (
      <div>
        <div className="fixMessege">
          { productsList.length === 0 && initailMessage }
        </div>
        <div className="fixButton">
          {categories.map(({ id, name }) => (
            <button
              type="button"
              data-testid="category"
              key={ id }
            >
              { name }
            </button>
          ))}
        </div>
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

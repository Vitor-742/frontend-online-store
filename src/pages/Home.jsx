import React from 'react';
import { Link } from 'react-router-dom';
import {
  getCategories,
  getProductsFromQuery,
  getProductsFromCategory,
} from '../services/api';
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
    if (!localStorage.getItem('cartIds')) localStorage.setItem('cartIds', '[]');
  }

  selectCategory = async ({ target: { innerHTML } }) => {
    const { categories } = this.state;
    const categoryId = categories.find(({ name }) => name === innerHTML).id;
    const products = await getProductsFromCategory(categoryId)
      .then((response) => response.results);
    this.setState({ productsList: products });
  }

  handleChange = (event) => {
    this.setState({ inputText: event.target.value });
  }

  handleClick = async () => {
    const { inputText } = this.state;
    const requisicao = await getProductsFromQuery(inputText);
    this.setState({ productsList: requisicao });
  }

  addCart = (id) => {
    const aux = [...JSON.parse(localStorage.getItem('cartIds')), id];
    console.log(aux);
    localStorage.setItem('cartIds', JSON.stringify(aux));
  }

  async updateCategories() {
    const categories = await getCategories();
    this.setState({ categories });
  }

  render() {
    const { productsList, categories } = this.state;
    const initialMessage = (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>
    );
    return (
      <main className="home">
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
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f6d2.png" alt="carrinho" />
        </Link>
        <section className="categories">
          {categories.map(({ id, name }) => (
            <button
              type="button"
              data-testid="category"
              key={ id }
              onClick={ this.selectCategory }
            >
              { name }
            </button>
          ))}
        </section>
        <section className="products">
          { productsList.length === 0
            ? initialMessage
            : productsList.map(({ price, thumbnail, title, id }) => (
              <Card
                key={ id }
                id={ id }
                image={ thumbnail }
                title={ title }
                price={ price }
                addCart={ this.addCart }
              />
            ))}
        </section>
      </main>
    );
  }
}

export default Home;

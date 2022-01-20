import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

// Camila Zegarra contribuiu com esse código através de vídeo conferência
class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
      categories: [],
    };
    this.updateCategories = this.updateCategories.bind(this);
  }

  componentDidMount() {
    this.updateCategories();
  }

  selectCategory = async ({ target: { innerHTML } }) => {
    const { categories } = this.state;
    const categoryId = categories.find(({ name }) => name === innerHTML).id;
    const products = await getProductsFromCategoryAndQuery(categoryId)
      .then((response) => response.results);
    this.setState({ productsList: products });
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
      </span>
    );
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
              onClick={ this.selectCategory }
            >
              { name }
            </button>
          ))}
        </div>
        <Link to="/cart" data-testid="shopping-cart-button">
          <img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f6d2.png" alt="carrinho" />
        </Link>

      </div>
    );
  }
}

export default Home;

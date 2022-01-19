import React from 'react';
import { getCategories } from '../services/api';
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
            >

              { name }

            </button>
          ))}
        </div>
      </div>
    );
  }
}

export default Home;

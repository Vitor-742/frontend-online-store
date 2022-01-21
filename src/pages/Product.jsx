import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductDetails } from '../services/api';
import RatingStar from '../components/RantingStar';

const RATE = 5;
const form = {
  rating: 0,
  email: '',
  comment: '',
};

class Product extends React.Component {
  constructor() {
    super();
    this.state = {
      product: {},
      reviewList: [],
      ...form,
    };
  }

  componentDidMount() {
    this.getDetails();
    this.getReviews();
    this.getCurrentComment();
  }

  getDetails = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const product = await getProductDetails(id);
    this.setState({ product });
  };

  handleRanting = (event) => {
    event.preventDefault();
    this.setState({ rating: Number(event.target.name) }, () => {
      const { rating } = this.state;
      localStorage.setItem('rating', rating);
    });
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      localStorage.setItem(name, value);
    });
  };

  submitReview = (event) => {
    event.preventDefault();
    const { email, rating, comment, reviewList } = this.state;
    const list = [...reviewList, { email, rating, comment }];
    localStorage.setItem('review', JSON.stringify(list));
    this.setState({ ...form });
    Object.keys(form).forEach((name) => localStorage.removeItem(name));
  };

  getReviews = () => {
    if (localStorage.getItem('review')) {
      const reviews = JSON.parse(localStorage.getItem('review'));
      this.setState({ reviewList: [...reviews] });
    } else {
      localStorage.setItem('review', JSON.stringify([]));
    }
  };

  getCurrentComment = () => {
    Object.keys(form).forEach((key) => {
      if (localStorage.getItem(key)) {
        if (key === 'rating') {
          this.setState({ [key]: Number(localStorage.getItem(key)) });
        } else {
          this.setState({ [key]: localStorage.getItem(key) });
        }
      }
    });
  };

  addCart = (id) => {
    if (!localStorage.getItem('cartIds')) localStorage.setItem('cartIds', '');
    const aux = `${localStorage.getItem('cartIds')}-${id}`;
    localStorage.setItem('cartIds', aux);
  }

  render() {
    const { match: { params: { id } } } = this.props;
    const {
      product: { title, thumbnail, price },
      rating,
      comment,
      email,
      reviewList,
    } = this.state;
    const rates = [...Array(RATE + 1).keys()].slice(1);
    /* Source: https://stackoverflow.com/questions/3746725/how-to-create-an-array-containing-1-n */

    return (
      <>
        <header>
          <Link to="/cart" data-testid="shopping-cart-button">
            <img src="https://a.slack-edge.com/production-standard-emoji-assets/13.0/google-large/1f6d2.png" alt="carrinho" />
          </Link>
          <h1 data-testid="product-detail-name">{title}</h1>
          <h2>{`$ ${price}`}</h2>
        </header>
        <main>
          <section className="info">
            <img src={ thumbnail } alt={ title } />
          </section>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.addCart(id) }
          >
            Adicionar ao carrinho
          </button>
          <form>
            <label htmlFor="email">
              Email:
              <input
                id="email"
                type="email"
                data-testid="product-detail-email"
                value={ email }
                onChange={ this.handleChange }
                name="email"
              />
            </label>
            <RatingStar
              array={ rates }
              rating={ rating }
              click={ this.handleRanting }
            />
            <label htmlFor="comment">
              <textarea
                name="comment"
                id="comment"
                cols="30"
                rows="5"
                placeholder="Comentário (opcional)"
                value={ comment }
                onChange={ this.handleChange }
                data-testid="product-detail-evaluation"
              />
            </label>
            <button
              type="submit"
              data-testid="submit-review-btn"
              onClick={ this.submitReview }
            >
              Enviar
            </button>
          </form>
          <section>
            {reviewList
              && reviewList.map((review, index) => (
                <div key={ `${review.email}${index}` }>
                  <span>{ review.email }</span>
                  <RatingStar array={ rates } rating={ review.rating } />
                  {review.comment && <p>{ review.comment }</p>}
                </div>
              ))}
          </section>
        </main>
      </>
    );
  }
}

Product.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Product;

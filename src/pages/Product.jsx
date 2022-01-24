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
    this.getUnfinishedComment();
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

  handleChange = (event) => {
    event.preventDefault();
    const { target } = event;
    const name = target.type === 'button' ? 'rating' : target.name;
    const value = target.type === 'button' ? Number(target.name) : target.value;
    this.setState({ [name]: value }, () => {
      const { product: { id }, email, rating, comment } = this.state;
      const review = { id, email, rating, comment };
      localStorage.setItem(id, JSON.stringify(review));
    })
  }

  submitReview = (event) => {
    event.preventDefault();
    const { product: { id }, email, rating, comment, reviewList } = this.state;
    const list = [...reviewList, { id, email, rating, comment }];
    localStorage.setItem('reviews', JSON.stringify(list));
    this.setState({ ...form });
    localStorage.removeItem(id);
  };

  getReviews = () => {
    const { match: { params: { id } } } = this.props;
    if (localStorage.getItem('reviews')) {
      console.log('aq');
      const reviews = JSON.parse(localStorage.getItem('reviews'))
        .filter((review) => review.id === id);
      console.log(reviews);
      this.setState({ reviewList: [...reviews] });
    }
  };

  getUnfinishedComment = () => {
    const { match: { params: { id } } } = this.props;
    const review = JSON.parse(localStorage.getItem(id));
    if (review) {
      Object.keys(form).forEach((key) => {
        this.setState({ [key]: review[key] });
      })
    }
  }

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
              click={ this.handleChange }
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

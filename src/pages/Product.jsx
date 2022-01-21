import React from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';
import RatingStar from '../components/RantingStar';

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
    if (localStorage.getItem('email')) {
      this.getCurrentComment();
    }
  }

  getDetails = async () => {
    const { match: { params: { id } } } = this.props;
    const product = await getProductDetails(id);
    this.setState({ product: product });
  }

  handleRanting = (event) => {
    event.preventDefault();
    this.setState({ rating: Number(event.target.name)}, () => {
      const { rating } = this.state;
      localStorage.setItem('rating', rating);
    });
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => {
      localStorage.setItem(name, value);
    });
  }

  submitReview = (event) => {
    event.preventDefault();
    const { email, rating, comment, reviewList } = this.state;
    const review = { email, rating, comment };
    const list = [...reviewList, review];
    localStorage.setItem('review', JSON.stringify(list));
    this.setState({ ...form });
    ['email', 'rating', 'comment'].forEach((name) => localStorage.removeItem(name));
  }

  getReviews = () => {
    if (localStorage.getItem('review')) {
      const reviews = JSON.parse(localStorage.getItem('review'));
      this.setState({ reviewList: [...reviews] });
    } else {
      localStorage.setItem('review', JSON.stringify([]));
    }
  }

  getCurrentComment = () => {
    this.setState({
      email: localStorage.getItem('email'),
      rating: localStorage.getItem('rating'),
      comment: localStorage.getItem('comment'),
    });
  }

  render() {
    const { product: { title, thumbnail, price }, rating, comment, email, reviewList } = this.state;
    const rates = [1, 2, 3, 4, 5];

    return (
      <>
      <header>
        <h1 data-testid="product-detail-name">{ title }</h1>
        <h2>{ `$ ${price}` }</h2>
      </header>
      <main>
        <section className="info">
          <img src={ thumbnail } alt={ title } />
        </section>
        <form>
          <label htmlFor="email">
            Email:
            <input id="email" type="email" data-testid="product-detail-email" value={ email } onChange={ this.handleChange } name="email" />
          </label>
          <RatingStar
            array={ rates }
            rating={ rating }
            click={ this.handleRanting }
          />
          <label htmlFor="comment">
            <textarea name="comment" id="comment" cols="30" rows="5" placeholder="Comentário (opcional)" value={ comment } onChange={ this.handleChange } data-testid="product-detail-evaluation" />
          </label>
          <button type="submit" data-testid="submit-review-btn" onClick={ this.submitReview }>Enviar</button>
        </form>
        <section>
          {reviewList && reviewList.map(({ email, rating, comment }, index) => (
            <div key={ `${email}${index}` }>
              <span>{ email }</span>
              <RatingStar array={ rates } rating={ rating } />
              {comment && <p>{ comment }</p>}
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

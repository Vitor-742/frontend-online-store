import React from 'react';
import PropTypes from 'prop-types';

class CardFav extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      loading: false,
      productQuantity: 1,
    };
  }

  componentDidMount() {
    this.montaArray();
  }

  handleClick(event) {
    const { name } = event.target;
    const { productQuantity } = this.state;
    const prevState = productQuantity;
    if (name === 'add') {
      this.setState({ productQuantity: prevState + 1 });
      /* this.setState((state) => {
        this.setState({ productQuantity: state.productQuantity + 1 });
      }); */
    } else if (prevState > 0) this.setState({ productQuantity: prevState - 1 });
  }

   removeItem = (event) => {
     const { func } = this.props;
     const cartIds = JSON.parse(localStorage.getItem('cartIds'));
     const filterIds = cartIds.filter((product) => product.id !== event.target.id);
     localStorage.setItem('cartIds', JSON.stringify(filterIds));
     func();
   }

    montaArray = () => {
      const { product } = this.props;
      this.setState({ loading: false }, () => {
        /* const product = await getProductDetails(id); */
        this.setState({
          produto: product,
          loading: true,
        });
      });
    }

    render() {
      const { loading, produto, productQuantity } = this.state;
      return (
        <div>
          { loading && (
            <div>
              <p data-testid="shopping-cart-product-name">{produto.title}</p>
              <div>
                <button
                  data-testid="product-decrease-quantity"
                  type="button"
                  name="sub"
                  onClick={ this.handleClick }
                >
                  -
                </button>
                <p data-testid="shopping-cart-product-quantity">{productQuantity}</p>
                <button
                  data-testid="product-increase-quantity"
                  type="button"
                  name="add"
                  onClick={ this.handleClick }
                >
                  +
                </button>
                <button
                  type="button"
                  onClick={ this.removeItem }
                  id={ produto.id }
                >
                  x
                </button>
              </div>
            </div>)}
        </div>
      );
    }
}

CardFav.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
  }).isRequired,
  func: PropTypes.func.isRequired,
};

export default CardFav;

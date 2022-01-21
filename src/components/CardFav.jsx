import React from 'react';
import PropTypes from 'prop-types';
import { getProductDetails } from '../services/api';

class CardFav extends React.Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      loading: false,
      productQuantity: 1,
    };
  }

  handleClick(event) {
    const { name } = event.target;

    if (name === 'add') {
      this.setState((state) => {
        this.setState({ productQuantity: state.productQuantity + 1 });
      });
    } else {
      this.setState((state) => {
        const { productQuantity } = state;
        if (productQuantity > 0) this.setState({ productQuantity: productQuantity - 1 });
      });
    }
  }  

   removeItem= (event) => {
    if (localStorage.getItem('cartIds')) {
        const cartIds= localStorage.getItem('cartIds').split('-').filter((item) => item !== '')
       const filterIds= cartIds.filter((id) => id !== event.target.id)  
       console.log(filterIds);
       let aux= [];
       filterIds.length !== 0 ? aux = filterIds.reduce((acc, item) => `${acc}-${item}`) : aux = filterIds;
       localStorage.setItem('cartIds', aux)
       this.props.func()
    }
  }

  componentDidMount() {
    this.montaArray();
  }

    montaArray = () => {
      const { id } = this.props;
      this.setState({ loading: false }, async () => {
        const product = await getProductDetails(id);
        this.setState({
          produto: product,
          loading: true,
        });
      });
    }

    render() {
      const { loading, produto, productQuantity, id} = this.state;
      return (
        <div>
          {loading && <p data-testid="shopping-cart-product-name">{produto.title}</p>}
          <div>
          <button
          data-testid="product-decrease-quantity"
          type="buton"
          name="sub"
          onClick={this.handleClick}>
          -
        </button>
        <p data-testid="shopping-cart-product-quantity">{productQuantity}</p>
        {loading && 
        <div>
        <button
          data-testid="product-increase-quantity"
          type="button"
          name="add"
          onClick={this.handleClick}>
          +
        </button>
        <button
          type="button"
          onClick= {this.removeItem}
          id= {produto.id} 
        >
          x
        </button>
        </div>
    }
          </div>
        </div>
       
      );
    }
}

CardFav.propTypes = {
  id: PropTypes.string.isRequired,
};

export default CardFav;

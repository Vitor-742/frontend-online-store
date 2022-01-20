import React from "react";
import { getProductsFromProductId } from '../services/api'

class CardFav extends React.Component {
    constructor() {
        super()
        this.state = {
            loading: false
        }
    }

    componentDidMount() {
       this.montaArray()
    }
    
    montaArray = () => {
        const { id } = this.props
        this.setState({loading: false}, async() => {
            const product = await getProductsFromProductId(id)
            this.setState({
                produto: product,
                loading: true
           })
        })
    }

    render() {
      return (
          <div>
              {this.state.loading && <p data-testid="shopping-cart-product-name">{this.state.produto.title}</p>}
              <p data-testid="shopping-cart-product-quantity">1</p>
          </div>
        
      )
    }
}

export default CardFav;
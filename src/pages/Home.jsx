import React from 'react';

class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      productsList: [],
    };
  }

  render() {
    const { productsList } = this.state;
    const initailMessage = (
      <span
        data-testid="home-initial-message"
      >
        Digite algum termo de pesquisa ou escolha uma categoria.
      </span>
    );
    if (productsList.length === 0) return initailMessage;
    return (
      <div />
    );
  }
}

export default Home;

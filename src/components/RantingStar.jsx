// Giovanna Eliz contribuiu com esse código através de vídeo conferência
import React from 'react';
import PropTypes from 'prop-types';

class RatingStar extends React.Component {
  render() {
    const { array, rating, click } = this.props;
    return (
      <div>
        {/* Source: https://dev.to/michaelburrows/create-a-custom-react-star-rating-component-5o6 */}
        {array.map((rate) => (
          <button
            key={ rate }
            type="button"
            data-testid={ `${rate}-rating` }
            name={ rate }
            onClick={ click }
            className={ rate <= rating ? 'star on' : 'star' }
          >
            &#9733;
          </button>
        ))}
      </div>
    );
  }
}

RatingStar.propTypes = {
  array: PropTypes.arrayOf(PropTypes.number).isRequired,
  rating: PropTypes.number.isRequired,
  click: PropTypes.func,
};

RatingStar.defaultProps = {
  click: () => {},
};

export default RatingStar;

import React from 'react'
import PropTypes from 'prop-types'
import * as timestamp from '../utils/timestamp'

/**
 * Product component that renders a single product.
 * @param  {Object}       props.data  Product data
 * @return {ReactElement}             The markup to render
 */
const Product = ({ data }) => {
  const { size, price, face, date } = data
  return (
    <div className='mdl-cell mdl-cell--4-col'>
      <div className='mdl-card mdl-shadow--2dp'>
        <div
          className='mdl-card__title mdl-card--expand'
          style={{ fontSize: size + 'px', margin: 'auto' }}
        >
          { face }
        </div>
        <div className='mdl-card__actions'>
          <div className='mdl-card__actions--title'>
            <div className='mdl-typography--title-color-contrast'>
              $ { (price / 100).toFixed(2) }
            </div>
            <div className='mdl-typography--caption-color-contrast'>
              { timestamp.fromNow(date) }
            </div>
          </div>
          <div className='mdl-layout-spacer' />
          <div className={
            'mdl-button mdl-js-button mdl-button--fab ' +
            'mdl-js-ripple-effect mdl-button--colored'
          }>
            <i className='material-icons'>add_shopping_cart</i>
          </div>
        </div>
      </div>
    </div>
  )
}

// typechecking the props for Product component
Product.propTypes = {
  data: PropTypes.shape({
    size: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    face: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  })
}

export default Product

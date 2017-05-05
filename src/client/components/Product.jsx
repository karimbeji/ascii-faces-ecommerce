import React from 'react'
import PropTypes from 'prop-types'
import { PRODUCTS_ENTITY } from '../constants'
import { addToShoppingCart } from '../actions'
import * as money from '../utils/money'
import * as timestamp from '../utils/timestamp'

/**
 * Product component that renders a single product.
 * @param  {String}       props.id       Product id
 * @param  {Object}       props.data     Product data
 * @param  {Function}     props.dispatch The Redux dispatch
 * @return {ReactElement}                The markup to render
 */
const Product = ({ id, data, dispatch }) => {
  // get variables from data
  const { size, price, face, date } = data

  // function to call when click on add to shopping cart button
  const onAddShoppingCartClick = () => {
    dispatch(addToShoppingCart(PRODUCTS_ENTITY, id))
  }

  // define the style to the ascii face
  const fontSizeStyle = {
    fontSize: `${size}px`
  }

  return (
    <div className='mdl-cell mdl-cell--4-col'>
      <div className='mdl-card mdl-shadow--2dp'>
        <div
          className='mdl-card__title mdl-card--expand ascii-face'
          style={fontSizeStyle}
        >
          { face }
        </div>
        <div className='mdl-card__actions'>
          <div className='mdl-card__actions--title'>
            <div className='mdl-typography--title-color-contrast'>
              $ { money.fromCents(price) }
            </div>
            <div className='mdl-typography--caption-color-contrast'>
              { timestamp.fromNow(date) }
            </div>
          </div>
          <div className='mdl-layout-spacer' />
          <button
            className={
              'mdl-button mdl-js-button mdl-button--fab ' +
              'mdl-js-ripple-effect mdl-button--colored'
            }
            onClick={onAddShoppingCartClick}
          >
            <i className='material-icons'>add_shopping_cart</i>
          </button>
        </div>
      </div>
    </div>
  )
}

// typechecking the props for Product component
Product.propTypes = {
  id: PropTypes.string.isRequired,
  data: PropTypes.shape({
    size: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    face: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired
  }),
  dispatch: PropTypes.func.isRequired
}

export default Product

import React from 'react'
import PropTypes from 'prop-types'
import { removeFromShoppingCart } from '../actions'
import * as money from '../utils/money'
import '../styles/ShoppingCart.scss'

/**
 * ShoppingCart component that renders the shopping cart contents.
 * @param  {Object}       props.data     Shopping cart data
 * @param  {Object}       props.entities Entities
 * @param  {Function}     props.dispatch The Redux dispatch
 * @return {ReactElement}                The markup to render
 */
const ShoppingCart = ({ data, entities, dispatch }) => {
  // initialize items array and total price
  let items = []
  let total = 0

  // iterate over each entity in shopping cart
  Object.keys(data).map(entity => {
    // get items shopping cart from this entity
    const cartItems = data[entity]

    // push the entity markup to the array
    items.push(
      <li key={`entity-${entity}`} className='mdl-list__item entity'>
        <span className='mdl-list__item-primary-content'>
          { entity }
        </span>
      </li>
    )

    // iterate over each item in this entity
    Object.keys(cartItems).map(key => {
      // get quantity
      const quantity = cartItems[key].quantity

      // get item entity
      const item = entities[entity][key]

      // calculate the total price for this item
      const itemTotal = item.price * quantity

      // calculate the total of order
      total = total + itemTotal

      // click event handler for remove button
      const onRemoveClick = () => {
        dispatch(removeFromShoppingCart(entity, key))
      }

      // push the item markup to the array
      items.push(
        <li key={key} className='mdl-list__item mdl-list__item--two-line'>
          <span className='mdl-list__item-primary-content'>
            <button
              onClick={onRemoveClick}
              className='mdl-button mdl-js-button mdl-button--icon mdl-list__item-icon'
            >
              <i className='material-icons'>remove_circle</i>
            </button>
            <span>{ item.face }</span>
            <span className='mdl-list__item-sub-title'>
              Size: { item.size } -
              Qty: { quantity } -
              Each: $ { money.fromCents(item.price) }
            </span>
          </span>
          <span className='mdl-list__item-secondary-content'>
            <span className='mdl-list__item-secondary-info'>Total</span>
            <span className='mdl-list__item-secondary-action'>
              $ { money.fromCents(itemTotal) }
            </span>
          </span>
        </li>
      )
    })
  })

  // if total is equals to zero, has no items
  if (total === 0) {
    // replace the items array with no item markup
    // removing the entities markup
    items = [
      <li key='no-item' className='mdl-list__item no-item'>
        <span className='mdl-list__item-primary-content'>
          No items added yet (ಠ_ಠ)
        </span>
      </li>
    ]
  }

  return (
    <div className='mdl-layout__drawer'>
      <span className='mdl-layout-title'>
        <i className='material-icons'>shopping_cart</i>
        Shopping Cart
      </span>
      <ul className='mdl-list'>
        { items }
        <li className='mdl-list__item total'>
          <span className='mdl-list__item-primary-content'>
            <span>Total</span>
          </span>
          <span className='mdl-list__item-secondary-content'>
            <span className='mdl-list__item-secondary-action'>
              $ { money.fromCents(total) }
            </span>
          </span>
        </li>
      </ul>
    </div>
  )
}

// typechecking the props for ShoppingCart component
ShoppingCart.propTypes = {
  data: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default ShoppingCart

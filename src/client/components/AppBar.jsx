import React from 'react'
import PropTypes from 'prop-types'
import SortMenu from './SortMenu'
import '../styles/AppBar.scss'

/**
 * AppBar component that renders a header bar with buttons.
 * @param  {Object}       props The object properties
 * @return {ReactElement}       The markup to render
 */
const AppBar = (props) => {
  // get some variables from the props
  const {
    enableSort, currentSort, sortMenuOptions,
    onLogoClick, onShoppingCartClick, shoppingCartQty,
    dispatch
  } = props

  // initialize badge object
  let shoppingCartBadge = {}

  // if has any item in shopping cart
  if (shoppingCartQty !== 0) {
    // put data-badge property in badge object
    shoppingCartBadge['data-badge'] = shoppingCartQty
  }

  return (
    <header className='mdl-layout__header'>
      <div
        className='mdl-layout__drawer-button ascii-faces-logo'
        onClick={onLogoClick}
      >
        { '\\{^_^}/' }
      </div>
      <div className='mdl-layout__header-row'>
        <span className='mdl-layout-title'>ascii faces ecommerce</span>
        <div className='mdl-layout-spacer' />
        {
          (!enableSort) ? '' : (
            <SortMenu
              currentSort={currentSort}
              options={sortMenuOptions}
              dispatch={dispatch}
            />
          )
        }
        <button
          className='mdl-button mdl-js-button mdl-button--icon shopping-cart-button'
          onClick={onShoppingCartClick}
        >
          <i className='material-icons mdl-badge mdl-badge--overlap' {...shoppingCartBadge}>
            shopping_cart
          </i>
        </button>
      </div>
    </header>
  )
}

// typechecking the props for AppBar component
AppBar.propTypes = {
  enableSort: PropTypes.bool.isRequired,
  currentSort: PropTypes.string.isRequired,
  sortMenuOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onShoppingCartClick: PropTypes.func.isRequired,
  shoppingCartQty: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

export default AppBar

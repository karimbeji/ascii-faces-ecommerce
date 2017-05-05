import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { PRODUCTS_ENTITY, SORT_TYPES } from '../constants'
import { changeGrid } from '../actions'
import AppBar from '../components/AppBar'
import ShoppingCart from '../components/ShoppingCart'
import Welcome from '../components/Welcome'
import ProductsGrid from './ProductsGrid'

/**
 * App container that handles the entire app.
 * @extends React.Component
 */
class App extends Component {
  /**
   * Handle event when component did mount.
   */
  componentDidMount () {
    // upgrade the MDL components
    if (window.componentHandler) {
      window.componentHandler.upgradeDom()
    }
  }

  /**
   * Handle event when component did update.
   */
  componentDidUpdate () {
    // upgrade the MDL components
    if (window.componentHandler) {
      window.componentHandler.upgradeDom()
    }
  }

  /**
   * Render the element.
   * @return {ReactElement} The markup to render
   */
  render () {
    // get some variables from props
    const {
      enableSort, currentSort, sortMenuOptions, onLogoClick,
      onShoppingCartClick, shoppingCartQty, dispatch,
      shoppingCart, entities, showWelcome, showProducts, onLetMeShopClick
    } = this.props

    // define the props for AppBar component
    const propsAppBar = {
      enableSort,
      currentSort,
      sortMenuOptions,
      onLogoClick,
      onShoppingCartClick,
      shoppingCartQty,
      dispatch
    }

    return (
      <div className='mdl-layout mdl-js-layout mdl-layout--fixed-header'>
        <AppBar {...propsAppBar} />
        <ShoppingCart data={shoppingCart} entities={entities} dispatch={dispatch} />
        <main className='mdl-layout__content'>
          { showWelcome ? <Welcome onLetMeShopClick={onLetMeShopClick} /> : '' }
          { showProducts ? <ProductsGrid /> : '' }
        </main>
      </div>
    )
  }
}

// typechecking the props for App container
App.propTypes = {
  showWelcome: PropTypes.bool.isRequired,
  showProducts: PropTypes.bool.isRequired,
  enableSort: PropTypes.bool.isRequired,
  currentSort: PropTypes.string.isRequired,
  sortMenuOptions: PropTypes.arrayOf(PropTypes.object).isRequired,
  shoppingCart: PropTypes.object.isRequired,
  entities: PropTypes.object.isRequired,
  onLetMeShopClick: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
  onShoppingCartClick: PropTypes.func.isRequired,
  shoppingCartQty: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired
}

/**
 * Map the state to props.
 * @param  {Object} state Redux store state
 * @return {Object}       The states mapped to props
 */
const mapStateToProps = state => {
  // get visibleGrid from state
  const visibleGrid = state.app.visibleGrid

  // check if has no visible grid
  // to tell to the component to show welcome message
  const showWelcome = (visibleGrid === '')

  // check if products is the visible grid
  // to tell to the component to show the products grid
  const showProducts = (visibleGrid === PRODUCTS_ENTITY)

  // get shoppingCart from state
  const shoppingCart = state.app.shoppingCart

  // initialize shopping cart quantity
  let shoppingCartQty = 0

  // iterate over shopping cart entities
  Object.keys(shoppingCart).map(entity => {
    // iterate over shopping cart items on each entity
    Object.keys(shoppingCart[entity]).map(item => {
      // sum the quantity of each item
      shoppingCartQty = shoppingCartQty + shoppingCart[entity][item].quantity
    })
  })

  // get entities from state
  const entities = state.entities

  // init the sortMenuOptions array, currentSort and enableSort
  let sortMenuOptions = []
  let currentSort = ''
  let enableSort = false

  // if not showing welcome message
  if (!showWelcome) {
    // get the visible grid state
    const grid = state.grids[visibleGrid]

    // get current sort of visible grid
    currentSort = grid.sort

    // only enable sort when is not fetching and also not showing welcome
    enableSort = !grid.isFetching

    // add all default sorts to array and all visible grid sorts to array
    sortMenuOptions = [
      ...SORT_TYPES.default,
      ...SORT_TYPES[visibleGrid]
    ]
  }

  return {
    showWelcome,
    showProducts,
    enableSort,
    currentSort,
    sortMenuOptions,
    shoppingCart,
    shoppingCartQty,
    entities
  }
}

/**
 * Map the dispatch to props.
 * @param  {Object} dispatch Redux store dispatch
 * @return {Object}          The dispatchs mapped to props
 */
const mapDispatchToProps = dispatch => {
  return {
    // map dispatch to props
    dispatch,

    // when click on 'Let me shop!' button
    // show the products grid
    onLetMeShopClick: () => dispatch(changeGrid(PRODUCTS_ENTITY)),

    // when click on ascii faces logo
    onLogoClick: showWelcome => {
      // toggle MDL drawer because click on this button should open it
      const mdlLayout = document.querySelector('.mdl-layout')
      mdlLayout.MaterialLayout.toggleDrawer()

      // if not showing welcome message
      if (!showWelcome) {
        // tells the app that no grid should be visible to show the welcome message
        dispatch(changeGrid(''))
      }
    },

    onShoppingCartClick: () => {
      // toggle MDL drawer
      const mdlLayout = document.querySelector('.mdl-layout')
      mdlLayout.MaterialLayout.toggleDrawer()
    }
  }
}

/**
 * Merge the props.
 * @param  {Object} stateProps    Props generated by mapStateToProps
 * @param  {Object} dispatchProps Props generated by mapDispatchToProps
 * @param  {Object} ownProps      Component own props
 * @return {Object}               The merged props
 */
const mergeProps = (stateProps, dispatchProps, ownProps) => {
  return Object.assign({}, ownProps, stateProps, dispatchProps, {
    // bind the showWelcome parameter needed in onLogoClick
    onLogoClick: () => dispatchProps.onLogoClick(stateProps.showWelcome)
  })
}

// use Redux connect to generate the App
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(App)

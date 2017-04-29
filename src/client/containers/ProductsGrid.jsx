import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { PRODUCTS_ENTITY, PRODUCTS_GRID } from '../constants'
import { fetchEntitiesIfCan } from '../actions'

/**
 * ProductsGrid container that lists products as grid.
 */
class ProductsGrid extends Component {
  componentDidMount () {
    // get Redux dispatch from props
    const { dispatch } = this.props

    // fetch API for products entities to update products grid
    dispatch(fetchEntitiesIfCan({
      entity: PRODUCTS_ENTITY,
      grid: PRODUCTS_GRID
    }))
  }

  render () {
    /**
     * get products from props
     * and render a single message for now
     */
    const { products } = this.props
    return (
      <section className='products'>
        ... products go here - we actually have { products.items.length } product(s) ...
      </section>
    )
  }
}

// typechecking the props for ProductsGrid element
ProductsGrid.propTypes = {
  products: PropTypes.object.isRequired
}

/**
 * Map the state to props.
 * @param  {Object} state Redux store state
 * @return {Object}       The states mapped to props.
 */
const mapStateToProps = state => {
  // get only products from grids' state
  const { products } = state.grids
  return {
    products
  }
}

// use Redux connect to generate the ProductsGrid container
export default connect(mapStateToProps)(ProductsGrid)

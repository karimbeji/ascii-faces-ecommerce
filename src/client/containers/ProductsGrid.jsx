import GridContainer from './GridContainer'
import Product from '../components/Product'
import { PRODUCTS_ENTITY, PRODUCTS_GRID } from '../constants'

// use GridContainer to generate the ProductsGrid
export default GridContainer(Product, {
  entity: PRODUCTS_ENTITY,
  grid: PRODUCTS_GRID
})

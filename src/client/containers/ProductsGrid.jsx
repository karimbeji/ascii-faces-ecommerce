import GridContainer from './GridContainer'
import Product from '../components/Product'
import { PRODUCTS_ENTITY } from '../constants'

// use GridContainer to generate the ProductsGrid
export default GridContainer(Product, {
  entity: PRODUCTS_ENTITY
})

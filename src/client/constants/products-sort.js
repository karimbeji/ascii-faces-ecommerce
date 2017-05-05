import { PRODUCTS_ENTITY } from './entities'

/**
 * availables sort types for products
 * if need just add a new object in the array
 * and the app will handle everything automatically
 */
const productsSorts = {
  [PRODUCTS_ENTITY]: [
    {
      name: 'Size',
      sort: 'size'
    },
    {
      name: 'Price',
      sort: 'price'
    }
  ]
}

export default productsSorts

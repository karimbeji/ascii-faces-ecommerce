import productsSort from './products-sort'

/**
 * available sort types:
 *   - default sort type id
 *   - sort types for each entity
 * if added a new entity that has sort types
 * be sure to import it in this file
 * and add the sort types to this object
 */
export const SORT_TYPES = Object.assign(
  {},
  {
    'default': [
      {
        name: 'Id',
        sort: 'id'
      }
    ]
  },
  productsSort
)

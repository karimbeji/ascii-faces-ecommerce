import { combineReducers } from 'redux'
import entities from './entities'
import grids from './grids'

// combine reducers to build the state
const appReducer = combineReducers({
  entities,
  grids
})

export default appReducer

/**
 * An example of how Redux store will be:
 *
 * {
 *   "entities": {
 *     "products": {
 *       "1040-4wl9hroz3f5zaxynteda8xgvi": {
 *         "date": "Tue Apr 25 2017 01:42:22 GMT-0300 (BRT)"
 *         "face": "Σ (੭ु ຶਊ ຶ)੭ु⁾⁾",
 *         "price": 113,
 *         "size": 17,
 *       }
 *     }
 *   },
 *   "grids": {
 *     "products": {
 *       "isFetching": false,
 *       "lastPageLoaded": 0,
 *       "sort": "id",
 *       "items": [
 *         "1040-4wl9hroz3f5zaxynteda8xgvi"
 *       ]
 *     }
 *   }
 * }
 *
 */

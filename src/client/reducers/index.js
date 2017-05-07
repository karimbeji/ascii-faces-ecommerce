import { combineReducers } from 'redux'
import entities from './entities'
import grids from './grids'
import app from './app'

// combine reducers to build the state
const appReducer = combineReducers({
  entities,
  grids,
  app
})

export default appReducer

/**
 * An example of how Redux store will be:
 *
 * {
 *   "entities": {
 *     "products": {
 *       "1040-4wl9hroz3f5zaxynteda8xgvi": {
 *         "size": 17,
 *         "price": 113,
 *         "face": "Σ (੭ु ຶਊ ຶ)੭ु⁾⁾",
 *         "date": "Tue Apr 25 2017 01:42:22 GMT-0300 (BRT)"
 *       }
 *     }
 *   },
 *   "grids": {
 *     "products": {
 *       "isFetching": false,
 *       "isEnd": false,
 *       "lastPageLoaded": 1,
 *       "sort": "id",
 *       "items": [
 *         "1040-4wl9hroz3f5zaxynteda8xgvi"
 *       ],
 *       "preFetched": []
 *     }
 *   },
 *   "app": {
 *     "visibleGrid": "products",
 *     "shoppingCart": {
 *       "products": {
 *         "1040-4wl9hroz3f5zaxynteda8xgvi": {
 *           quantity: 1
 *         }
 *       }
 *     },
 *     "lastAd": 0
 *   }
 * }
 *
 */

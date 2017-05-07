import * as entitiesConstants from '../constants/entities'
import { initObj, isValueInObj } from '../utils/object'
import {
  CHANGE_GRID, ADD_TO_SHOPPING_CART,
  REMOVE_FROM_SHOPPING_CART, LOAD_AD
} from '../actions'

// initial state of app
const initialApp = {
  visibleGrid: '',
  shoppingCart: initObj(entitiesConstants),
  lastAd: 0
}

/**
 * Reducer to change app.
 * @param  {Object} state  Current state of app. Default = initialApp const
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const app = (state = initialApp, action) => {
  switch (action.type) {
    case CHANGE_GRID:
      // if action grid is the current visible grid
      // just return the state
      if (state.visibleGrid === action.grid) {
        return state
      }

      // change visible grid without mutate the state
      return Object.assign({}, state, {
        visibleGrid: action.grid
      })
    case ADD_TO_SHOPPING_CART:
    case REMOVE_FROM_SHOPPING_CART:
      // checks whether is a valid entity
      if (!isValueInObj(entitiesConstants, action.entity)) {
        return state
      }

      // process shopping cart without mutate the state
      return Object.assign({}, state, {
        shoppingCart: processShoppingCart(state.shoppingCart, action)
      })
    case LOAD_AD:
      // change last ad without mutate the state
      return Object.assign({}, state, {
        lastAd: action.ad
      })
    default:
      return state
  }
}

/**
 * Reducer to process the shopping cart.
 * @param  {Object} state  Current state of shopping cart
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const processShoppingCart = (state, action) => {
  switch (action.type) {
    case ADD_TO_SHOPPING_CART:
    case REMOVE_FROM_SHOPPING_CART:
      // process the items entities without mutate the state
      return Object.assign({}, state, {
        [action.entity]: processEntities(state[action.entity], action)
      })
    default:
      return state
  }
}

/**
 * Reducer to process the entities in shopping cart.
 * @param  {Object} state  Current state of shopping cart
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const processEntities = (state, action) => {
  // initialize the quantity
  let quantity = 0

  switch (action.type) {
    case ADD_TO_SHOPPING_CART:
      // set quantity with 1
      quantity = 1

      // check if item already exists
      if (state.hasOwnProperty(action.id)) {
        // sum one to the quantity
        quantity = state[action.id].quantity + 1
      }

      // return the item without mutate the state
      return Object.assign({}, state, {
        [action.id]: {
          quantity
        }
      })
    case REMOVE_FROM_SHOPPING_CART:
      // subtract one from the quantity
      quantity = state[action.id].quantity - 1

      // if quantity is zero remove the item without mutate the state
      if (quantity === 0) {
        // create a new state object
        let newState = {}

        // iterate over state keys
        Object.keys(state).map(key => {
          // if key is different of action.id to remove
          if (key !== action.id) {
            // add the state key to the new state
            Object.assign(newState, {
              [key]: state[key]
            })
          }
        })

        // return the new state without the item
        return newState
      }

      // return the item with new quantity without mutate the state
      return Object.assign({}, state, {
        [action.id]: {
          quantity
        }
      })
    default:
      return state
  }
}

export default app

// define and export app actions constants
export const CHANGE_GRID = 'CHANGE_GRID'
export const ADD_TO_SHOPPING_CART = 'ADD_TO_SHOPPING_CART'
export const REMOVE_FROM_SHOPPING_CART = 'REMOVE_FROM_SHOPPING_CART'
export const LOAD_AD = 'LOAD_AD'

/**
 * Action to change the visible grid of the app.
 * @param  {String} grid The grid to change
 * @return {Object}      Payload for the action
 */
export const changeGrid = grid => ({
  type: CHANGE_GRID,
  grid
})

/**
 * Action to add item to shopping cart.
 * @param  {String} entity The item entity to be added
 * @param  {String} id     The item id to be added
 * @return {Object}        Payload for the action
 */
export const addToShoppingCart = (entity, id) => ({
  type: ADD_TO_SHOPPING_CART,
  entity,
  id
})

/**
 * Action to remove item from shopping cart.
 * @param  {String} entity The item entity to be removed
 * @param  {String} id     The item id to be remove
 * @return {Object}        Payload for the action
 */
export const removeFromShoppingCart = (entity, id) => ({
  type: REMOVE_FROM_SHOPPING_CART,
  entity,
  id
})

/**
 * Action to load a new ad to store.
 * @param  {Number} ad Ad that is being add
 * @return {Object}    Payload for the action
 */
export const loadAd = ad => ({
  type: LOAD_AD,
  ad
})

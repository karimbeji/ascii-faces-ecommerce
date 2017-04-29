// import a Fetch Polyfill to use for API calls
import fetch from 'isomorphic-fetch'

import { API_URL } from '../constants'

// define and export entities actions constants
export const ADD_ENTITY = 'ADD_ENTITY'
export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'

/**
 * Action to add a new entity and possible a grid item to store.
 * @param  {String} entity Name of entity that is being add
 * @param  {String} grid   Name of grid that entity will be add
 * @param  {Object} item   Item that is being add
 * @return {Object}        Payload for the action
 */
const addEntity = (entity, grid, item) => ({
  type: ADD_ENTITY,
  entity,
  grid,
  item
})

/**
 * Action to tells app that an entities request started.
 * @param  {String} entity Name of entity that is being request
 * @param  {String} grid   Name of grid that will update
 * @return {Object}        Payload for the action
 */
const requestEntities = (entity, grid) => ({
  type: REQUEST_ENTITIES,
  entity,
  grid
})

/**
 * Action to tells app that has received entities from request.
 * @param  {String} entity         Name of entity that is being request
 * @param  {String} grid           Name of grid that will be updated
 * @param  {Number} lastPageLoaded Number of the last page loaded from the API
 * @return {Object}                Payload for the action
 */
const receiveEntities = (entity, grid, lastPageLoaded) => ({
  type: RECEIVE_ENTITIES,
  entity,
  grid,
  lastPageLoaded
})

/**
 * Action to fetch entities from the API.
 * @param  {String} entity Name of entity that will be fetched
 * @param  {String} grid   Name of grid that will be updated
 * @param  {String} state  State of the grid that will be updated
 * @return {Function}      A function that will get executed by the Redux Thunk middleware
 */
const fetchEntities = (entity, grid, state) => {
  /**
   * get the last page loaded and sort type from grid's state
   * and define the next page that will be requested
   */
  const { lastPageLoaded, sort } = state
  const nextPage = lastPageLoaded + 1

  return dispatch => {
    // tells app that an entities request started
    dispatch(requestEntities(entity, grid))

    // fetch the API and convert the response to json
    return fetch(`${API_URL}/${entity}?_page=${nextPage}&_limit=20&_sort=${sort}`)
      .then(response => response.json())
      .then(json => {
        // for each item received add a new entity and update the grid
        json.map(item => dispatch(addEntity(entity, grid, item)))

        // tells app that has received entities from request
        dispatch(receiveEntities(entity, grid, nextPage))
      })
  }
}

/**
 * Checks whether should fetch entities.
 * @param  {Object}  state State of the grid that will be updated
 * @return {Boolean}       If can fetch the API
 */
const shouldFetchEntities = state => {
  const { isFetching } = state
  if (isFetching) {
    return false
  }
  return true
}

/**
 * Fetch the API for new entities if can.
 * @param  {Object}   data The data used to fetch the API (entity and grid).
 * @return {Function}      A function that will get executed by the Redux Thunk middleware
 */
export const fetchEntitiesIfCan = (data) => {
  return (dispatch, getState) => {
    // get current state and grid's state
    const state = getState()
    const grid = state.grids[data.grid]
    if (shouldFetchEntities(grid)) {
      // fetch entities from the API
      return dispatch(fetchEntities(data.entity, data.grid, grid))
    }
  }
}

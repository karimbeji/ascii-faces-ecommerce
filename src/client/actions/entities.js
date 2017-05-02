// import a Fetch Polyfill to use for API calls
import fetch from 'isomorphic-fetch'

import { API_URL, FETCH_LIMIT } from '../constants'
import { movePreFetched } from './grids'

// define and export entities actions constants
export const ADD_ENTITY = 'ADD_ENTITY'
export const REQUEST_ENTITIES = 'REQUEST_ENTITIES'
export const RECEIVE_ENTITIES = 'RECEIVE_ENTITIES'
export const END_OF_ENTITIES = 'END_OF_ENTITIES'

/**
 * Action to add a new entity and possible a grid item to store.
 * @param  {String}  entity Name of entity that is being add
 * @param  {String}  grid   Name of grid that entity will be add
 * @param  {Object}  item   Item that is being add
 * @return {Object}         Payload for the action
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
 * Action to tells app that does not have more entities to fetch.
 * @param  {String} grid Name of grid that will be updated
 * @return {Object}      Payload for the action
 */
const endOfEntities = grid => ({
  type: END_OF_ENTITIES,
  grid
})

/**
 * Action to fetch entities from the API.
 * @param  {String}   entity     Name of entity that will be fetched
 * @param  {String}   grid       Name of grid that will be updated
 * @param  {String}   gridState  State of the grid that will be updated
 * @return {Function}            A function that will get executed by the Redux Thunk middleware
 */
const fetchEntities = (entity, grid, gridState) => (dispatch, getState) => {
  /**
   * get the last page loaded, sort type and items from grid's state
   * and define the next page that will be requested
   */
  const { lastPageLoaded, sort, preFetched } = gridState
  let nextPage = lastPageLoaded + 1

  // tells app that an entities request started
  dispatch(requestEntities(entity, grid))

  // if has pre fetched entities, add them
  if (preFetched.length) {
    dispatch(movePreFetched(grid))
  }

  // fetch the API and convert the response to json
  return fetch(`${API_URL}/${entity}?_page=${nextPage}&_limit=${FETCH_LIMIT}&_sort=${sort}`)
    .then(response => response.json())
    .then(json => {
      // for each item received add a new entity
      json.map(item => dispatch(addEntity(entity, grid, item)))

      // if data received is below the limit
      if (json.length < FETCH_LIMIT) {
        // tells app that does not have more entities to fetch
        dispatch(endOfEntities(grid))

        // if does not have data
        if (json.length === 0) {
          /**
           * define nextPage as lastPageLoaded
           * to not update it on receiveEntities action
           */
          nextPage = lastPageLoaded
        }
      }

      // tells app that has received entities from request
      dispatch(receiveEntities(entity, grid, nextPage))

      // get the current state and the items from it
      const newState = getState()
      const { items } = newState.grids[grid]

      // if has no items in the grid is the first fetch
      if (items.length === 0) {
        // fetch entities again to always have one pre fetched
        dispatch(fetchEntitiesIfCan(entity, grid))
      }
    })
}

/**
 * Checks whether should fetch entities.
 * @param  {Object}  gridState State of the grid that will be updated
 * @return {Boolean}           If can fetch the API
 */
const shouldFetchEntities = gridState => {
  const { isFetching } = gridState
  if (isFetching) {
    return false
  }
  return true
}

/**
 * Fetch the API for new entities if can.
 * @param  {String}   entity The entity to fetch the API
 * @param  {String}   grid   The grid to update
 * @return {Function}        A function that will get executed by the Redux Thunk middleware
 */
export const fetchEntitiesIfCan = (entity, grid) => (dispatch, getState) => {
  // get current state and grid's state
  const state = getState()
  const gridState = state.grids[grid]

  if (shouldFetchEntities(gridState)) {
    // fetch entities from the API
    dispatch(fetchEntities(entity, grid, gridState))
  }
}

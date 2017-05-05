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
 * Action to add a new entity to store.
 * @param  {String} entity Name of entity that is being add
 * @param  {Object} item   Item that is being add
 * @return {Object}        Payload for the action
 */
const addEntity = (entity, item) => ({
  type: ADD_ENTITY,
  entity,
  item
})

/**
 * Action to tells app that an entities request started.
 * @param  {String} entity Name of entity that is being request
 * @return {Object}        Payload for the action
 */
const requestEntities = entity => ({
  type: REQUEST_ENTITIES,
  entity
})

/**
 * Action to tells app that has received entities from request.
 * @param  {String} entity         Name of entity that is being request
 * @param  {Number} lastPageLoaded Number of the last page loaded from the API
 * @return {Object}                Payload for the action
 */
const receiveEntities = (entity, lastPageLoaded) => ({
  type: RECEIVE_ENTITIES,
  entity,
  lastPageLoaded
})

/**
 * Action to tells app that does not have more entities to fetch.
 * @param  {String} entity Name of entity that has reached the end
 * @return {Object}        Payload for the action
 */
const endOfEntities = entity => ({
  type: END_OF_ENTITIES,
  entity
})

/**
 * Action to fetch entities from the API.
 * @param  {String}   entity     Name of entity that will be fetched
 * @param  {Object}   gridState  State of the grid that will be updated
 * @return {Function}            A function that will get executed by the Redux Thunk middleware
 */
const fetchEntities = (entity, gridState) => (dispatch, getState) => {
  // get the last page loaded, sort type and pre fetched items from grid's state
  const { lastPageLoaded, sort, preFetched } = gridState

  // define the next page that will be requested
  let nextPage = lastPageLoaded + 1

  // tells app that an entities request started
  dispatch(requestEntities(entity))

  // if has pre fetched entities, add them
  if (preFetched.length > 0) {
    dispatch(movePreFetched(entity))
  }

  // fetch the API and convert the response to json
  return fetch(`${API_URL}/${entity}?_page=${nextPage}&_limit=${FETCH_LIMIT}&_sort=${sort}`)
    .then(response => response.json())
    .then(json => {
      // for each item received add a new entity
      json.map(item => dispatch(addEntity(entity, item)))

      // if data received is below the limit
      if (json.length < FETCH_LIMIT) {
        // tells app that does not have more entities to fetch
        dispatch(endOfEntities(entity))

        // if does not have data
        if (json.length === 0) {
          // define nextPage as lastPageLoaded
          // to not update it on receiveEntities action
          nextPage = lastPageLoaded
        }
      }

      // tells app that has received entities from request
      dispatch(receiveEntities(entity, nextPage))

      // get the current state and the items from it
      const currentState = getState()
      const { items } = currentState.grids[entity]

      // if has no items in the grid is the first fetch
      if (items.length === 0) {
        // fetch entities again to always have one pre fetched
        dispatch(fetchEntitiesIfCan(entity))
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
 * @return {Function}        A function that will get executed by the Redux Thunk middleware
 */
export const fetchEntitiesIfCan = entity => (dispatch, getState) => {
  // get current state and grid's state
  const state = getState()
  const gridState = state.grids[entity]

  if (shouldFetchEntities(gridState)) {
    // fetch entities from the API
    dispatch(fetchEntities(entity, gridState))
  }
}

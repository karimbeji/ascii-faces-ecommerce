import { initGrids, isValidGrid } from '../utils'
import { ADD_ENTITY, REQUEST_ENTITIES, RECEIVE_ENTITIES } from '../actions'
import { SORT_TYPE_ID } from '../constants'

// initial state of availables grids
const initialGrids = initGrids({
  isFetching: false,
  lastPageLoaded: 0,
  sort: SORT_TYPE_ID,
  items: []
})

/**
 * Reducer to change grids state.
 * @param  {Object} state  Current state of grids. Default = initialGrids const
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const grids = (state = initialGrids, action) => {
  switch (action.type) {
    case ADD_ENTITY:
    case REQUEST_ENTITIES:
    case RECEIVE_ENTITIES:
      // checks whether payload has a grid to update and whether is a valid grid
      if (!action.hasOwnProperty('grid') || !isValidGrid(action.grid)) {
        return state
      }

      // process grids without mutate the state
      return Object.assign({}, state, {
        [action.grid]: processGrid(state[action.grid], action)
      })
    default:
      return state
  }
}

/**
 * Reducer to change a specific grid state.
 * @param  {Object} state  Current state of grid
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const processGrid = (state, action) => {
  switch (action.type) {
    case ADD_ENTITY:
      // checks whether item already exists
      if (state.items.indexOf(action.item.id) !== -1) {
        return state
      }

      // append new item without mutate the state
      return Object.assign({}, state, {
        items: [
          ...state.items,
          action.item.id
        ]
      })
    case REQUEST_ENTITIES:
      // tells that is fetching without mutate the state
      return Object.assign({}, state, {
        isFetching: true
      })
    case RECEIVE_ENTITIES:
      // tells that is not fetching and the last page loaded without mutate the state
      return Object.assign({}, state, {
        isFetching: false,
        lastPageLoaded: action.lastPageLoaded
      })
    default:
      return state
  }
}

export default grids

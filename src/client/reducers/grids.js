import * as gridsConstants from '../constants/grids'
import { initObj, isValueInObj } from '../utils/object'
import {
  ADD_ENTITY, REQUEST_ENTITIES,
  RECEIVE_ENTITIES, END_OF_ENTITIES,
  MOVE_PRE_FETCHED
} from '../actions'
import { SORT_TYPE_ID } from '../constants'

/**
 * Checks whether is a valid grid.
 * @param  {String}  grid Grid to be checked
 * @return {Boolean}      If is a valid grid
 */
export const isValidGrid = grid => isValueInObj(gridsConstants, grid)

/**
 * Initialize the state of availables entities.
 * @return {Object} The new initial state.
 */
export const initGrids = initial => initObj(gridsConstants, initial)

// initial state of availables grids
const initialGrids = initGrids({
  isFetching: false,
  isEnd: false,
  lastPageLoaded: 0,
  sort: SORT_TYPE_ID,
  items: [],
  preFetched: []
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
    case END_OF_ENTITIES:
    case MOVE_PRE_FETCHED:
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

      // append new item to preFetched without mutate the state
      return Object.assign({}, state, {
        preFetched: [
          ...state.preFetched,
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
    case END_OF_ENTITIES:
      // tells that reachs the end without mutate the state
      return Object.assign({}, state, {
        isEnd: true
      })
    case MOVE_PRE_FETCHED:
      // move all pre fetched to items and clear pre fetched without mutate the state
      return Object.assign({}, state, {
        items: [
          ...state.items,
          ...state.preFetched
        ]
      }, {
        preFetched: []
      })
    default:
      return state
  }
}

export default grids

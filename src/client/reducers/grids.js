import * as entitiesConstants from '../constants/entities'
import { initObj, isValueInObj } from '../utils/object'
import {
  ADD_ENTITY, REQUEST_ENTITIES,
  RECEIVE_ENTITIES, END_OF_ENTITIES,
  MOVE_PRE_FETCHED, CHANGE_SORT, RESET_GRID
} from '../actions'
import { SORT_TYPES } from '../constants'

// initial state of availables grids
const initialGrids = initObj(entitiesConstants, {
  isFetching: false,
  isEnd: false,
  lastPageLoaded: 0,
  sort: SORT_TYPES.default[0].sort,
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
    case CHANGE_SORT:
    case RESET_GRID:
      // get the grid name from action entity or action grid
      const grid = action.entity || action.grid

      // checks whether is a valid grid
      if (!isValueInObj(entitiesConstants, grid)) {
        return state
      }

      // process grids without mutate the state
      return Object.assign({}, state, {
        [grid]: processGrid(state[grid], grid, action)
      })
    default:
      return state
  }
}

/**
 * Reducer to change a specific grid state.
 * @param  {Object} state  Current state of grid
 * @param  {String} grid   Grid name
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const processGrid = (state, grid, action) => {
  switch (action.type) {
    case ADD_ENTITY:
      // checks whether item already exists
      if (state.preFetched.indexOf(action.item.id) !== -1) {
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
        ],
        preFetched: []
      })
    case CHANGE_SORT:
      // change the sort without mutate the state
      return Object.assign({}, state, {
        sort: action.sort
      })
    case RESET_GRID:
      // reset grid without mutate the state
      return Object.assign({}, state, initialGrids[grid])
    default:
      return state
  }
}

export default grids

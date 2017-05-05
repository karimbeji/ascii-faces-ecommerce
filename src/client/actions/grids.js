import { fetchEntitiesIfCan } from './entities'

// define and export grids actions constants
export const MOVE_PRE_FETCHED = 'MOVE_PRE_FETCHED'
export const CHANGE_SORT = 'CHANGE_SORT'
export const RESET_GRID = 'RESET_GRID'

/**
 * Action to move all pre fetched to items on the grid.
 * @param  {String} grid Name of grid that will be updated
 * @return {Object}      Payload for the action
 */
export const movePreFetched = grid => ({
  type: MOVE_PRE_FETCHED,
  grid
})

/**
 * Action to change the sort of the grid.
 * @param  {String} grid Name of grid that will be updated
 * @param  {String} sort Sort type to change
 * @return {Object}      Payload for the action
 */
const changeSort = (grid, sort) => ({
  type: CHANGE_SORT,
  grid,
  sort
})

/**
 * Action to reset the grid.
 * @param  {String} grid Name of grid that will be reseted
 * @return {Object}      Payload for the action
 */
const resetGrid = grid => ({
  type: RESET_GRID,
  grid
})

/**
 * Action to change the sort of the visible grid.
 * @param  {String}   sort The new sort type of visible grid
 * @return {Function}      A function that will get executed by the Redux Thunk middleware
 */
export const sortVisibleGridBy = sort => (dispatch, getState) => {
  // get current state
  const state = getState()

  // get visible grid from state
  const grid = state.app.visibleGrid

  // tells the app to reset the grid
  dispatch(resetGrid(grid))

  // tells the app to change the sort of grid
  dispatch(changeSort(grid, sort))

  // tells the app to fetch entities for the grid
  dispatch(fetchEntitiesIfCan(grid))
}

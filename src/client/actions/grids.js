// define and export grids actions constants
export const MOVE_PRE_FETCHED = 'MOVE_PRE_FETCHED'

/**
 * Action to move all pre fetched to items on the grid.
 * @param  {String} grid Name of grid that will be updated
 * @return {Object}      Payload for the action
 */
export const movePreFetched = grid => ({
  type: MOVE_PRE_FETCHED,
  grid
})

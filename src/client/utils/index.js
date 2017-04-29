import * as entitiesConstants from '../constants/entities'
import * as gridsConstants from '../constants/grids'

/**
 * Checks whether a given value exists as value of object properties.
 * @param  {Object} obj   Object to analyze properties' values
 * @param  {String} value Value to check
 * @return {Boolean}      If value exists as value of object properties
 */
const isValueInObj = (obj, value) => Object.keys(obj).every(key => value === obj[key])

/**
 * Creates a new object using as properties the given object's keys and the initial data as value.
 * @param  {Object} obj     Object to use properties
 * @param  {Object} initial Initial data to set as value of each new object property. Default = {}
 * @return {Object}         The new object
 */
const initObj = (obj, initial = {}) => {
  let newObj = {}
  Object.keys(obj).every(key => { newObj[obj[key]] = initial })
  return newObj
}

/**
 * Checks whether is a valid entity.
 * @param  {String}  entity Entity to be checked
 * @return {Boolean}        If is a valid entity
 */
export const isValidEntity = entity => isValueInObj(entitiesConstants, entity)

/**
 * Initialize the state of availables entities.
 * @return {Object} The new initial state.
 */
export const initEntities = () => initObj(entitiesConstants)

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

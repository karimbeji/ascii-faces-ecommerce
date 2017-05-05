/**
 * Checks whether a given value exists as value of object properties.
 * @param  {Object}  obj   Object to analyze properties' values
 * @param  {String}  value Value to check
 * @return {Boolean}       If value exists as value of object properties
 */
export const isValueInObj = (obj, value) => Object.keys(obj).every(key => value === obj[key])

/**
 * Creates a new object using as properties the given object's keys and the initial data as value.
 * @param  {Object} obj     Object to use properties
 * @param  {Object} initial Initial data to set as value of each new object property. Default = {}
 * @return {Object}         The new object
 */
export const initObj = (obj, initial = {}) => {
  let newObj = {}
  Object.keys(obj).every(key => { newObj[obj[key]] = initial })
  return newObj
}

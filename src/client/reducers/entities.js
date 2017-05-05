import * as entitiesConstants from '../constants/entities'
import { initObj, isValueInObj } from '../utils/object'
import { ADD_ENTITY } from '../actions'

// initial state of availables entities
const initialEntities = initObj(entitiesConstants)

/**
 * Reducer to change entities state.
 * @param  {Object} state  Current state of entities. Default = initialEntities const
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const entities = (state = initialEntities, action) => {
  switch (action.type) {
    case ADD_ENTITY:
      // checks whether is a valid entity
      if (!isValueInObj(entitiesConstants, action.entity)) {
        return state
      }

      // process entities without mutate the state
      return Object.assign({}, state, {
        [action.entity]: processEntities(state[action.entity], action)
      })
    default:
      return state
  }
}

/**
 * Reducer to change a specific entity state.
 * @param  {Object} state  Current state of entity
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const processEntities = (state, action) => {
  switch (action.type) {
    case ADD_ENTITY:
      // checks whether entity already exists
      if (state.hasOwnProperty(action.item.id)) {
        return state
      }

      // create new entity without mutate the state
      return Object.assign({}, state, {
        [action.item.id]: newEntity(action)
      })
    default:
      return state
  }
}

/**
 * Creates a new item of entity.
 * @param  {Object} action Action payload
 * @return {Object}        The new item
 */
const newEntity = action => {
  // initialize the new item
  let item = {}

  // get all keys from the item payload
  // and iterate over returned array
  Object.keys(action.item).map(prop => {
    // do not add id to the new item
    if (prop === 'id') {
      return
    }

    // add each property from the item payload to the new item
    item[prop] = action.item[prop]
  })

  // return the entity item
  return item
}

export default entities

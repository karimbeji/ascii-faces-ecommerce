import { LOAD_AD } from '../actions'

// initial state of ads
const initialAds = {
  loaded: []
}

/**
 * Reducer to change ads.
 * @param  {Object} state  Current state of ads. Default = initialAds const
 * @param  {Object} action Action payload
 * @return {Object}        The new state
 */
const ads = (state = initialAds, action) => {
  switch (action.type) {
    case LOAD_AD:
      // checks whether ad already exists
      if (state.loaded.indexOf(action.ad) !== -1) {
        return state
      }

      // append new ad without mutate the state
      return Object.assign({}, state, {
        loaded: [
          ...state.loaded,
          action.ad
        ]
      })
    default:
      return state
  }
}

export default ads

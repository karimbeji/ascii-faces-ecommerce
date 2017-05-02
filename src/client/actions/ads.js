// define and export ads actions constants
export const LOAD_AD = 'LOAD_AD'

/**
 * Action to load a new ad to store.
 * @param  {Number} ad Ad that is being add
 * @return {Object}    Payload for the action
 */
export const loadAd = ad => ({
  type: LOAD_AD,
  ad
})

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import asciiFacesApp from '../reducers'

/**
 * Creates the store applying Redux Thunk middleware.
 * @return {Object} The Redux store.
 */
const configureStore = () => createStore(
  asciiFacesApp,
  applyMiddleware(thunk)
)

export default configureStore

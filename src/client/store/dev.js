import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import appReducer from '../reducers'

// instantiate logger middleware
const logger = createLogger()

// use Redux DevTools Extension to compose if installed
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

/**
 * Creates the store applying Redux Thunk and Logger middlewares.
 * @return {Object} The Redux store.
 */
const configureStore = () => createStore(
  appReducer,
  composeEnhancers(applyMiddleware(thunk, logger))
)

export default configureStore

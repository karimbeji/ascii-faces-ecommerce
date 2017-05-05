import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'
import App from './App'

// configure Redux store
const store = configureStore()

/**
 * The container element that uses Redux Provider to handle the store.
 * @return {ReactElement} The markup to render.
 */
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root

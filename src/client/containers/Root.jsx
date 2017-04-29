import React from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'
import App from './App'

// configure Redux store
const store = configureStore()

// create container element using Redux Provider to handle the store
const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
)

export default Root

/**
 * import Babel Polyfill to emulate Promise, Object.assign
 * and other features that aren't compatible in all browsers
 */
import 'babel-polyfill'

import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'
import './styles/main.scss'

ReactDOM.render(<Root />, document.getElementById('root'))

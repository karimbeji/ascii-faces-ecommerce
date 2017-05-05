import React from 'react'
import PropTypes from 'prop-types'
import { sortVisibleGridBy } from '../actions'
import '../styles/SortMenu.scss'

/**
 * SortMenu component that renders a header bar with buttons.
 * @param  {String}       props.currentSort Current sort option
 * @param  {Object[]}     props.options     Available options to sort
 * @param  {Function}     props.dispatch    The Redux dispatch
 * @return {ReactElement}                   The markup to render
 */
const SortMenu = ({ currentSort, options, dispatch }) => {
  // initialize the items array
  let items = []

  // iterate over options
  options.map((option, index) => {
    // define if current option is selected
    const selected = option.sort === currentSort

    // define class name if item is selected
    const selectedClassName = selected ? 'is-selected' : ''

    // click function to execute when click on option item
    const onOptionClick = () => {
      if (!selected) {
        dispatch(sortVisibleGridBy(option.sort))
      }
    }

    // push the option to the items array
    items.push(
      <li
        key={index}
        className={`mdl-menu__item ${selectedClassName}`}
        onClick={onOptionClick}
        disabled={selected}
      >
        {
          !selected ? '' : (
            <i className='material-icons'>check</i>
          )
        }
        <span>{ option.name }</span>
      </li>
    )
  })

  return (
    <div className='sort-menu'>
      <ul
        className='mdl-menu mdl-menu--bottom-right mdl-js-menu mdl-js-ripple-effect'
        htmlFor='sort-menu'
      >
        <li className='header'>Sort by</li>
        { items }
      </ul>
      <button
        className='mdl-button mdl-js-button mdl-button--icon sort-button'
        id='sort-menu'
      >
        <i className='material-icons'>
          sort
        </i>
      </button>
    </div>
  )
}

// typechecking the props for SortMenu component
SortMenu.propTypes = {
  currentSort: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired
}

export default SortMenu

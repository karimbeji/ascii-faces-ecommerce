import React from 'react'
import PropTypes from 'prop-types'

/**
 * Loading component that renders a loading image and text.
 * @param  {Boolean}      props.isFetching    If grid is fetching
 * @return {ReactElement}                     The markup to render
 */
const Loading = ({ isFetching }) => {
  // if grid is fetching
  // define the className to show the component
  const className = isFetching ? 'is-fetching' : ''
  return (
    <div className={`loading ${className}`}>
      <div className='mdl-spinner mdl-spinner--single-color mdl-js-spinner is-active' />
      <div className='mdl-typography--title-color-contrast'>
        ~ loading ~
      </div>
    </div>
  )
}

// typechecking the props for Loading component
Loading.propTypes = {
  isFetching: PropTypes.bool.isRequired
}

export default Loading

import React from 'react'
import PropTypes from 'prop-types'

/**
 * EndOfCatalogue component that renders a text.
 * @param  {Boolean}      props.isEnd         If grid reaches the end
 * @param  {Boolean}      props.hasPreFetched If grid has pre fetched entities
 * @return {ReactElement}                     The markup to render
 */
const EndOfCatalogue = ({ isEnd, hasPreFetched }) => {
  // if grid reaches the end
  // and do not has pre fetched entities
  // define the className to show the component
  const className = (isEnd && !hasPreFetched) ? 'is-end' : ''
  return (
    <div className={`end-of-catalogue mdl-typography--title-color-contrast ${className}`}>
      ~ end of catalogue ~
    </div>
  )
}

// typechecking the props for EndOfCatalogue component
EndOfCatalogue.propTypes = {
  isEnd: PropTypes.bool.isRequired,
  hasPreFetched: PropTypes.bool.isRequired
}

export default EndOfCatalogue

import React from 'react'
import PropTypes from 'prop-types'

/**
 * Ad component that renders a single ad.
 * @param  {String}       props.adUrl Ad url to load
 * @return {ReactElement}             The markup to render
 */
const Ad = ({ adUrl }) => (
  <div className='mdl-cell mdl-cell--4-col'>
    <div className='mdl-card mdl-shadow--2dp'>
      <div className='mdl-card__title mdl-card--expand'>
        <img className='ad' src={adUrl} />
      </div>
      <div className='mdl-card__actions ad'>
        <div className='mdl-card__actions--title'>
          <div className='mdl-typography--title-color-contrast'>
            Check it out
          </div>
          <div className='mdl-typography--caption-color-contrast'>
            Please take a word from our sponsors
          </div>
        </div>
        <div className='mdl-layout-spacer' />
        <a
          className={
            'mdl-button mdl-js-button mdl-button--fab ' +
            'mdl-js-ripple-effect mdl-button--colored'
          }
          href='https://unsplash.it'
          target='_blank'
        >
          <i className='material-icons'>star_border</i>
        </a>
      </div>
    </div>
  </div>
)

// typechecking the props for Ad component
Ad.propTypes = {
  adUrl: PropTypes.string.isRequired
}

export default Ad

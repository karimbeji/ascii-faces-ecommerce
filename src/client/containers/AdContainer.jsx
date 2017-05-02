import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ADS_URL } from '../constants'
import { loadAd } from '../actions'
import Ad from '../components/Ad'

/**
 * AdContainer that handles ad.
 */
class AdContainer extends Component {
  /**
   * Handle event when component will mount
   */
  componentWillMount () {
    // get ads and Redux dispatch from props
    const { ads, dispatch } = this.props

    // declare randomAd variable
    let randomAd

    // try to get a random ad that isn't already loaded
    do {
      randomAd = Math.floor(Math.random() * 1000)
    } while (ads.loaded.indexOf(randomAd) !== -1)

    // tells the app that random ad will load
    dispatch(loadAd(randomAd))

    // save the ad url
    this.adUrl = ADS_URL + randomAd
  }

  /**
   * Render the element.
   * @return {ReactElement} The markup to render
   */
  render () {
    return <Ad adUrl={this.adUrl} />
  }
}

// typechecking the props for AdContainer container
AdContainer.propTypes = {
  ads: PropTypes.object.isRequired
}

/**
 * Map the state to props.
 * @param  {Object} state Redux store state
 * @return {Object}       The states mapped to props.
 */
const mapStateToProps = state => {
  // get ads from state
  const { ads } = state

  return {
    ads
  }
}

// use Redux connect to generate the AdContainer
export default connect(mapStateToProps)(AdContainer)

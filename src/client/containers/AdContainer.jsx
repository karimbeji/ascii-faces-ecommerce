import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ADS_URL } from '../constants'
import { loadAd } from '../actions'
import Ad from '../components/Ad'

/**
 * AdContainer that handles ad.
 * @extends React.Component
 */
class AdContainer extends Component {
  /**
   * Handle event when component will mount
   */
  componentWillMount () {
    // get lastAd and Redux dispatch from props
    const { lastAd, dispatch } = this.props

    // max ads provided by the server
    const maxAds = 10

    // declare randomAd variable
    let randomAd

    // get a random ad that isn't equals to the last one
    do {
      randomAd = Math.floor(Math.random() * 1000)
      randomAd = randomAd % maxAds
    } while (lastAd === randomAd)

    // tells the app that new ad will load
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
  ads: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

/**
 * Map the state to props.
 * @param  {Object} state Redux store state
 * @return {Object}       The states mapped to props.
 */
const mapStateToProps = state => {
  // get lastAd from state
  const { lastAd } = state.app

  return {
    lastAd
  }
}

// use Redux connect to generate the AdContainer
export default connect(mapStateToProps)(AdContainer)

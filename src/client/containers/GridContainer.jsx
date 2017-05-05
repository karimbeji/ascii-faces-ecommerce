import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { debounce } from 'throttle-debounce'
import { fetchEntitiesIfCan } from '../actions'
import { FETCH_SCROLL_THRESHOLD } from '../constants'
import checkScroll from '../utils/check-scroll'
import AdContainer from './AdContainer'
import Loading from '../components/Loading'
import EndOfCatalogue from '../components/EndOfCatalogue'
import '../styles/GridContainer.scss'

/**
 * GridContainer that lists entities as grid.
 * @param  {Function|React.Component} Entity  The component to be listed as grid
 * @param  {Object}                   options The specific options to send to the component
 * @return {Function|React.Component}         The generated container by Redux connect
 */
const GridContainer = (Entity, options) => {
  /**
   * The common grid component for each grid.
   * @extends React.Component
   */
  class Container extends Component {
    /**
     * Handle event when component will mount
     */
    componentWillMount () {
      // get Redux dispatch from props
      const { dispatch } = this.props

      // fetch API for entities to update grid
      dispatch(fetchEntitiesIfCan(options.entity))

      // bind 'this' to use it on event handler
      this.handleScroll = this.handleScroll.bind(this)

      // debounce the scroll function in 100ms
      this.handleScroll = debounce(100, this.handleScroll)

      // save mdl layout content
      this.mdlContent = document.querySelector('.mdl-layout__content')

      // add event listener to scroll
      this.mdlContent.addEventListener('scroll', this.handleScroll)
    }

    /**
     * Handle event when component will unmount
     */
    componentWillUnmount () {
      // remove event listener from scroll
      this.mdlContent.removeEventListener('scroll', this.handleScroll)
    }

    /**
     * Handle scroll event to add pre fetched entities to the grid
     * when a threshold is reached and also to pre fetch next entities.
     */
    handleScroll () {
      // get Redux dispatch and grid from props
      const { dispatch, grid } = this.props

      // return if is fetching or is at end, no need to fetch again
      if (grid.isFetching || grid.isEnd) {
        return
      }

      // when reached the fetch threshold
      if (checkScroll(FETCH_SCROLL_THRESHOLD, this.mdlContent)) {
        // fetch API for entities
        dispatch(fetchEntitiesIfCan(options.entity))
      }
    }

    /**
     * Render the element.
     * @return {ReactElement} The markup to render
     */
    render () {
      // get entities, grid and dispatch from props
      const { entities, grid, dispatch } = this.props

      // create an array of items to show inside the grid
      let items = []

      // ad count to use as key
      let adCnt = 0

      // iterate over grid items
      grid.items.map((item, index) => {
        // push the entity to the array
        items.push(<Entity key={item} id={item} data={entities[item]} dispatch={dispatch} />)

        // if should load ad, push it to the array
        const shouldLoadAd = ((index + 1) % 20) === 0
        if (shouldLoadAd) {
          adCnt++
          items.push(<AdContainer key={`ad-${adCnt}`} />)
        }
      })

      // check if has pre fetched items
      const hasPreFetched = grid.preFetched.length > 0

      // define a class name when has no item in grid
      const noItemClassName = grid.items.length === 0 ? 'no-item' : ''

      // create an array of classes for the object
      // and merge it with spaces making a string
      const className = [
        'grid',
        options.entity,
        noItemClassName
      ].join(' ')

      return (
        <section className={className}>
          <CSSTransitionGroup
            component='div' className='mdl-grid'
            transitionName='grid-item'
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            { items }
          </CSSTransitionGroup>
          <Loading isFetching={grid.isFetching} />
          <EndOfCatalogue isEnd={grid.isEnd} hasPreFetched={hasPreFetched} />
        </section>
      )
    }
  }

  // typechecking the props for common grid container
  Container.propTypes = {
    entities: PropTypes.object.isRequired,
    grid: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  /**
   * Map the state to props.
   * @param  {Object} state Redux store state
   * @return {Object}       The states mapped to props.
   */
  const mapStateToProps = state => {
    // get entities and grid from state
    const entities = state.entities[options.entity]
    const grid = state.grids[options.entity]

    return {
      entities,
      grid
    }
  }

  // use Redux connect to generate the Container
  return connect(mapStateToProps)(Container)
}

export default GridContainer

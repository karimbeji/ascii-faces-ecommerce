/**
 * Checks whether scroll reachs the threshold on given element.
 * @param  {Number}      threshold Limit that has to reach
 * @param  {HTMLElement} element   Element to check the scroll
 * @return {Boolean}               If scroll has reached the threshold
 */
const checkScroll = (threshold, element) => {
  // cache elements
  const doc = window.document
  const docElement = element || doc.documentElement

  // get the visible height of the document
  const visibleHeight = (docElement && docElement.offsetHeight) || 0

  // total height of entire elements in page
  const scrollableHeight = (docElement && docElement.scrollHeight) || doc.body.scrollHeight

  // get the vertical scroll position
  const scrollTop = (docElement && docElement.scrollTop) || doc.body.scrollTop

  // checks if visible height plus scrolled pixels
  // reachs the limit that is total height minus threshold
  if (scrollTop + visibleHeight >= scrollableHeight - threshold) {
    return true
  }

  return false
}

export default checkScroll

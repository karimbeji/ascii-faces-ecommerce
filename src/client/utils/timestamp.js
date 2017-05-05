/**
 * Calculate the duration interval in epoch.
 * @param  {Number} seconds Time seconds
 * @return {Object}         The interval and epoch
 */
const getDuration = seconds => {
  // durations of each epoch in seconds
  const epochs = {
    day: 86400,
    hour: 3600,
    minute: 60
  }

  // iterate over epochs
  for (let epoch of Object.keys(epochs)) {
    /**
     * calculate how many epochs (day, hour or minute)
     * the given seconds have
     */
    const interval = Math.floor(seconds / epochs[epoch])
    if (interval > 0) {
      // return the interval and current epoch
      return {
        interval,
        epoch
      }
    }
  }
}

/**
 * Calculate how many time in epoch passed from now.
 * @param  {String} date Date to check
 * @return {String}      The timestamp
 */
export const fromNow = date => {
  // get the difference in seconds between now and given date
  const seconds = Math.floor((new Date() - new Date(date)) / 1000)

  // get the interval and epoch from duration
  const { interval, epoch } = getDuration(seconds)

  // handle the pluralization
  const suffix = interval === 1 ? '' : 's'

  // return the date if interval is more than 7 days (1 week)
  if (interval > 7 && epoch === 'day') {
    return date
  }

  // return the timestamp
  return `${interval} ${epoch}${suffix} ago`
}

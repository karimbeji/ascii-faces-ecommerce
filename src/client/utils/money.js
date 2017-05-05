/**
 * Format number from cents to money.
 * @param  {Number} number The number in cents
 * @return {Number}        The money formatted
 */
export const fromCents = number => {
  return (number / 100).toFixed(2)
}

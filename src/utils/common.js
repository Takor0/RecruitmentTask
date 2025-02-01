/**
 * Compare two values
 * @param leftValue {string|number|null|undefined}
 * @param rightValue {string|number|null|undefined}
 * @param order {string} asc or desc
 * @returns {number} -1, 0, 1
 */
export const compareValues = (leftValue, rightValue, order = 'asc') => {
  const a = order === 'asc' ? leftValue : rightValue
  const b = order === 'asc' ? rightValue : leftValue

  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b)
  }
  if (a > b) {
    return 1
  }
  if (a < b) {
    return -1
  }
  return 0
}

/**
 * Every prime generator accepts the same argument — "how many primes do you
 * want?" — so they share one validator. Failing loudly here keeps the guard
 * clauses out of the algorithms themselves.
 *
 * @param {unknown} count
 * @returns {number} The validated count.
 * @throws {TypeError} If count is not a whole number.
 * @throws {RangeError} If count is less than 1.
 */
export function validateCount(count) {
  if (typeof count !== 'number' || !Number.isInteger(count)) {
    throw new TypeError(`Expected a whole number, received: ${String(count)}`);
  }

  if (count < 1) {
    throw new RangeError(`Expected a number of at least 1, received: ${count}`);
  }

  return count;
}

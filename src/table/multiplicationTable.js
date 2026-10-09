/**
 * Builds the (N+1) x (N+1) grid: a header row and header column of the primes
 * themselves, and every other cell the product of its row and column headers.
 *
 * The top-left corner has no meaningful value, so it is `null` and the
 * formatter decides how to render it.
 *
 * @param {number[]} primes The primes forming the axes.
 * @returns {(number|null)[][]} Rows of cells, top-left corner first.
 */
export function buildTableFromPrimes(primes) {
  const header = [null, ...primes];

  const body = primes.map((rowPrime) => [rowPrime, ...primes.map((columnPrime) => rowPrime * columnPrime)]);

  return [header, ...body];
}

import { validateCount } from './validateCount.js';

/**
 * Trial division: the most direct reading of "is this number prime?".
 *
 * We walk the candidates upwards and test each one against the primes we have
 * already found. We only need to test divisors up to sqrt(candidate): if
 * candidate = a * b then one of a or b must be <= sqrt(candidate), so if no
 * small factor exists there is no large one either.
 *
 * After 2 and 3 we only look at the numbers immediately either side of a
 * multiple of six. Of any six consecutive numbers, the other four are
 * divisible by 2 or by 3, so skipping them drops two thirds of the candidates
 * before we divide by anything.
 *
 * Complexity is roughly O(n^1.5 / (log n)^2) — slower than a sieve, but it uses
 * almost no memory and it is the easiest version to check by eye.
 *
 * @param {number} count How many primes to generate.
 * @returns {number[]} The first `count` primes, ascending.
 */
export function trialDivision(count) {
  validateCount(count);

  const primes = [2];
  if (count === 1) return primes;

  primes.push(3);

  // Candidates run 5, 7, 11, 13, 17, 19, ... — one below and one above each
  // multiple of six, reached by alternately adding 2 and 4.
  let candidate = 5;
  let step = 2;

  while (primes.length < count) {
    if (isPrime(candidate, primes)) {
      primes.push(candidate);
    }
    candidate += step;
    step = 6 - step; // 2, 4, 2, 4, ...
  }

  return primes.slice(0, count);
}

/**
 * @param {number} candidate
 * @param {number[]} knownPrimes Ascending primes covering at least sqrt(candidate).
 * @returns {boolean}
 */
function isPrime(candidate, knownPrimes) {
  const limit = Math.sqrt(candidate);

  for (const prime of knownPrimes) {
    if (prime > limit) break;
    if (candidate % prime === 0) return false;
  }

  return true;
}

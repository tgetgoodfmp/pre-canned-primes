import { validateCount } from './validateCount.js';

/**
 * Sieve of Eratosthenes: instead of asking "is this number prime?" one number
 * at a time, we assume every number is prime and cross out the ones that are
 * not.
 *
 * A sieve has to know how far to count before it starts, so we first estimate
 * an upper bound for the nth prime, sieve that whole range, and keep the first
 * `count` survivors.
 *
 * @param {number} count How many primes to generate.
 * @returns {number[]} The first `count` primes, ascending.
 */
export function sieveOfEratosthenes(count) {
  validateCount(count);

  return sieveUpTo(nthPrimeUpperBound(count)).slice(0, count);
}

/**
 * Estimates a number that is guaranteed to be greater than or equal to the nth
 * prime. Too small and we would miss primes, too large and we waste memory.
 *
 * Rosser & Schoenfeld proved that for n >= 6:
 *
 *     p(n) < n * (ln n + ln ln n)
 *
 * The bound is tight enough that the wasted space is a small percentage, and it
 * is never an under-estimate. Below n = 6 the formula breaks down (ln ln n goes
 * negative), so we return 13 — the 6th prime — which covers every smaller case.
 *
 * @param {number} n How many primes we intend to generate.
 * @returns {number} A limit L such that the first n primes are all <= L.
 */
function nthPrimeUpperBound(n) {
  if (n < 6) return 13;

  const logN = Math.log(n);
  return Math.ceil(n * (logN + Math.log(logN)));
}

/**
 * The crossing-out itself. For each prime p we cross out p*p, p*p + p,
 * p*p + 2p, ... Starting at p*p is safe because every smaller multiple of p has
 * a factor below p and was already crossed out by it.
 *
 * @param {number} limit Inclusive upper bound.
 * @returns {number[]} Every prime <= limit, ascending.
 */
function sieveUpTo(limit) {
  // A byte per number. 0 means "still a candidate", 1 means "crossed out".
  const crossedOut = new Uint8Array(limit + 1);
  const sqrtLimit = Math.floor(Math.sqrt(limit));

  for (let candidate = 2; candidate <= sqrtLimit; candidate += 1) {
    if (crossedOut[candidate]) continue;

    for (let multiple = candidate * candidate; multiple <= limit; multiple += candidate) {
      crossedOut[multiple] = 1;
    }
  }

  const primes = [];
  for (let number = 2; number <= limit; number += 1) {
    if (!crossedOut[number]) primes.push(number);
  }

  return primes;
}

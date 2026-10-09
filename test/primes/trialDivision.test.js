import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { trialDivision } from '../../src/primes/trialDivision.js';

const FIRST_25_PRIMES = [
  2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
];

describe('trialDivision', () => {
  it('returns [2] for a count of 1', () => {
    assert.deepEqual(trialDivision(1), [2]);
  });

  it('returns the first 25 primes in order', () => {
    assert.deepEqual(trialDivision(25), FIRST_25_PRIMES);
  });

  it('returns as many primes as asked for', () => {
    assert.equal(trialDivision(50).length, 50);
    assert.equal(trialDivision(200).length, 200);
  });

  it('gets the 1000th prime right', () => {
    assert.equal(trialDivision(1000).at(-1), 7919);
  });

  it('rejects a count below 1', () => {
    assert.throws(() => trialDivision(0), RangeError);
    assert.throws(() => trialDivision(-1), RangeError);
  });

  it('rejects a count that is not a whole number', () => {
    assert.throws(() => trialDivision(2.5), TypeError);
    assert.throws(() => trialDivision('10'), TypeError);
  });
});

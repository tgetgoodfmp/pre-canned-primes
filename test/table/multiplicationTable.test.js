import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { buildTableFromPrimes } from '../../src/table/multiplicationTable.js';

describe('buildTableFromPrimes', () => {
  it('matches the example from the brief', () => {
    assert.deepEqual(buildTableFromPrimes([2, 3, 5]), [
      [null, 2, 3, 5],
      [2, 4, 6, 10],
      [3, 6, 9, 15],
      [5, 10, 15, 25],
    ]);
  });

  it('leaves the top-left corner empty', () => {
    assert.equal(buildTableFromPrimes([2, 3])[0][0], null);
  });

  it('is (N+1) x (N+1)', () => {
    const table = buildTableFromPrimes([2, 3, 5, 7, 11]);

    assert.equal(table.length, 6);
    for (const row of table) {
      assert.equal(row.length, 6);
    }
  });

  it('multiplies the row header by the column header', () => {
    const table = buildTableFromPrimes([2, 3, 5, 7]);

    assert.equal(table[2][3], 3 * 5);
    assert.equal(table[4][1], 7 * 2);
  });
});

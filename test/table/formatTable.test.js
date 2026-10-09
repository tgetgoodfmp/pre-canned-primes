import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { formatTable } from '../../src/table/formatTable.js';

describe('formatTable', () => {
  it('matches the expected output from the brief', () => {
    const table = [
      [null, 2, 3, 5],
      [2, 4, 6, 10],
      [3, 6, 9, 15],
      [5, 10, 15, 25],
    ];

    assert.equal(
      formatTable(table),
      ['|   |  2 |  3 |  5 |', '| 2 |  4 |  6 | 10 |', '| 3 |  6 |  9 | 15 |', '| 5 | 10 | 15 | 25 |'].join('\n'),
    );
  });

  it('handles the smallest table', () => {
    assert.equal(formatTable([[null, 2], [2, 4]]), '|   | 2 |\n| 2 | 4 |');
  });

  it('pads each column to the width of its widest number', () => {
    assert.equal(formatTable([[null, 7], [7, 1000]]), '|   |    7 |\n| 7 | 1000 |');
  });

  it('returns an empty string for an empty table', () => {
    assert.equal(formatTable([]), '');
  });
});

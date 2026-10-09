import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { parseArgs, parseCount } from '../../src/cli/parseArgs.js';

describe('parseArgs', () => {
  it('leaves the count null when none was given', () => {
    assert.deepEqual(parseArgs([]), { count: null });
  });

  it('reads N from the argument', () => {
    assert.deepEqual(parseArgs(['10']), { count: 10 });
  });

  it('rejects an unknown option', () => {
    assert.throws(() => parseArgs(['--colour']), /Unknown option/);
  });
});

describe('parseCount', () => {
  it('accepts a whole number of at least 1', () => {
    assert.equal(parseCount('1'), 1);
    assert.equal(parseCount('42'), 42);
    assert.equal(parseCount('  10  '), 10);
  });

  it('rejects zero and negatives', () => {
    assert.throws(() => parseCount('0'), /at least 1/);
    assert.throws(() => parseCount('-5'), /not a whole number/);
  });

  it('rejects anything that is not a whole number', () => {
    for (const input of ['', 'ten', '3.5']) {
      assert.throws(() => parseCount(input), /not a whole number/, `input: ${JSON.stringify(input)}`);
    }
  });
});

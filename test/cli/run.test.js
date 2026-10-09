import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { run } from '../../src/cli/index.js';

/** Collects whatever the application writes, so we can assert on it. */
function fakeStream() {
  let text = '';

  return {
    write: (chunk) => {
      text += chunk;
    },
    get text() {
      return text;
    },
  };
}

describe('run', () => {
  it('prints the table and returns 0', async () => {
    const output = fakeStream();
    const errorOutput = fakeStream();

    const exitCode = await run(['3'], { output, errorOutput });

    assert.equal(exitCode, 0);
    assert.equal(errorOutput.text, '');
    assert.equal(
      output.text,
      ['|   |  2 |  3 |  5 |', '| 2 |  4 |  6 | 10 |', '| 3 |  6 |  9 | 15 |', '| 5 | 10 | 15 | 25 |', ''].join('\n'),
    );
  });

  it('prints an (N+1) x (N+1) grid', async () => {
    const output = fakeStream();

    await run(['10'], { output, errorOutput: fakeStream() });

    assert.equal(output.text.trimEnd().split('\n').length, 11);
  });

  it('reports a bad N on stderr and returns 1', async () => {
    const output = fakeStream();
    const errorOutput = fakeStream();

    const exitCode = await run(['0'], { output, errorOutput });

    assert.equal(exitCode, 1);
    assert.equal(output.text, '');
    assert.match(errorOutput.text, /at least 1/);
  });

  it('reports an unknown option', async () => {
    const errorOutput = fakeStream();

    const exitCode = await run(['--wat'], { output: fakeStream(), errorOutput });

    assert.equal(exitCode, 1);
    assert.match(errorOutput.text, /Unknown option/);
  });
});

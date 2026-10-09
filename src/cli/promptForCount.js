import { createInterface } from 'node:readline';

import { parseCount } from './parseArgs.js';

const PROMPT = 'How many primes should the table cover? ';

/**
 * Asks for N interactively, re-asking until the answer is usable. Used when no
 * count was given on the command line.
 *
 * Reading the interface as an async iterator rather than calling `question`
 * means the loop ends naturally when the input does, so a piped file or Ctrl-D
 * gives a clear message instead of waiting forever for an answer that will
 * never come.
 *
 * @param {object} [streams] Injectable so tests can drive it without a terminal.
 * @param {NodeJS.ReadableStream} [streams.input]
 * @param {NodeJS.WritableStream} [streams.output]
 * @returns {Promise<number>}
 * @throws {Error} If the input ends before a valid number is given.
 */
export async function promptForCount({ input = process.stdin, output = process.stdout } = {}) {
  const readline = createInterface({ input, output });

  try {
    output.write(PROMPT);

    for await (const line of readline) {
      try {
        return parseCount(line);
      } catch (error) {
        output.write(`${error.message}\n${PROMPT}`);
      }
    }
  } finally {
    readline.close();
  }

  throw new Error('No number was given. Pass one as an argument instead, for example: node src/cli/index.js 10');
}

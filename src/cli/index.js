import { fileURLToPath } from 'node:url';

import { trialDivision } from '../primes/trialDivision.js';
import { formatTable } from '../table/formatTable.js';
import { buildTableFromPrimes } from '../table/multiplicationTable.js';
import { parseArgs } from './parseArgs.js';
import { promptForCount } from './promptForCount.js';

/**
 * The command line entry point. All I/O is injected so the whole flow can be
 * exercised in tests without spawning a process.
 *
 * @param {string[]} argv Arguments after the node executable and script path.
 * @param {object} [io]
 * @param {NodeJS.ReadableStream} [io.input]
 * @param {{ write: (text: string) => unknown }} [io.output]
 * @param {{ write: (text: string) => unknown }} [io.errorOutput]
 * @returns {Promise<number>} The process exit code: 0 on success, 1 on error.
 */
export async function run(argv, { input = process.stdin, output = process.stdout, errorOutput = process.stderr } = {}) {
  try {
    const options = parseArgs(argv);
    const count = options.count ?? (await promptForCount({ input, output }));

    const primes = trialDivision(count);

    output.write(`${formatTable(buildTableFromPrimes(primes))}\n`);

    return 0;
  } catch (error) {
    errorOutput.write(`Error: ${error.message}\n`);
    return 1;
  }
}

// Only run when this file is the program, not when a test imports it for `run`.
// import.meta.url is a file:// URL; argv[1] is the path node was given.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  process.exitCode = await run(process.argv.slice(2));
}

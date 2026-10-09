/**
 * @typedef {object} CliOptions
 * @property {number|null} count Primes requested, or null to prompt for one.
 */

/**
 * Parses command line arguments. Kept free of I/O so the rules are easy to
 * test: it turns an array of strings into options, or throws.
 *
 * @param {string[]} argv Arguments after the node executable and script path.
 * @returns {CliOptions}
 * @throws {Error} On an unknown option or a malformed count.
 */
export function parseArgs(argv) {
  /** @type {CliOptions} */
  const options = { count: null };

  for (const argument of argv) {
    // A negative number looks like an option, so let the count parser have it
    // and give a useful message rather than "unknown option".
    if (argument.startsWith('-') && !/^-[0-9]/.test(argument)) {
      throw new Error(`Unknown option "${argument}". This command takes a single whole number, for example: 10`);
    }

    options.count = parseCount(argument);
  }

  return options;
}

/**
 * The brief asks for a whole number of at least 1, so anything else is rejected
 * here rather than producing a confusing table.
 *
 * @param {string} raw
 * @returns {number}
 */
export function parseCount(raw) {
  const trimmed = raw.trim();

  if (!/^\d+$/.test(trimmed)) {
    throw new Error(`"${raw}" is not a whole number. Please enter a whole number of at least 1.`);
  }

  const count = Number(trimmed);

  if (count < 1) {
    throw new Error(`N must be at least 1, received ${count}.`);
  }

  if (!Number.isSafeInteger(count)) {
    throw new Error(`${raw} is too large to handle precisely.`);
  }

  return count;
}

# Prime Tables

Prints an **(N+1) × (N+1)** multiplication table of the first N prime numbers.

```
|   |  2 |  3 |  5 |
| 2 |  4 |  6 | 10 |
| 3 |  6 |  9 | 15 |
| 5 | 10 | 15 | 25 |
```

No dependencies — Node's standard library and built-in test runner only.

## Running it

Node.js 18 or newer. Nothing to install.

```bash
node src/cli/index.js 10
```

Or through npm — the `--` is what stops npm swallowing the number:

```bash
npm start -- 10
```

Run it without a number and it will ask:

```bash
npm start
```

N is the number of primes to include: a whole number of at least 1.

## Tests

```bash
npm test
```

## How it works

Three steps, each unaware of the others: **generate the primes → build the grid
→ render it as text.**

```
src/
  primes/   trialDivision.js  the algorithm
  table/    multiplicationTable.js  builds the (N+1) × (N+1) grid
            formatTable.js          renders the grid as text
  cli/      index.js          entry point and top-level flow
            parseArgs.js, promptForCount.js
```

Trial division tests each candidate against the primes already found, stopping
at its square root: if `n = a × b` then one of `a`, `b` must be at or below
`√n`, so if no small factor exists there is no large one either. After 2 and 3
it only visits the numbers either side of a multiple of six — the other four in
every six are divisible by 2 or 3 — which skips two thirds of the candidates
for free.

The grid is a plain `(N+1) × (N+1)` array with `null` in the corner, so the
formatter decides how an empty cell looks rather than the builder.

## What I'm pleased with

- **The failure modes are handled.** Fractions, zero, negatives and an unknown
  option each give a specific message and exit code 1, not a stack trace.
- **Nothing below `src/cli/` knows about the console.** Generating the primes,
  building the grid and rendering it are three separate functions, so another
  front end would reuse them untouched.
- **The output stays readable as it grows.** Each column is padded to the width
  of its own widest value, so digits line up by place value at N = 3 and at
  N = 1,000.

## What I'd do with more time

- **Implement the sieve algorithm.** Trial division is the obvious correct
  thing, not the fast thing. A sieve of Eratosthenes crosses out multiples
  instead of testing each candidate, which is close to linear and a large win at
  the sizes where this starts to drag.
- **Stream the output.** The table is built in memory and joined into one
  string, and it grows with N² — N = 2,000 is 46MB of text. Yielding a row at a
  time would remove that ceiling and start printing immediately.
- **Halve the multiplications.** The table is symmetric across its diagonal, so
  just under half of them are duplicates. Only worth it alongside streaming —
  the memory is the real constraint, not the arithmetic.
- **Test the interactive prompt.** Everything else has tests, but driving
  readline from a test needs a fake input stream and I ran out of time.
- **Add tooling and real types.** ESLint, Prettier, and CI running the tests on
  every push. The JSDoc types are checked by editors but not enforced, so
  `tsc --checkJs` would turn them into something that can actually fail.

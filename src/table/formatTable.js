const EMPTY_CELL = '';

/**
 * Renders the table as text for the console:
 *
 *   |   |  2 |  3 |  5 |
 *   | 2 |  4 |  6 | 10 |
 *
 * Every column is padded to the width of its own widest value and the numbers
 * are right-aligned, so digits line up by place value and the table stays
 * readable as the products grow.
 *
 * @param {(number|null)[][]} table
 * @returns {string}
 */
export function formatTable(table) {
  if (table.length === 0) return '';

  const cells = table.map((row) => row.map((cell) => (cell === null ? EMPTY_CELL : String(cell))));
  const widths = columnWidths(cells);

  return cells
    .map((row) => `| ${row.map((cell, column) => cell.padStart(widths[column])).join(' | ')} |`)
    .join('\n');
}

/**
 * @param {string[][]} cells
 * @returns {number[]} The widest cell in each column.
 */
function columnWidths(cells) {
  const widths = new Array(cells[0].length).fill(0);

  for (const row of cells) {
    row.forEach((cell, column) => {
      if (cell.length > widths[column]) widths[column] = cell.length;
    });
  }

  return widths;
}

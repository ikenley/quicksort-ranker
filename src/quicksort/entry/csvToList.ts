/** Converts a comma or newline separated string into an array.
 * It will also trim each element and filter out blanks.
 */
const csvToList = (csv: string) => {
  const split = csv.split(/[\n,]+/);
  const trimmed = split.map((s) => s.trim());
  const result = trimmed.filter((s) => s !== "");
  return result;
};

export default csvToList;

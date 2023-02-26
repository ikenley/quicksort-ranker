import csvToList from "../csvToList";

test("WHEN valid csv THEN returns list", () => {
  const csv = `foo,bar,baz`;

  const result = csvToList(csv);

  expect(result).toEqual(["foo", "bar", "baz"]);
});

test("WHEN valid newline THEN returns list", () => {
  const csv = `foo
  bar
  baz`;

  const result = csvToList(csv);

  expect(result).toEqual(["foo", "bar", "baz"]);
});

test("WHEN mixed csv newline THEN returns list", () => {
  const csv = `foo,bar
  baz`;

  const result = csvToList(csv);

  expect(result).toEqual(["foo", "bar", "baz"]);
});

test("WHEN whitespace THEN trimmed", () => {
  const csv = `foo,   bar    
  baz`;

  const result = csvToList(csv);

  expect(result).toEqual(["foo", "bar", "baz"]);
});

test("WHEN blanks THEN returns filtered from list", () => {
  const csv = `
  foo,bar,,,,


  baz
  `;

  const result = csvToList(csv);

  expect(result).toEqual(["foo", "bar", "baz"]);
});

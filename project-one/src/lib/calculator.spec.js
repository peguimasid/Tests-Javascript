const sum = require('./calculator');

it('sum 2 and 2 must result in 4', () => {
  expect(sum(2, 2)).toBe(4);
});

it('sum 2 and 2 must result in 4 even if params are strings', () => {
  expect(sum('2', 2)).toBe(4);
});

it('throw error if given params cannot be converted to integers', () => {
  expect(() => {
    sum('', '2');
  }).toThrowError();

  expect(() => {
    sum([2, 2]);
  }).toThrowError();

  expect(() => {
    sum({});
  }).toThrowError();

  expect(() => {
    sum();
  }).toThrowError();
});

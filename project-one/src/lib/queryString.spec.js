import { queryString, parse } from './queryString';

describe('Object to query string', () => {
  it('create valid query string when object is valid', () => {
    const obj = {
      name: 'Guilhermo',
      profession: 'Software Engineer',
    };

    expect(queryString(obj)).toBe(
      'name=Guilhermo&profession=Software%20Engineer'
    );
  });

  it('create valid query string even send array inside object', () => {
    const obj = {
      name: 'Guilhermo',
      techs: ['JS', 'CSS', 'React'],
    };

    expect(queryString(obj)).toBe('name=Guilhermo&techs=JS%2CCSS%2CReact');
  });

  it('throw error when object is passed as value', () => {
    const obj = {
      name: 'Guilhermo',
      techs: {
        first: 'JS',
        second: 'CSS',
      },
    };

    expect(() => {
      queryString(obj);
    }).toThrowError();
  });
});

describe('Query string to object', () => {
  it('convert a query string to object', () => {
    const qs = 'name=Guilhermo&profession=Software%20Developer';
    const expectedResult = {
      name: 'Guilhermo',
      profession: 'Software Developer',
    };

    expect(parse(qs)).toEqual(expectedResult);
  });

  it('convert a query string of single key-value to object', () => {
    const qs = 'name=Guilhermo';
    const expectedResult = {
      name: 'Guilhermo',
    };

    expect(parse(qs)).toEqual(expectedResult);
  });

  it('convert a query string to object taking care of comma separated values', () => {
    const qs = 'name=Guilhermo&techs=JS%2CCSS%2CReact';
    const expectedResult = {
      name: 'Guilhermo',
      techs: ['JS', 'CSS', 'React'],
    };

    expect(parse(qs)).toEqual(expectedResult);
  });
});

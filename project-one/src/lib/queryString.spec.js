const queryString = require('./queryString');

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

// describe('Query string to object', () => {

// })

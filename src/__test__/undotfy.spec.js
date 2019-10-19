import { undotfy } from '..';

describe('Dot notation to object', () => {
  it('Should exist', () => {
    expect(undotfy).toBeDefined();
  });

  it('Should be a function', () => {
    expect(undotfy).toBeFunction();
  });

  describe('Unit tests', () => {
    test('Nested properties', () => {
      const obj = { 'a.b.c': 0 };
      expect(undotfy(obj)).toEqual({ a: { b: { c: 0 } } });
    });

    test('Multiple properties at the same level', () => {
      const obj = { 'a.b.c': 0, 'a.b.e.f': 2, 'a.b.d': 1 };
      expect(undotfy(obj)).toEqual({
        a: {
          b: expect.objectContaining({
            c: 0,
            d: 1,
            e: {
              f: 2
            }
          })
        }
      });
    });
  });
});

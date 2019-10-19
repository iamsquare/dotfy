import { dotfy } from '..';

describe('Object to dot notation', () => {
  it('Should exist', () => {
    expect(dotfy).toBeDefined();
  });

  it('Should be a function', () => {
    expect(dotfy).toBeFunction();
  });

  describe('Unit tests', () => {
    test('Nested properties', () => {
      const obj = { a: { b: { c: 0 } } };
      expect(dotfy(obj)).toEqual(
        expect.objectContaining({
          'a.b.c': 0
        })
      );
    });

    test('Multiple properties at the same level', () => {
      const obj = { a: { b: 2, c: { d: 1 } } };
      expect(dotfy(obj)).toEqual(
        expect.objectContaining({
          'a.c.d': 1,
          'a.b': 2
        })
      );
    });

    it('Should not suppress empty objects as values', () => {
      const obj = { a: { b: 2, c: {} } };
      expect(dotfy(obj)).toEqual(
        expect.objectContaining({
          'a.c': {},
          'a.b': 2
        })
      );
    });

    it('Should suppress empty objects when the corresponding option is passed', () => {
      const obj = { a: { b: 2, c: {} } };
      expect(dotfy(obj, { suppressEmpty: true }))
        .toEqual(
          expect.objectContaining({
            'a.b': 2
          })
        )
        .toEqual(
          expect.not.objectContaining({
            'a.b.c': expect.anything()
          })
        );
    });
  });
});

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

    it('Should traverse arrays when the corresponding option is passed', () => {
      const obj = { a: { b: 2, c: [10, 20] } };
      expect(dotfy(obj, { traverseArrays: true })).toEqual(
        expect.objectContaining({
          'a.b': 2,
          'a.c.0': 10,
          'a.c.1': 20
        })
      );
    });

    test('Both options at the same time', () => {
      const obj = { a: { b: 2, c: [10, 20], d: {}, e: [], f: [{}, { g: 10 }, 20], h: [{}], i: [{}, {}] } };
      expect(dotfy(obj, { suppressEmpty: true, traverseArrays: true }))
        .toEqual(
          expect.objectContaining({
            'a.b': 2,
            'a.c.0': 10,
            'a.c.1': 20,
            'a.f.1.g': 10,
            'a.f.2': 20
          })
        )
        .toEqual(
          expect.not.objectContaining({
            'a.e': expect.anything(),
            'a.e.0': expect.anything(),
            'a.f.0': expect.anything(),
            'a.h': expect.anything()
          })
        );
    });
  });
});

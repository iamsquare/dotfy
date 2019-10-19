import { undotfy } from '..';

describe('Dot notation to object', () => {
  it('Should exist', () => {
    expect(undotfy).toBeDefined();
  });

  it('Should be a function', () => {
    expect(undotfy).toBeFunction();
  });
});

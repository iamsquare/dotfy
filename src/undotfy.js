import { pipe, split, splitAt, toPairs, reduce, reduceRight, mergeDeepLeft } from 'ramda';

export const undotfy = pipe(
  toPairs,
  reduce(
    (obj, [key, value]) =>
      pipe(
        split('.'),
        splitAt(-1),
        ([init, last]) => reduceRight((next, prev) => ({ [next]: prev }), { [last]: value }, init),
        mergeDeepLeft(obj)
      )(key),
    {}
  )
);

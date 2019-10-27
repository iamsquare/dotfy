import { pipe, chain, map, toPairs, fromPairs } from 'ramda';
import { isPlainObject, isNotEmpty, isArray } from 'ramda-extension';

const toPathPairs = (object, options = {}) =>
  pipe(
    toPairs,
    chain(([key, value]) =>
      (isPlainObject(value) || (options.traverseArrays && isArray(value))) &&
      (isNotEmpty(value) || options.suppressEmpty)
        ? map(([childKey, childValue]) => [`${key}.${childKey}`, childValue], toPathPairs(value, options))
        : [[key, value]]
    )
  )(object);

export const dotfy = pipe(
  toPathPairs,
  fromPairs
);

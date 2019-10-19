import { pipe, chain, map, toPairs, fromPairs } from 'ramda';
import { isPlainObject, isNotEmpty } from 'ramda-extension';

const toPathPairs = (object, options = {}) =>
  pipe(
    toPairs,
    chain(([key, value]) =>
      isPlainObject(value) && (isNotEmpty(value) || options.suppressEmpty)
        ? map(([childKey, childValue]) => [`${key}.${childKey}`, childValue], toPathPairs(value))
        : [[key, value]]
    )
  )(object);

export const dotfy = pipe(
  toPathPairs,
  fromPairs
);

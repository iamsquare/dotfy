import { pipe, chain, map, toPairs, fromPairs } from 'ramda';
import { isPlainObject, isNotEmpty } from 'ramda-extension';

const getPathPairs = (object, options = {}) => {
  return pipe(
    toPairs,
    chain(([key, value]) =>
      isPlainObject(value) && (isNotEmpty(value) || options.suppressEmpty)
        ? map(([childKey, childValue]) => [`${key}.${childKey}`, childValue], getPathPairs(value))
        : [[key, value]]
    )
  )(object);
};

export const dotfy = pipe(
  getPathPairs,
  fromPairs
);

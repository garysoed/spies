import Matcher from 'src/matcher/matcher';

/**
 * Contains various utility functions.
 *
 * @class Utils
 * @static
 */

/**
 * Deep equals the two objects.
 *
 * @method deepEqual
 * @param  {Object} obj1 The first object to compare.
 * @param  {Object} obj2 The second object to compare.
 * @return {boolean} True iff the two objects are deeply equal.
 */
export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (obj1 instanceof Matcher) {
    return obj1.registerInvocation(obj2);
  }

  if (obj2 instanceof Matcher) {
    return obj2.registerInvocation(obj1);
  }

  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
    return obj1 === obj2;
  }

  if (obj1 instanceof Function) {
    return obj1 === obj2;
  }

  if (obj1 instanceof Array && obj1.length !== obj2.length) {
    return false;
  }

  for (var key in obj1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

if (window.TEST_MODE) {
  if (!window.spies) {
    window.spies = {};
  }

  window.spies.Utils = {
    deepEqual
  };
}
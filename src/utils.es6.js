/**
 * Contains various utility functions.
 */

/**
 * Deep equals the two objects.
 * 
 * @param  {*} obj1 The first object to compare.
 * @param  {*} obj2 The second object to compare.
 * @return {boolean} True iff the two objects are deeply equal.
 */
export function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
    return obj1 === obj2;
  }

  if (obj1.equals instanceof Function) {
    return obj1.equals(obj2);
  }

  if (obj2.equals instanceof Function) {
    return obj2.equals(obj1);
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

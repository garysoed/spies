import Matcher from 'src/matcher/matcher';

// Private symbols.
const _EXPECTED_TYPE = Symbol();

export default class IsA extends Matcher {
  /**
   * Matches arguments that is the instance of the given ctor, or has the expected type.
   * @constructor
   * @param {Function|string} expectedType If function, this will check if the argument is an 
   *     instance of it. If a string, this will check if typeof argument is the specified string.
   * @class matcher.IsA
   * @extends matcher.Matcher
   */
  constructor(expectedType) {
    super.constructor();
    this[_EXPECTED_TYPE] = expectedType;
  }

  /**
   * @method matches
   * @param {Object} arg Object to be checked.
   * @return {boolean} True iff the given argument is an instance of the constructor.
   */
  matches(arg) {
    if (this[_EXPECTED_TYPE] instanceof Function) {
      return arg instanceof this[_EXPECTED_TYPE];
    } else {
      return typeof arg === this[_EXPECTED_TYPE];
    }
  }
}
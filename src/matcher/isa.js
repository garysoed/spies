import Matcher from 'src/matcher/matcher';

let _expectedType = Symbol();

/**
 * Matches arguments that is the instance of the given ctor, or has the expected type.
 * @class IsA
 * @extends Matcher
 */
export default class IsA extends Matcher {

  /**
   * @param {Function|string} expectedType If function, this will check if the argument is an 
   *     instance of it. If a string, this will check if typeof argument is the specified string.
   * @constructor
   */
  constructor(expectedType) {
    super.constructor();
    this[_expectedType] = expectedType;
  }

  /**
   * @param {Object} arg Object to be checked.
   * @return {boolean} True iff the given argument is an instance of the constructor.
   * @method matches
   */
  matches(arg) {
    if (this[_expectedType] instanceof Function) {
      return arg instanceof this[_expectedType];
    } else {
      return typeof arg === this[_expectedType];
    }
  }
}
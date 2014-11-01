import Matcher from 'src/matcher/matcher';

/**
 * @class Matches arguments that is the instance of the given ctor, or has the expected type.
 */
export default class IsA extends Matcher {

  /**
   * @param {Function|string} expectedType If function, this will check if the argument is an instance of
   *     it. If a string, this will check if typeof argument is the specified string.
   * @constructor
   */
  constructor(expectedType) {
    super();
    this.expectedType = expectedType;
  }

  /**
   * @return {boolean} True iff the given argument is an instance of the constructor.
   */
  matches(arg) {
    if (this.expectedType instanceof Function) {
      return arg instanceof this.expectedType;
    } else {
      return typeof arg === this.expectedType;
    }
  }
}
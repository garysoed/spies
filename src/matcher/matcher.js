/**
 * Base class for matcher objects. These allow you to store arguments that have been pass into a
 * gunction call.
 * 
 * @class matcher.Matcher
 */

// Private symbols.
const _MATCHING_ARGS = Symbol();

export default class Matcher {

  /**
   * @constructor
   */
  constructor() {
    this[_MATCHING_ARGS] = [];
  }

  /**
   * Checks if the given argument matches the matcher. If so, records the invocation.
   * @param  {Object=} arg The argument to be checked.
   * @return {boolean} True iff the given argument is a match.
   * @method registerInvocation
   */
  registerInvocation(arg) {
    if (this.matches(arg)) {
      this.matchingArgs.push(arg);
      return true;
    }

    return false;
  }

  /**
   * Array of recorded arguments that matches
   *
   * @property matchingArgs
   * @type Array
   */
  get matchingArgs() {
    return this[_MATCHING_ARGS];
  }
}

if (window.TEST_MODE) {
  if (!window.spies) {
    window.spies = {};
  }

  window.spies.Matcher = Matcher;
}
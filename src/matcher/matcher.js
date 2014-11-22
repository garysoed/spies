/**
 * Base class for matcher objects. These allow you to store arguments that have been pass into a
 * gunction call.
 * 
 * @class Matcher
 */
export default class Matcher {

  /**
   * @constructor
   */
  constructor() {

    /**
     * Array of recorded arguments that matches.
     *
     * @property matchingArgs
     * @type Array
     */
    this.matchingArgs = [];
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
};

if (window.TEST_MODE) {
  if (!window.spies) {
    window.spies = {};
  }

  window.spies.Matcher = Matcher;
}
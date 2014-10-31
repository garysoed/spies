/**
 * @class Represents a matcher used for dynamically matches arguments.
 */
export default class Matcher {

  /**
   * @constructor
   */
  constructor() {
    this.matchingArgs = [];
  }

  /**
   * Checks if the given argument matches the matcher. If so, records the invocation.
   * @param  {Object=} arg The argument to be checked.
   * @return {boolean} True iff the given argument is a match.
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
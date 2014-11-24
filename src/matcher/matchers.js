import IsA from 'src/matcher/isa';
import Any from 'src/matcher/any';

/**
 * Static class to create "Matcher" objects.
 *
 * @class Matchers
 * @static
 */
let Matchers = {

  /**
   * Creates a matcher that matches by type.
   *
   * @method isA
   * @param {Function|string} expectedType Type to be checked.
   * @return {IsA} The IsA matcher.
   */
  isA(expectedType) {
    return new IsA(expectedType);
  },

  /**
   * Creates a matcher that matches anything.
   *
   * @method any
   * @return {Any} The Any matcher.
   */
  any() {
    return new Any();
  }
};

export default Matchers;

if (!window.spies) {
  window.spies = {};
}

window.spies.Matchers = Matchers;

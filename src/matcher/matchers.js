import IsA from 'src/matcher/isa';
import Any from 'src/matcher/any';

var Matchers = {

  /**
   * @see  src/matcher/isa
   */
  isA(expectedType) {
    return new IsA(expectedType);
  },

  /**
   * @see  src/matcher/any
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
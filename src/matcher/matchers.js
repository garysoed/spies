import IsA from 'src/matcher/isa';

var Matchers = {

  /**
   * @see  src/matcher/isa
   */
  isA(expectedType) {
    return new IsA(expectedType);
  }
};

export default Matchers;

if (!window.spies) {
  window.spies = {};
}

window.spies.Matchers = Matchers;
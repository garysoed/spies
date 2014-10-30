import IsA from 'src/matcher/isa';

export default {

  /**
   * @see  src/matcher/isa
   */
  isA(expectedType) {
    return new IsA(expectedType);
  }
};
import Matcher from 'src/matcher/matcher';

/**
 * Matches anything.
 * @class Any
 * @extends Matcher
 */
export default class Any extends Matcher {

  /**
   * @constructor
   */
  constructor() {
    super.constructor();
  }

  /**
   * @method matches
   * @return {boolean} True. Always.
   */
  matches() {
    return true;
  }
}
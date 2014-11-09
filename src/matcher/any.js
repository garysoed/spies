import Matcher from 'src/matcher/matcher';

/**
 * @class Matches anything.
 */

export default class Any extends Matcher {
  constructor() {
    super.constructor();
  }

  /**
   * @return {boolean} True. Always.
   */
  matches() {
    return true;
  }
}
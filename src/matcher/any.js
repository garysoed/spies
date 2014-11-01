import Matcher from 'src/matcher/matcher';

/**
 * @class Matches anything.
 */

export default class Any extends Matcher {
  constructor() {
    super();
  }

  /**
   * @return {boolean} True. Always.
   */
  matches() {
    return true;
  }
}
import Matcher from 'src/matcher/matcher';


export default class Any extends Matcher {

  /**
   * Matches anything.
   * @class matcher.Any
   * @constructor
   * @extends matcher.Matcher
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
/**
 * @class Represents a function that is spied.
 * @module src/spiedfn.es6
 */
export default class SpiedFn {

  /**
   * @param {Object} scope The scope that the function is in.
   * @param {string} name The name of the function that is spied.
   * @constructor
   */
  constructor(scope, name) {
    this.scope = scope;
    this.name = name;
    this.fn = scope[name];
    this.records = [];
  }

  /**
   * Restores the spied function.
   * @method
   */
  restore() {
    this.scope[this.name] = this.fn;
  }

  /**
   * Records a function call.
   * @param {Array.<*>} args Array containing arguments to the function call.
   */
  record(args) {
    this.records.push(args);
  }
}

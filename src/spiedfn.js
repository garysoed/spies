// symbols
var _scope = Symbol();
var _name = Symbol();
var _origFn = Symbol();
var _records = Symbol();

/**
 * @class Represents a function that is spied.
 * @module src/spiedfn.es6
 */
export default class SpiedFn extends Function {

  /**
   * @param {!Object} scope The scope that the function is in.
   * @param {string} name The name of the function that is spied.
   * @constructor
   */
  constructor(scope, name) {
    let origFn = scope[name];

    var f = function(...args) {
      f.record(args);
      return origFn.call(this, args);
    };
    f.__proto__ = SpiedFn.prototype;
    f.constructor = SpiedFn;
    f[_scope] = scope;
    f[_name] = name;
    f[_origFn] = origFn;
    f.records = [];

    // Override the original function.
    scope[name] = f;

    return f;
  }

  /**
   * Restores the spied function.
   * @method
   */
  restore() {
    this[_scope][this[_name]] = this[_origFn];
  }

  /**
   * Records a function call.
   * @param {Array.<*>} args Array containing arguments to the function call.
   */
  record(args) {
    this.records.push(args);
  }
}

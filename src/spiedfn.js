// symbols
var _scope = Symbol();
var _name = Symbol();
var _origFn = Symbol();
var _records = Symbol();

/**
 * @class Represents a function that is spied.
 */
export default class SpiedFn extends Function {

  /**
   * @param {!Object} scope The scope that the function is in.
   * @param {string} name The name of the function that is spied.
   * @param {boolean} callOriginal True iff the original should be called.
   * @constructor
   */
  constructor(scope, name, callOriginal) {
    let origFn = scope[name];

    var f = function(...args) {
      f.record(args);
      if (callOriginal) {
        return origFn.apply(this, args);
      }
      return undefined;
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

if (window.TEST_MODE) {
  if (!window.spies) {
    window.spies = {};
  }

  window.spies.SpiedFn = SpiedFn;
}

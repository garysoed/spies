// symbols
let _scope = Symbol();
let _name = Symbol();
let _origFn = Symbol();
let _records = Symbol();
let _callOriginal = Symbol();
let _returnValue = Symbol();

/**
 * @class Represents a function that is spied.
 */
export default class SpiedFn extends Function {

  /**
   * @param {!Object} scope The scope that the function is in.
   * @param {string} name The name of the function that is spied.
   * @constructor
   */
  constructor(scope, name) {
    let origFn = scope[name];

    let f = function(...args) {
      f.record(args);
      if (f[_callOriginal]) {
        return origFn.apply(this, args);
      }
      return f[_returnValue];
    };
    f.__proto__ = SpiedFn.prototype;
    f.constructor = SpiedFn;
    f[_scope] = scope;
    f[_name] = name;
    f[_origFn] = origFn;
    f[_callOriginal] = true;
    f[_returnValue] = undefined;
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

  /**
   * Returns the given return value instead of the original function's.
   * @param {Object=} returnValue Return value to return instead of calling the original function.
   */
  overrideReturn(returnValue) {
    this[_callOriginal] = false;
    this[_returnValue] = returnValue;
  }
}

if (window.TEST_MODE) {
  if (!window.spies) {
    window.spies = {};
  }

  window.spies.SpiedFn = SpiedFn;
}

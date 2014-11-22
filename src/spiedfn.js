// symbols
let _scope = Symbol();
let _name = Symbol();
let _origFn = Symbol();
let _records = Symbol();
let _callOriginal = Symbol();
let _returnValue = Symbol();

/**
 * Represents a function that is spied.
 * @class SpiedFn
 * @extends Function
 */
export default class SpiedFn extends Function {

  /**
   * @param {Object=} scope The scope that the function is in. If undefined, then the original 
   *     function will never be called and #restore will do nothing.
   * @param {string} name The name of the function that is spied, or undefined if scope is null.
   * @constructor
   */
  constructor(scope, name) {
    let origFn = scope ? scope[name] : null;

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
    f[_callOriginal] = !!origFn;
    f[_returnValue] = undefined;
    f.records = [];

    // Override the original function, if any.
    if (scope) {
      scope[name] = f;
    }

    return f;
  }

  /**
   * Restores the spied function.
   * @method restore
   */
  restore() {
    if (this[_scope]) {
      this[_scope][this[_name]] = this[_origFn];
    }
  }

  /**
   * Records a function call.
   * 
   * @method record
   * @param {Array} args Array containing arguments to the function call.
   */
  record(args) {
    this.records.push(args);
  }

  /**
   * Returns the given return value instead of the original function's.
   *
   * @method overrideReturn
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

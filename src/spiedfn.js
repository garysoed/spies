/**
 * Represents a function that is spied.
 * @class SpiedFn
 * @extends Function
 */

// Private symbols
const _CALL_ORIGINAL = Symbol();
const _NAME = Symbol();
const _ORIG_FN = Symbol();
const _RECORDS = Symbol();
const _RETURN_VALUE = Symbol();
const _SCOPE = Symbol();

let timestamp = 0;

export default class SpiedFn extends Function {

  /**
   * @param {Object} [scope] The scope that the function is in. If undefined, then the original
   *     function will never be called and #restore will do nothing.
   * @param {string} [name] The name of the function that is spied, if scope is given.
   * @class SpiedFn
   * @constructor
   */
  constructor(scope, name) {
    let origFn = scope ? scope[name] : null;

    let f = Object.setPrototypeOf(function(...args) {
      f.record(args);
      if (f[_CALL_ORIGINAL]) {
        return origFn.apply(this, args);
      }
      return f[_RETURN_VALUE];
    }, SpiedFn.prototype);
    f.constructor = SpiedFn;
    f[_SCOPE] = scope;
    f[_NAME] = name;
    f[_ORIG_FN] = origFn;
    f[_CALL_ORIGINAL] = !!origFn;
    f[_RETURN_VALUE] = undefined;
    f[_RECORDS] = [];

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
    if (this[_SCOPE]) {
      this[_SCOPE][this[_NAME]] = this[_ORIG_FN];
    }
    this.records.splice(0, this.records.length);
  }

  /**
   * Records a function call.
   *
   * @method record
   * @param {Array} args Array containing arguments to the function call.
   */
  record(args) {
    timestamp++;
    this.records.push({timestamp, args});
  }

  /**
   * Returns the given return value instead of the original function's.
   *
   * @method overrideReturn
   * @param {Object} [returnValue] Return value to return instead of calling the original function.
   * @return {SpiedFn} The current object.
   */
  overrideReturn(returnValue) {
    this[_CALL_ORIGINAL] = false;
    this[_RETURN_VALUE] = returnValue;
    return this;
  }

  /**
   * Array of record objects, each containing an invocation for the function. Each
   * invocation is a mapping of timestamp -> array of arguments used to invoke it.
   *
   * @property records
   * @type Array
   * @readonly
   */
  get records() {
    return this[_RECORDS];
  }
}

if (window.TEST_MODE) {
  if (!window.spies) {
    window.spies = {};
  }

  window.spies.SpiedFn = SpiedFn;
}

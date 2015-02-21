import SpiedFn       from 'src/spiedfn';
import { deepEqual } from 'src/utils';

/**
 * Root object for the library.
 *
 * @class Spies
 * @static
 */

let spiedFns = [];

const Spies = {

  /**
   * Creates a stub for the given constructor or object. All functions will be replaced by a noop
   * function.
   *
   * @method stub
   * @param  {Function|Object} ctor The constructor to be stubbed, or object.
   * @return {Object} The stub object.
   */
  stub(target) {
    let source = (typeof target === 'function') ?
        target.prototype : target;

    let obj = Object.setPrototypeOf({}, source);
    for (let prop in source) {
      if (typeof source[prop] === 'function') {
        obj[prop] = function() {};
      } else if (typeof source[prop] === 'object') {
        obj[prop] = this.stub(source[prop]);
      }
    }

    return obj;
  },

  /**
   * Spies the given function, or recursively all functions in the given object.
   *
   * @method spy
   * @param {Object} scope The Object to be spied on, or the object containing the function to 
   *     be spied on. 
   * @param {string} [name] The name of the function to be spied on. If not specified, this will
   *     spy all functions in the scope recursively.
   * @return {Object|Function} The spied function, or the spied object.
   */
  spy(scope, name) {
    if (name === undefined) {
      // We are spying on an object.
      for (let key in scope) {
        if (scope[key] instanceof Function) {
          this.spy(scope, key);
        } else if (scope[key] instanceof Object) {
          this.spy(scope[key], undefined);
        }
      }
      return scope;
    } else {
      // We are spying on a function
      let spiedFn = new SpiedFn(scope, name);
      spiedFns.push(spiedFn);
      return spiedFn;
    }
  },

  /**
   * Returns a function that returns the call count of the given target when called with the given
   * arguments. For example: `Spies.callCountOf(fn)(1, 2)` returns the number of calls that function
   * fn was called with arguments `(1, 2)`.
   *
   * If the passed in function is not a spy, this will return 0.
   *
   * @method callCountOf
   * @param {SpiedFn} target The function whose call count should be returned.
   * @return {Function} Function that returns the call counts of the given function.
   */
  callCountOf(target) {
    return (...args) => {
      return Spies.invocationsOf(target).apply(target, args).length;
    };
  },

  /**
   * Returns a function that returns the invocations of the given target when called with the given
   * arguments. For example: `Spies.invocationsOf(fn)(1, 2)` returns an array of invocations
   * matching when `fn` is called with arguments `(1, 2)`.
   *
   * An invocation object consists of two values:
   * - `timestamp`: This is the timestamp of the call. This only determines ordering, not actual 
   *   time.
   * - `args`: This is an array of arguments that the function received at that time.
   *
   * @method invocationsOf
   * @param {SpiedFn} target The function whose invocations should be returned.
   * @return {Function} Function thar returns the invocations of the given function.
   */
  invocationsOf(target) {
    let records = target.records || [];
    return (...args) => {
      let invocations = records.filter(record => {
        return deepEqual(record.args, args);
      });
      return invocations;
    };
  },

  /**
   * Returns the number of call counts for the target of any arguments.
   *
   * @method anyCallCountOf
   * @param {Function} target The function whose call count should be returned.
   * @return {number} Number of invocations on the given function.
   */
  anyCallCountOf(target) {
    return target.records.length;
  },

  /**
   * Restores the given function or recursively all functions in the given object to its original
   * implementation and removes all records related to it. Or, restores all known functions, if no
   * arguments is given.
   *
   * @method reset
   * @param {Function|Object} [target] The function or object to be reset.
   */
  reset(target) {
    if (!target) {
      spiedFns.forEach(spiedFn => spiedFn.restore());
      spiedFns = [];
    } else if (target instanceof SpiedFn) {
      target.restore();
      spiedFns.splice(spiedFns.indexOf(target), 1);
    } else if (target instanceof Function) {
      // Do nothing, this is an unspied function.
    } else {
      // Go through every member of the object and resets it.
      for (let key in target) {
        this.reset(target[key]);
      }
    }
  },

  /**
   * Creates a spied function.
   *
   * @method spiedFunction
   * @return {SpiedFn} Spied function.
   */
  spiedFunction() {
    let fn = new SpiedFn();
    spiedFns.push(fn);
    return fn;
  }
};

export default Spies;

if (!window.spies) {
  window.spies = {};
}
window.spies.Spies = Spies;

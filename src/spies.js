import SpiedFn from 'src/spiedfn';
import { deepEqual } from 'src/utils';

var Spies = {

  /**
   * Creates a stub for the given constructor.
   *
   * @param  {!Function} ctor The constructor to be stubbed.
   * 
   * @return {!Object} The stub object.
   */
  stub(ctor) {
    return {
      __proto__: ctor.prototype
    };
  },

  /**
   * Spies the given function, or recursively all functions in the given object.
   *
   * @param {!Object} scope The Object to be spied on, or the object containing the function to 
   *     be spied on. 
   * @param {string=} name The name of the function to be spied on. If not specified, this will
   *     spy all functions in the scope recursively.
   * @param {boolean=} callOriginal True iff the original function should be called. Defaults to 
   *     true.
   */
  spy(scope, name, callOriginal = true) {
    if (name === undefined) {
      // We are spying on an object.
      for (let key in scope) {
        if (scope[key] instanceof Function) {
          this.spy(scope, key, callOriginal);
        } else if (scope[key] instanceof Object) {
          this.spy(scope[key], undefined, callOriginal);
        }
      }
    } else {
      // We are spying on a function
      new SpiedFn(scope, name, callOriginal);
    }
  },

  /**
   * Returns a function that returns the call count of the given target when called with the given
   * arguments. For example: Spies.callCountOf(fn)(1, 2) returns the number of calls that function
   * fn was called with arguments (1, 2).
   *
   * If the passed in function is not a spy, this will return 0.
   * 
   * @param {!Function} target The function whose call count should be returned.
   * @return {!Function} Function that returns the call counts of the given function.
   */
  callCountOf(target) {
    let record = target.records || [];
    return (...args) => {
      let invocations = record.filter(recordedArgs => {
        return deepEqual(recordedArgs, args);
      });
      return invocations.length;
    };
  },

  /**
   * Returns the number of call counts for the target of any arguments.
   *
   * @param {!Function} target The function whose call count should be returned.
   * @return {number} Number of invocations on the given function.
   */
  anyCallCountOf(target) {
    return target.records.length;
  },

  /**
   * Restores the given function or recursively all functions in the given object to its original
   * implementation and removes all records related to it.
   *
   * @param  {Function} target The function or object to be reset.
   */
  reset(target) {
    if (target instanceof SpiedFn) {
      target.restore();
    } else if (target instanceof Function) {
      // Do nothing, this is an unspied function.
    } else {
      // Go through every member of the object and resets it.
      for (let key in target) {
        this.reset(target[key]);
      }
    }
  }
};

export default Spies;

if (!window.spies) {
  window.spies = {};
}
window.spies.Spies = Spies;

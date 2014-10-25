import SpiedFn from 'src/spiedfn.es6';
import { deepEqual } from 'src/utils.es6';
import SpiedFnMap from 'src/spiedfnmap.es6'

var spiedFns = new SpiedFnMap();

export default {

  /**
   * Spies the given function, or recursively all functions in the given object.
   *
   * @param  {!Object} scope The Object to be spied on, or the object containing the function to 
   *     be spied on. 
   * @param  {string=} name The name of the function to be spied on.
   */
  spy: function(scope, name) {
    if (name === undefined) {
      // We are spying on an object.
      for (let key in scope) {
        if (scope[key] instanceof Function) {
          this.spy(scope, key);
        } else if (scope[key] instanceof Object) {
          this.spy(scope[key]);
        }
      }
    } else {
      // We are spying on a function
      let origFn = scope[name];

      // Create the new function.
      let newFunction = (...args) => {
        spiedFns.get(scope, name).record(args);
        return origFn.call(this, args);
      };
      newFunction.scope = scope;
      newFunction.fnName = name;

      spiedFns.put(scope, name);

      // Override the original function.
      scope[name] = newFunction;
    }
  },

  verify: function(target) {
    let spiedFn = spiedFns.get(target.scope, target.fnName);
    let record = spiedFn ? spiedFn.records : [];
    return (...args) => {
      let invocations = record.filter(recordedArgs => {
        return deepEqual(recordedArgs, args);
      });

      let called = function() {
        chai.expect(invocations).to.have.length.of.at.least(1);
      };
      called.times = function(number) {
        chai.expect(invocations).to.have.length.of(number);
      };

      return {called: called};
    };
  },

  /**
   * Restores the given function or recursively all functions in the given object to its original
   * implementation and removes all records related to it.
   *
   * @param  {Function} target The function or object to be reset.
   */
  reset: function(target) {
    if (target instanceof Function) {
      spiedFns.restore(target.scope, target.name);
    } else {
      // Go through every member of the object and resets it.
      for (let key in target) {
        this.reset(target[key]);
      }
    }
  }
};

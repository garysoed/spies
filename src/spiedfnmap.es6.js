import SpiedFn from 'src/spiedfn.es6';

var map = {};

export default class SpiedFnMap {
  /**
   * Gets the spied function given the scope and name.
   *
   * @param  {!Object} scope The object containing the spied function.
   * @param  {string} name The name of the function.
   * @return {SpiedFn} The spied function object, or undefined if not found.
   */
  get(scope, name) {
    if (!map[scope]) {
      return null;
    }
    if (!map[scope][name]) {
      return null;
    }

    return map[scope][name];
  };

  /**
   * Creates a new SpiedFn and keeps track of it.
   *
   * @param  {!Object} scope The object containing the function to be spied.
   * @param  {string} name The name of the spied function.
   *
   * @return {!SpiedFn} The newly created SpiedFn.
   */
  put(scope, name) {
    if (!map[scope]) {
      map[scope] = {};
    }
    // Keep track of the original function.
    map[scope][name] = new SpiedFn(scope, name);
    return map[scope][name];
  };

  /**
   * Restores the given function and removes it from the map.
   * @param  {!Object} scope The object containing the function to be spied.
   * @param  {string} name The name of the spied function.
   */
  restore(scope, name) {
    var spiedFn = this.get(scope, name);
    if (spiedFn) {
      spiedFn.restore();
      delete map[scope][name];
    }
  };
}
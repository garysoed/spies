/**
 * Static class to create various fake objects.
 *
 * @class Fakes
 * @static
 */
let Fakes = {

  /**
   * Creates a fake of the given constructor. The fake object's proto link will simply point to the
   * constructor's prototype.
   *
   * @method ofType
   * @param {!Function} ctor The constructor of the object to create a fake of.
   * @return {!Object} The fake object.
   */
  ofType(ctor) {
    return {
      __proto__: ctor.prototype
    }
  },

  /**
   * Creates a fake implementation of a NodeList.
   *
   * @method nodeList
   * @param {!Array} data Array that represents the data in the NodeList.
   * @return {!Object} A fake object mimicking a NodeList.
   */
  nodeList(data) {
    return {
      length: data.length,
      item(i) {
        return data[i];
      },
      __proto__: NodeList.prototype 
    };
  }
};

export default Fakes;

if (!window.spies) {
  window.spies = {};
}
window.spies.Fakes = Fakes;
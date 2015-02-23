/**
 * {{#crossLink "Spies"}}{{/crossLink}} watch over function calls. When writing unit tests, spy on
 * functions that you are interested in watching. For example:
 * ```javascript
 * // Source Code
 * IceCream = function() {};
 * IceCream.prototype.scoop = function() {};
 *
 * Person = function() {};
 * Person.prototype.iceCream = new IceCream();
 * Person.prototype.eatIceCream = function(amount) {
 *   iceCream.scoop(amount);
 * };
 *
 * // Test Code
 * var _ = spies.Spies;
 *
 * var person = new Person();
 * _.spy(person.iceCream, 'scoop');
 *
 * person.eatIceCream(2);
 *
 * expect(_.callCountOf(person.iceCream.scoop)(2)).to.be.equal(1);
 *
 * _.reset(); // Resets all spied functions.
 * ```
 *
 * To ignore any arguments, use {{#crossLink "Spies/anyCallCountOf:method"}}{{/crossLink}}:
 *
 * ```javascript
 * _.spy(person.iceCream, 'scoop');
 *
 * person.eatIceCream(1);
 * person.eatIceCream(3);
 *
 * expect(_.anyCallCountOf(person.iceCream.scoop)).to.be.equal(2);
 *
 * _.reset();
 * ```
 *
 * @class 2. Spies
 * @module tutorial
 */
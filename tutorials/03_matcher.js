/**
 * You can relax the matching condition by using {{#crossLink "matcher.Matcher"}}{{/crossLink}} objects:
 * ```javascript
 * var _M = spies.Matchers;
 *
 * _.spy(person.iceCream, 'scoop');
 *
 * person.eatIceCream(1);
 * person.eatIceCream('gallon');
 *
 * expect(_.callCountOf(person.iceCream.scoop)(Matchers.isA('number'))).to.be.equal(1);
 *
 * _.reset();
 * ```
 *
 * You can also get the matched arguments by getting the
 * {{#crossLink "matcher.Matcher/matchingArgs:property"}}{{/crossLink}} on the matcher object. This is
 * very useful for getting event handlers:
 *
 * ```javascript
 * // Source Code
 * var object = {
 *   fn: function() {};
 * };
 *
 * var handler = function() {
 *   object.fn();
 * };
 *
 * var f = function() {
 *   document.addEventHandler('click', handler);
 * };
 *
 *
 * // Test Code
 * var _ = spies.Spies;
 * var _M = spies.Matcher;
 *
 * var isAFunction = _M.isA(Function);
 * _.spy(object, 'fn');
 * _.spy(document, 'addEventHandler');
 *
 * f();
 *
 * expect(_.callCountOf(document.addEventHandler)('click', isAFunction)).to.be.equal(1);
 *
 * // Now call the handler.
 * isAFunction.matchingArgs[0]();
 * expect(_.callCountOf(object.fn)()).to.be.equal(1);
 * ```
 *
 * For more list of Matchers, go to the API section page.
 *
 * @class 3. Matchers
 */
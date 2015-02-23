/**
 * Spies comes with a Chai-expect plugin. To use it, HTML import the `main_chai_expect.html` file.
 *
 * Example of basic usage:
 * ```javascript
 * // Test code
 * var _ = spies.Spies;
 * _.spy(object, 'fn');
 *
 * object.fn(1);
 * object.fn();
 *
 * expect(object.fn).calledWith(1).at.least(1);
 * expect(object.fn).called().at.least(2);
 * ```
 *
 * Asserting order:
 * ```javascript
 * var _ = spies.Spies;
 * _.spy(object, 'fn');
 *
 * object.fn(1);
 * object.fn();
 *
 * expect(object.fn).calledWith(1).before(object.fn).calledWith();
 * expect(object.fn).called().before(object.fn).calledWith();
 * ```
 *
 * @class 5. Plugins
 */

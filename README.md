# Spies
A simple library to spy on functions and create stubs for unit testing. Yes, there are many 
libraries that do this out there, but they're all tied to a specific assertion framework. Spies is 
not tied to any assertion frameworks. You can use any assertion frameworks you want, though it comes
with a plugin for Chai expect (and possibly more in the future).

# Usage
To use this, HTML import the `main.html` file.

# Features
## Spies
Spies watch over function calls. When writing unit tests, spy on functions that you are interested
in watching. For example:

```javascript
/**
 * Source Code
 */
IceCream = function() {};
IceCream.prototype.scoop = function() {};

Person = function() {};
Person.prototype.iceCream = new IceCream();
Person.prototype.eatIceCream = function(amount) {
  iceCream.scoop(amount);
};

/**
 * Test Code
 */
var _ = spies.Spies;

var person = new Person();
_.spy(person.iceCream, 'scoop');

person.eatIceCream(2);

expect(_.callCountOf(person.iceCream.scoop)(2)).to.be.equal(1);

_.reset(); // Resets all spied functions.
```

To ignore any arguments, use `anyCallCountOf`:

```javascript
_.spy(person.iceCream, 'scoop');

person.eatIceCream(1);
person.eatIceCream(3);

expect(_.anyCallCountOf(person.iceCream.scoop)).to.be.equal(2);

_.reset();
```

## Matchers
You can relax the matching condition by using Matcher objects:
```javascript
var _M = spies.Matchers;

_.spy(person.iceCream, 'scoop');

person.eatIceCream(1);
person.eatIceCream('gallon');

expect(_.callCountOf(person.iceCream.scoop)(Matchers.isA('number'))).to.be.equal(1);

_.reset();
```

You can also get the matched arguments by calling `matchingArgs` on the matcher object. This is
very useful for getting event handlers:

```javascript
/**
 * Source Code
 */
var object = {
  fn: function() {};
};

var handler = function() {
  object.fn();
};

var f = function() {
  document.addEventHandler('click', handler);
};


/**
 * Test Code
 */
var _ = spies.Spies;
var _M = spies.Matcher;

var isAFunction = _M.isA(Function);
_.spy(object, 'fn');
_.spy(document, 'addEventHandler');

f();

expect(_.callCountOf(document.addEventHandler)('click', isAFunction)).to.be.equal(1);

// Now call the handler.
isAFunction.matchingArgs[0]();
expect(_.callCountOf(object.fn)()).to.be.equal(1);
```

For more list of Matchers, go to the [Matchers](https://github.com/garysoed/spies/wiki/Matchers) page.

## Fakes
Spies also comes with a convenience library to create fake objects. Look at [Fakes](https://github.com/garysoed/spies/wiki/Fakes) for more
documentations.

## Plugins
Spies comes with a Chai-expect plugin. To use it, HTML import the `main_chai_expect.html` file.

# Release History
- v 0.1.0
  - Initial release
- v 0.1.1
  - Updated docs
  - Switched to gulp

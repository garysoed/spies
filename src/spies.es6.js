import SpiedFn from 'src/spiedfn.es6';

var spiedFns = {};
function getSpiedFn(scope, name) {
  if (!spiedFns[scope]) {
    return null;
  }
  if (!spiedFns[scope][name]) {
    return null;
  }

  return spiedFns[scope][name];
};

function addSpiedFn(scope, name, fn) {
  if (!spiedFns[scope]) {
    spiedFns[scope] = {};
  }
  // Keep track of the original function.
  spiedFns[scope][name] = new SpiedFn(scope, name, fn);
};

function deleteSpiedFn(scope, name) {
  if (spiedFns[scope] && spiedFns[scope][name]) {
    delete spiedFns[scope][name];
  }
};


/**
 * Deep equals the two objects.
 * 
 * @param  {*} obj1 The first object to compare.
 * @param  {*} obj2 The second object to compare.
 * @return {boolean} True iff the two objects are deeply equal.
 * 
 * @static
 * @private
 */
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) {
    return true;
  }

  if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
    return obj1 === obj2;
  }

  if (obj1.equals instanceof Function) {
    return obj1.equals(obj2);
  }

  if (obj2.equals instanceof Function) {
    return obj2.equals(obj1);
  }

  if (obj1 instanceof Array && obj1.length !== obj2.length) {
    return false;
  }

  for (var key in obj1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}


function spyOnFunction(scope, name) {
  // We are spying on a function
  var origFn = scope[name];

  var newFunction = function() {
    var argArray = Array.prototype.slice.call(arguments);
    getSpiedFn(scope, name).record(argArray);
    return origFn.call(this, argArray);
  };
  newFunction.scope = scope;
  newFunction.fnName = name;

  addSpiedFn(scope, name, origFn);

  // Override the original function.
  scope[name] = newFunction;
};

function spyOnObject(object) {
  for (var key in object) {
    if (object[key] instanceof Function) {
      spyOnFunction(object, key);
    } else if (object[key] instanceof Object) {
      spyOnFunction(object[key]);
    }
  }
};


function resetSpiedFunction(target) {
  var spiedFn = getSpiedFn(target.scope, target.fnName);
  if (spiedFn) {
    spiedFn.restore();
  }
  
  deleteSpiedFn(target.scope, target.name);
};

function resetSpiedObject(object) {
  for (var key in object) {
    Spies.reset(object[key]);
  }
};

var Spies = {
  spy: function(scope, name) {
    if (name === undefined) {
      spyOnObject(scope);
    } else {
      spyOnFunction(scope, name);
    }
  },

  verify: function(target) {
    var spiedFn = getSpiedFn(target.scope, target.fnName);
    var record = spiedFn ? spiedFn.records : [];
    return function() {
      var argArray = Array.prototype.slice.call(arguments);
      var invocations = record.filter(args => deepEqual(args, argArray));

      var called = function() {
        chai.expect(invocations).to.have.length.of.at.least(1);
      };
      called.times = function(number) {
        chai.expect(invocations).to.have.length.of(number);
      };

      return {called: called};
    };
  },

  reset: function(target) {
    if (target instanceof Function) {
      resetSpiedFunction(target);
    } else {
      resetSpiedObject(target);
    }
  }
};

window.Spies = Spies;
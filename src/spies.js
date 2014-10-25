var $__src_95_spies__ = (function() {
  "use strict";
  var __moduleName = "src_spies";
  (function(exports) {
    var spiedFns = {};
    var getSpiedFn = function(scope, name) {
      if (!spiedFns[scope]) {
        return null;
      }
      if (!spiedFns[scope][name]) {
        return null;
      }
      return spiedFns[scope][name];
    };
    var addSpiedFn = function(scope, name, fn) {
      if (!spiedFns[scope]) {
        spiedFns[scope] = {};
      }
      spiedFns[scope][name] = new SpiedFn(scope, name, fn);
    };
    var deleteSpiedFn = function(scope, name) {
      if (spiedFns[scope] && spiedFns[scope][name]) {
        delete spiedFns[scope][name];
      }
    };
    var SpiedFn = function(scope, name, fn) {
      this.scope = scope;
      this.name = name;
      this.fn = fn;
      this.records = [];
    };
    SpiedFn.prototype.restore = function() {
      this.scope[this.name] = this.fn;
    };
    SpiedFn.prototype.record = function(args) {
      this.records.push(args);
    };
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
    var Record = function() {};
    var Spies = {};
    var spyOnFunction = function(scope, name) {
      var origFn = scope[name];
      var newFunction = function() {
        var argArray = Array.prototype.slice.call(arguments);
        getSpiedFn(scope, name).record(argArray);
        return origFn.call(this, argArray);
      };
      newFunction.scope = scope;
      newFunction.fnName = name;
      addSpiedFn(scope, name, origFn);
      scope[name] = newFunction;
    };
    var spyOnObject = function(object) {
      for (var key in object) {
        if (object[key] instanceof Function) {
          spyOnFunction(object, key);
        } else if (object[key] instanceof Object) {
          spyOnFunction(object[key]);
        }
      }
    };
    Spies.spy = function(scope, name) {
      if (name === undefined) {
        spyOnObject(scope);
      } else {
        spyOnFunction(scope, name);
      }
    };
    Spies.verify = function(target) {
      var spiedFn = getSpiedFn(target.scope, target.fnName);
      var record = spiedFn ? spiedFn.records : [];
      return function() {
        var argArray = Array.prototype.slice.call(arguments);
        var invocations = record.filter(function(args) {
          return deepEqual(args, argArray);
        });
        var called = function() {
          chai.expect(invocations).to.have.length.of.at.least(1);
        };
        called.times = function(number) {
          chai.expect(invocations).to.have.length.of(number);
        };
        return {called: called};
      };
    };
    var resetSpiedFunction = function(target) {
      var spiedFn = getSpiedFn(target.scope, target.fnName);
      if (spiedFn) {
        spiedFn.restore();
      }
      deleteSpiedFn(target.scope, target.name);
    };
    var resetSpiedObject = function(object) {
      for (var key in object) {
        Spies.reset(object[key]);
      }
    };
    Spies.reset = function(target) {
      if (target instanceof Function) {
        resetSpiedFunction(target);
      } else {
        resetSpiedObject(target);
      }
    };
    exports.Spies = Spies;
  })(window);
  return {};
})();

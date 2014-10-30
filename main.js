System.register("src/matcher/matcher", [], function() {
  "use strict";
  var __moduleName = "src/matcher/matcher";
  var Matcher = function Matcher() {
    this.matchingArgs = [];
  };
  ($traceurRuntime.createClass)(Matcher, {registerInvocation: function(arg) {
      if (this.matches(arg)) {
        this.matchingArgs.push(arg);
        return true;
      }
      return false;
    }}, {});
  var $__default = Matcher;
  ;
  return {get default() {
      return $__default;
    }};
});
System.register("src/matcher/isa", [], function() {
  "use strict";
  var __moduleName = "src/matcher/isa";
  var Matcher = System.get("src/matcher/matcher").default;
  var IsA = function IsA(expectedType) {
    $traceurRuntime.superCall(this, $IsA.prototype, "constructor", []);
    this.expectedType = expectedType;
  };
  var $IsA = IsA;
  ($traceurRuntime.createClass)(IsA, {matches: function(arg) {
      if (this.expectedType instanceof Function) {
        return arg instanceof this.expectedType;
      } else {
        return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === this.expectedType;
      }
    }}, {}, Matcher);
  var $__default = IsA;
  return {get default() {
      return $__default;
    }};
});
System.register("src/matcher/matchers", [], function() {
  "use strict";
  var __moduleName = "src/matcher/matchers";
  var IsA = System.get("src/matcher/isa").default;
  var $__default = {isA: function(expectedType) {
      return new IsA(expectedType);
    }};
  return {get default() {
      return $__default;
    }};
});
System.register("src/spiedfn", [], function() {
  "use strict";
  var __moduleName = "src/spiedfn";
  var _scope = Symbol();
  var _name = Symbol();
  var _origFn = Symbol();
  var _records = Symbol();
  var SpiedFn = function SpiedFn(scope, name) {
    var origFn = scope[$traceurRuntime.toProperty(name)];
    var f = function() {
      for (var args = [],
          $__1 = 0; $__1 < arguments.length; $__1++)
        args[$traceurRuntime.toProperty($__1)] = arguments[$traceurRuntime.toProperty($__1)];
      f.record(args);
      return origFn.apply(this, args);
    };
    f.__proto__ = $SpiedFn.prototype;
    f.constructor = $SpiedFn;
    f[$traceurRuntime.toProperty(_scope)] = scope;
    f[$traceurRuntime.toProperty(_name)] = name;
    f[$traceurRuntime.toProperty(_origFn)] = origFn;
    f.records = [];
    scope[$traceurRuntime.toProperty(name)] = f;
    return f;
  };
  var $SpiedFn = SpiedFn;
  ($traceurRuntime.createClass)(SpiedFn, {
    restore: function() {
      this[$traceurRuntime.toProperty(_scope)][$traceurRuntime.toProperty(this[$traceurRuntime.toProperty(_name)])] = this[$traceurRuntime.toProperty(_origFn)];
    },
    record: function(args) {
      this.records.push(args);
    }
  }, {}, Function);
  var $__default = SpiedFn;
  return {get default() {
      return $__default;
    }};
});
System.register("src/utils", [], function() {
  "use strict";
  var __moduleName = "src/utils";
  var Matcher = System.get("src/matcher/matcher").default;
  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) {
      return true;
    }
    if (obj1 instanceof Matcher) {
      return obj1.registerInvocation(obj2);
    }
    if (obj2 instanceof Matcher) {
      return obj2.registerInvocation(obj1);
    }
    if (!(obj1 instanceof Object) || !(obj2 instanceof Object)) {
      return obj1 === obj2;
    }
    if (obj1 instanceof Array && obj1.length !== obj2.length) {
      return false;
    }
    for (var key in obj1)
      if (!$traceurRuntime.isSymbolString(key)) {
        if (!deepEqual(obj1[$traceurRuntime.toProperty(key)], obj2[$traceurRuntime.toProperty(key)])) {
          return false;
        }
      }
    return true;
  }
  return {get deepEqual() {
      return deepEqual;
    }};
});
System.register("src/spies", [], function() {
  "use strict";
  var __moduleName = "src/spies";
  var SpiedFn = System.get("src/spiedfn").default;
  var deepEqual = System.get("src/utils").deepEqual;
  var $__default = {
    stub: function(ctor) {
      return {__proto__: ctor.prototype};
    },
    spy: function(scope, name) {
      if (name === undefined) {
        for (var key in scope)
          if (!$traceurRuntime.isSymbolString(key)) {
            if (scope[$traceurRuntime.toProperty(key)] instanceof Function) {
              this.spy(scope, key);
            } else if (scope[$traceurRuntime.toProperty(key)] instanceof Object) {
              this.spy(scope[$traceurRuntime.toProperty(key)]);
            }
          }
      } else {
        new SpiedFn(scope, name);
      }
    },
    callCountOf: function(target) {
      var record = target.records || [];
      return (function() {
        for (var args = [],
            $__2 = 0; $__2 < arguments.length; $__2++)
          args[$traceurRuntime.toProperty($__2)] = arguments[$traceurRuntime.toProperty($__2)];
        var invocations = record.filter((function(recordedArgs) {
          return deepEqual(recordedArgs, args);
        }));
        return invocations.length;
      });
    },
    reset: function(target) {
      if (target instanceof SpiedFn) {
        target.restore();
      } else if (target instanceof Function) {} else {
        for (var key in target)
          if (!$traceurRuntime.isSymbolString(key)) {
            this.reset(target[$traceurRuntime.toProperty(key)]);
          }
      }
    }
  };
  return {get default() {
      return $__default;
    }};
});
System.register("src/main", [], function() {
  "use strict";
  var __moduleName = "src/main";
  var Spies = System.get("src/spies").default;
  var Matchers = System.get("src/matcher/matchers").default;
  return {};
});
System.get("src/main" + '');

//# sourceMappingURL=main.map

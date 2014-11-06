var $__src_47_fakes__ = (function() {
  "use strict";
  var __moduleName = "src/fakes";
  var Fakes = {NodeList: function(data) {
      return {
        length: data.length,
        item: function(i) {
          return data[$traceurRuntime.toProperty(i)];
        }
      };
    }};
  var $__default = Fakes;
  if (!window.spies) {
    window.spies = {};
  }
  window.spies.Fakes = Fakes;
  return {get default() {
      return $__default;
    }};
})();
var $__src_47_matcher_47_matcher__ = (function() {
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
  if (window.TEST_MODE) {
    if (!window.spies) {
      window.spies = {};
    }
    window.spies.Matcher = Matcher;
  }
  return {get default() {
      return $__default;
    }};
})();
var $__src_47_matcher_47_any__ = (function() {
  "use strict";
  var __moduleName = "src/matcher/any";
  var Matcher = ($__src_47_matcher_47_matcher__).default;
  var Any = function Any() {
    $traceurRuntime.superCall(this, $Any.prototype, "constructor", []);
  };
  var $Any = Any;
  ($traceurRuntime.createClass)(Any, {matches: function() {
      return true;
    }}, {}, Matcher);
  var $__default = Any;
  return {get default() {
      return $__default;
    }};
})();
var $__src_47_matcher_47_isa__ = (function() {
  "use strict";
  var __moduleName = "src/matcher/isa";
  var Matcher = ($__src_47_matcher_47_matcher__).default;
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
})();
var $__src_47_matcher_47_matchers__ = (function() {
  "use strict";
  var __moduleName = "src/matcher/matchers";
  var IsA = ($__src_47_matcher_47_isa__).default;
  var Any = ($__src_47_matcher_47_any__).default;
  var Matchers = {
    isA: function(expectedType) {
      return new IsA(expectedType);
    },
    any: function() {
      return new Any();
    }
  };
  var $__default = Matchers;
  if (!window.spies) {
    window.spies = {};
  }
  window.spies.Matchers = Matchers;
  return {get default() {
      return $__default;
    }};
})();
var $__src_47_spiedfn__ = (function() {
  "use strict";
  var __moduleName = "src/spiedfn";
  var _scope = Symbol();
  var _name = Symbol();
  var _origFn = Symbol();
  var _records = Symbol();
  var SpiedFn = function SpiedFn(scope, name, callOriginal) {
    var origFn = scope[$traceurRuntime.toProperty(name)];
    var f = function() {
      for (var args = [],
          $__1 = 0; $__1 < arguments.length; $__1++)
        args[$traceurRuntime.toProperty($__1)] = arguments[$traceurRuntime.toProperty($__1)];
      f.record(args);
      if (callOriginal) {
        return origFn.apply(this, args);
      }
      return undefined;
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
  if (window.TEST_MODE) {
    if (!window.spies) {
      window.spies = {};
    }
    window.spies.SpiedFn = SpiedFn;
  }
  return {get default() {
      return $__default;
    }};
})();
var $__src_47_utils__ = (function() {
  "use strict";
  var __moduleName = "src/utils";
  var Matcher = ($__src_47_matcher_47_matcher__).default;
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
  if (window.TEST_MODE) {
    if (!window.spies) {
      window.spies = {};
    }
    window.spies.Utils = {deepEqual: deepEqual};
  }
  return {get deepEqual() {
      return deepEqual;
    }};
})();
var $__src_47_spies__ = (function() {
  "use strict";
  var __moduleName = "src/spies";
  var SpiedFn = ($__src_47_spiedfn__).default;
  var deepEqual = ($__src_47_utils__).deepEqual;
  var Spies = {
    stub: function(ctor) {
      return {__proto__: ctor.prototype};
    },
    spy: function(scope, name) {
      var callOriginal = arguments[2] !== (void 0) ? arguments[2] : true;
      if (name === undefined) {
        for (var key in scope)
          if (!$traceurRuntime.isSymbolString(key)) {
            if (scope[$traceurRuntime.toProperty(key)] instanceof Function) {
              this.spy(scope, key, callOriginal);
            } else if (scope[$traceurRuntime.toProperty(key)] instanceof Object) {
              this.spy(scope[$traceurRuntime.toProperty(key)], undefined, callOriginal);
            }
          }
      } else {
        new SpiedFn(scope, name, callOriginal);
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
    anyCallCountOf: function(target) {
      return target.records.length;
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
  var $__default = Spies;
  if (!window.spies) {
    window.spies = {};
  }
  window.spies.Spies = Spies;
  return {get default() {
      return $__default;
    }};
})();
var $__src_47_main__ = (function() {
  "use strict";
  var __moduleName = "src/main";
  var Fakes = ($__src_47_fakes__).default;
  var Spies = ($__src_47_spies__).default;
  var Matchers = ($__src_47_matcher_47_matchers__).default;
  return {};
})();

//# sourceMappingURL=main.map

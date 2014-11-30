var $__src_47_fakes__ = (function() {
  "use strict";
  var __moduleName = "src/fakes";
  var Fakes = {
    ofType: function(ctor) {
      return Object.setPrototypeOf({}, ctor.prototype);
    },
    nodeList: function(data) {
      return Object.setPrototypeOf({
        length: data.length,
        item: function(i) {
          return data[$traceurRuntime.toProperty(i)];
        }
      }, NodeList.prototype);
    }
  };
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
  var _expectedType = Symbol();
  var IsA = function IsA(expectedType) {
    $traceurRuntime.superCall(this, $IsA.prototype, "constructor", []);
    this[$traceurRuntime.toProperty(_expectedType)] = expectedType;
  };
  var $IsA = IsA;
  ($traceurRuntime.createClass)(IsA, {matches: function(arg) {
      if (this[$traceurRuntime.toProperty(_expectedType)] instanceof Function) {
        return arg instanceof this[$traceurRuntime.toProperty(_expectedType)];
      } else {
        return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === this[$traceurRuntime.toProperty(_expectedType)];
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
  var _callOriginal = Symbol();
  var _returnValue = Symbol();
  var SpiedFn = function SpiedFn(scope, name) {
    var $__0 = this;
    var origFn = scope ? scope[$traceurRuntime.toProperty(name)] : null;
    var f = Object.setPrototypeOf((function() {
      for (var args = [],
          $__2 = 0; $__2 < arguments.length; $__2++)
        args[$traceurRuntime.toProperty($__2)] = arguments[$traceurRuntime.toProperty($__2)];
      f.record(args);
      if (f[$traceurRuntime.toProperty(_callOriginal)]) {
        return origFn.apply($__0, args);
      }
      return f[$traceurRuntime.toProperty(_returnValue)];
    }), $SpiedFn.prototype);
    f.constructor = $SpiedFn;
    f[$traceurRuntime.toProperty(_scope)] = scope;
    f[$traceurRuntime.toProperty(_name)] = name;
    f[$traceurRuntime.toProperty(_origFn)] = origFn;
    f[$traceurRuntime.toProperty(_callOriginal)] = !!origFn;
    f[$traceurRuntime.toProperty(_returnValue)] = undefined;
    f.records = [];
    if (scope) {
      scope[$traceurRuntime.toProperty(name)] = f;
    }
    return f;
  };
  var $SpiedFn = SpiedFn;
  ($traceurRuntime.createClass)(SpiedFn, {
    restore: function() {
      if (this[$traceurRuntime.toProperty(_scope)]) {
        this[$traceurRuntime.toProperty(_scope)][$traceurRuntime.toProperty(this[$traceurRuntime.toProperty(_name)])] = this[$traceurRuntime.toProperty(_origFn)];
      }
    },
    record: function(args) {
      this.records.push(args);
    },
    overrideReturn: function(returnValue) {
      this[$traceurRuntime.toProperty(_callOriginal)] = false;
      this[$traceurRuntime.toProperty(_returnValue)] = returnValue;
      return this;
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
  var spiedFns = [];
  var Spies = {
    stub: function(target) {
      var source = (typeof target === 'function') ? target.prototype : target;
      var obj = Object.setPrototypeOf({}, source);
      for (var prop in source)
        if (!$traceurRuntime.isSymbolString(prop)) {
          if (typeof source[$traceurRuntime.toProperty(prop)] === 'function') {
            obj[$traceurRuntime.toProperty(prop)] = function() {};
          } else if ($traceurRuntime.typeof(source[$traceurRuntime.toProperty(prop)]) === 'object') {
            obj[$traceurRuntime.toProperty(prop)] = this.stub(source[$traceurRuntime.toProperty(prop)]);
          }
        }
      return obj;
    },
    spy: function(scope, name) {
      if (name === undefined) {
        for (var key in scope)
          if (!$traceurRuntime.isSymbolString(key)) {
            if (scope[$traceurRuntime.toProperty(key)] instanceof Function) {
              this.spy(scope, key);
            } else if (scope[$traceurRuntime.toProperty(key)] instanceof Object) {
              this.spy(scope[$traceurRuntime.toProperty(key)], undefined);
            }
          }
        return scope;
      } else {
        var spiedFn = new SpiedFn(scope, name);
        spiedFns.push(spiedFn);
        return spiedFn;
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
      if (!target) {
        spiedFns.forEach((function(spiedFn) {
          return spiedFn.restore();
        }));
        spiedFns = [];
      } else if (target instanceof SpiedFn) {
        target.restore();
        spiedFns.splice(spiedFns.indexOf(target), 1);
      } else if (target instanceof Function) {} else {
        for (var key in target)
          if (!$traceurRuntime.isSymbolString(key)) {
            this.reset(target[$traceurRuntime.toProperty(key)]);
          }
      }
    },
    spiedFunction: function() {
      var fn = new SpiedFn();
      spiedFns.push(fn);
      return fn;
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

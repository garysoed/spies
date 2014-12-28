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
    },
    attr: function(name, value) {
      return Object.setPrototypeOf({
        name: name,
        value: value
      }, Attr.prototype);
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
  var _MATCHING_ARGS = Symbol();
  var Matcher = function Matcher() {
    this[$traceurRuntime.toProperty(_MATCHING_ARGS)] = [];
  };
  ($traceurRuntime.createClass)(Matcher, {
    registerInvocation: function(arg) {
      if (this.matches(arg)) {
        this.matchingArgs.push(arg);
        return true;
      }
      return false;
    },
    get matchingArgs() {
      return this[$traceurRuntime.toProperty(_MATCHING_ARGS)];
    }
  }, {});
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
  var _EXPECTED_TYPE = Symbol();
  var IsA = function IsA(expectedType) {
    $traceurRuntime.superCall(this, $IsA.prototype, "constructor", []);
    this[$traceurRuntime.toProperty(_EXPECTED_TYPE)] = expectedType;
  };
  var $IsA = IsA;
  ($traceurRuntime.createClass)(IsA, {matches: function(arg) {
      if (this[$traceurRuntime.toProperty(_EXPECTED_TYPE)] instanceof Function) {
        return arg instanceof this[$traceurRuntime.toProperty(_EXPECTED_TYPE)];
      } else {
        return (typeof arg === 'undefined' ? 'undefined' : $traceurRuntime.typeof(arg)) === this[$traceurRuntime.toProperty(_EXPECTED_TYPE)];
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
  var _CALL_ORIGINAL = Symbol();
  var _NAME = Symbol();
  var _ORIG_FN = Symbol();
  var _RECORDS = Symbol();
  var _RETURN_VALUE = Symbol();
  var _SCOPE = Symbol();
  var timestamp = 0;
  var SpiedFn = function SpiedFn(scope, name) {
    var origFn = scope ? scope[$traceurRuntime.toProperty(name)] : null;
    var f = Object.setPrototypeOf(function() {
      for (var args = [],
          $__1 = 0; $__1 < arguments.length; $__1++)
        args[$traceurRuntime.toProperty($__1)] = arguments[$traceurRuntime.toProperty($__1)];
      f.record(args);
      if (f[$traceurRuntime.toProperty(_CALL_ORIGINAL)]) {
        return origFn.apply(this, args);
      }
      return f[$traceurRuntime.toProperty(_RETURN_VALUE)];
    }, $SpiedFn.prototype);
    f.constructor = $SpiedFn;
    f[$traceurRuntime.toProperty(_SCOPE)] = scope;
    f[$traceurRuntime.toProperty(_NAME)] = name;
    f[$traceurRuntime.toProperty(_ORIG_FN)] = origFn;
    f[$traceurRuntime.toProperty(_CALL_ORIGINAL)] = !!origFn;
    f[$traceurRuntime.toProperty(_RETURN_VALUE)] = undefined;
    f[$traceurRuntime.toProperty(_RECORDS)] = [];
    if (scope) {
      scope[$traceurRuntime.toProperty(name)] = f;
    }
    return f;
  };
  var $SpiedFn = SpiedFn;
  ($traceurRuntime.createClass)(SpiedFn, {
    restore: function() {
      if (this[$traceurRuntime.toProperty(_SCOPE)]) {
        this[$traceurRuntime.toProperty(_SCOPE)][$traceurRuntime.toProperty(this[$traceurRuntime.toProperty(_NAME)])] = this[$traceurRuntime.toProperty(_ORIG_FN)];
      }
    },
    record: function(args) {
      timestamp++;
      this.records.push({
        timestamp: timestamp,
        args: args
      });
    },
    overrideReturn: function(returnValue) {
      this[$traceurRuntime.toProperty(_CALL_ORIGINAL)] = false;
      this[$traceurRuntime.toProperty(_RETURN_VALUE)] = returnValue;
      return this;
    },
    get records() {
      return this[$traceurRuntime.toProperty(_RECORDS)];
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
    if (obj1 instanceof Function) {
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
      return (function() {
        for (var args = [],
            $__2 = 0; $__2 < arguments.length; $__2++)
          args[$traceurRuntime.toProperty($__2)] = arguments[$traceurRuntime.toProperty($__2)];
        return Spies.invocationsOf(target).apply(target, args).length;
      });
    },
    invocationsOf: function(target) {
      var records = target.records || [];
      return (function() {
        for (var args = [],
            $__2 = 0; $__2 < arguments.length; $__2++)
          args[$traceurRuntime.toProperty($__2)] = arguments[$traceurRuntime.toProperty($__2)];
        var invocations = records.filter((function(record) {
          return deepEqual(record.args, args);
        }));
        return invocations;
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

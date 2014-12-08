chai.use(function(chai, utils) {
  var FLAG_RECORD = 'record';
  var FLAG_BEFORE_TIME_OBJECT = 'before_time_obj';

  function compareBefore(prevInvocations, laterInvocations) {
    var earliestPrevInvocation = null;
    prevInvocations.forEach(function(invocation) {
      if (!earliestPrevInvocation || invocation.timestamp < earliestPrevInvocation.timestamp) {
        earliestPrevInvocation = invocation;
      }
    });

    var latestLaterInvocation = null;
    laterInvocations.forEach(function(invocation) {
      if (!latestLaterInvocation || invocation.timestamp > latestLaterInvocation.timestamp) {
        latestLaterInvocation = invocation;
      }
    });

    return chai.expect(earliestPrevInvocation.timestamp)
        .to.be.lessThan(latestLaterInvocation.timestamp);
  }

  function addFlag(obj, flag, value) {
    utils.flag(obj, flag, value);
    return obj;
  }

  utils.addMethod(chai.Assertion.prototype, 'calledWith', function() {
    var args = Array.prototype.slice.call(arguments, 0);

    if (utils.flag(this, FLAG_BEFORE_TIME_OBJECT)) {
      var laterObj = utils.flag(this, FLAG_BEFORE_TIME_OBJECT);
      var prevInvocations = utils.flag(this, FLAG_RECORD);
      var laterInvocations = Spies.invocationsOf(laterObj).apply(null, args);
      return compareBefore(prevInvocations, laterInvocations);
    } else {
      var obj = utils.flag(this, 'object'); 
      // Don't use Spies.callCountOf since it will double count the matcher.
      var invocations = Spies.invocationsOf(obj).apply(null, args);
      return addFlag(
          chai.expect(invocations.length),
          FLAG_RECORD, 
          invocations);
    }
  });

  utils.addMethod(chai.Assertion.prototype, 'called', function() {
    if (utils.flag(this, FLAG_BEFORE_TIME_OBJECT)) {
      var laterObj = utils.flag(this, FLAG_BEFORE_TIME_OBJECT);
      var prevInvocations = utils.flag(this, FLAG_RECORD);
      var laterInvocations = laterObj.records;
      return compareBefore(prevInvocations, laterInvocations);
    } else {
      var obj = utils.flag(this, 'object'); 
      return addFlag(
          chai.expect(Spies.anyCallCountOf(obj)),
          FLAG_RECORD, 
          obj.records);
    }
  });

  utils.addMethod(chai.Assertion.prototype, 'before', function() {
    var obj = arguments[0];
    utils.flag(this, FLAG_BEFORE_TIME_OBJECT, obj);
    return this;
  });
});
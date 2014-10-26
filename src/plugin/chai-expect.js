chai.use(function(chai, utils) {
  utils.addMethod(chai.Assertion.prototype, 'calledWith', function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = utils.flag(this, 'object'); 
    return expect(Spies.callCountOf(obj).apply(null, args));
  });
});
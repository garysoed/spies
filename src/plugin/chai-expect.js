chai.use(function(chai, utils) {
  utils.addMethod(chai.Assertion.prototype, 'calledWith', function() {
    var args = Array.prototype.slice.call(arguments, 0);
    var obj = utils.flag(this, 'object'); 
    return chai.expect(Spies.callCountOf(obj).apply(null, args));
  });

  utils.addMethod(chai.Assertion.prototype, 'called', function() {
    var obj = utils.flag(this, 'object'); 
    return chai.expect(Spies.anyCallCountOf(obj));
  });
});
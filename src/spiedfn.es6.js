export default class SpiedFn {
  constructor(scope, name, fn) {
    this.scope = scope;
    this.name = name;
    this.fn = fn;
    this.records = [];
  }

  restore() {
    this.scope[this.name] = this.fn;
  }

  record(args) {
    this.records.push(args);
  }
}

Function.prototype.subscribe = function(observable, context) {
    var ctx = context || this;
    var observer = {
        context: ctx,
        func: this
    };
    observable.observers.push(observer);
    return this;
};

module.exports = Function.prototype.subscribe;

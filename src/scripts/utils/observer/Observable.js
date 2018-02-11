Observable = function() {
    this.observers = [];
};

Observable.prototype.deliver =function(data) {
    for (var i in this.observers) {
        this.observers[i].func.call(this.observers[i].context, data);
    }
};

module.exports = Observable;



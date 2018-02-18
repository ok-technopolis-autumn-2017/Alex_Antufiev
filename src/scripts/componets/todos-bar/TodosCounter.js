function TodosCounterConstructor() {
}

TodosCounterConstructor.prototype.getNumOfActiveItems = function(todosArray) {
    let num = 0;

    for (let i = 0; i < todosArray.length; i++) {
        if (!todosArray[i].completed) {
            num++;
        }
    }

    return num + " items left";
};

TodosCounterConstructor.prototype.render = function (todosArray) {
    document.querySelector(".todos-actions_bar").innerHTML =
        this.getNumOfActiveItems(todosArray)
};

module.exports = new TodosCounterConstructor();
var TodosFilters = require('./TodosFilters');
var TodosCounter = require('./TodosCounter');

var TODOS_BAR = ".todos-actions_bar";

function TodosBarConstructor() {
}

var todosBarConstructorPrototype = TodosBarConstructor.prototype;

todosBarConstructorPrototype.todoBar = document.querySelector(TODOS_BAR);

todosBarConstructorPrototype.setVisibility = function (num) {
    if (num == 0) {
        todosBarConstructorPrototype.todoBar.style.display = "none"
    } else {
        todosBarConstructorPrototype.todoBar.style.display = "flex"
    }
};

todosBarConstructorPrototype.render = function (todosArray, currentFilter) {
    todosBarConstructorPrototype.setVisibility(todosArray.length);
     TodosFilters.render(currentFilter);
    TodosCounter.render(todosArray);
};

module.exports = new TodosBarConstructor();
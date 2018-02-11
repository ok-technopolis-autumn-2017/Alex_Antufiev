var subscribe = require('../utils/observer/subscribe');
var addTodosToModel = require('../modules/view-models/addTodosToModel');
var makeAllCompletedTodosToModel = require(
    '../modules/view-models/makeAllCompletedTodosToModel');
var toggleTodosToModel = require('../modules/view-models/toggleTodosToModel');
var deleteTodosToModel = require('../modules/view-models/deleteTodosToModel');
var setTodosFilterToModel = require(
    '../modules/view-models/setTodosFilterToModel');
var deleteAllCompletedTodosToModel = require(
    '../modules/view-models/deleteAllCompletedTodosToModel');

var AddTodos = require('./add-todos/AddTodos');
var TodosList = require('./todos_list/TodosList');
var TodosBar = require('./todos-bar/TodosBar');

function TodosContainerConstructor() {
    this.render.subscribe(addTodosToModel.onUpdateModel);
    this.render.subscribe(makeAllCompletedTodosToModel.onUpdateModel);
    this.render.subscribe(toggleTodosToModel.onUpdateModel);
    this.render.subscribe(deleteTodosToModel.onUpdateModel);
    this.render.subscribe(setTodosFilterToModel.onUpdateModel);
    this.render.subscribe(deleteAllCompletedTodosToModel.onUpdateModel);
}

var TodosContainerConstructorPrototype = TodosContainerConstructor.prototype;

TodosContainerConstructorPrototype.render = function (currentModel) {
    console.log(currentModel);
    AddTodos.setVisibility(currentModel.todosArray.length);
    TodosList.render(currentModel);
    TodosBar.render(currentModel.todosArray, currentModel.currentFilter);
};

module.exports = TodosContainerConstructor;
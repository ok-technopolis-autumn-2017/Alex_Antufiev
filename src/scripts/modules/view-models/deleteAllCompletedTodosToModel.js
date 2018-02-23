var Observable = require('../../utils/observer/Observable');
var subscribe = require('../../utils/observer/subscribe');
var TodosDeleteAllCompletedButton = require(
    '../../componets/todos-bar/TodosDeleteAllCompletedButton');
var ActionsTypes =require('../../constants/ActionsTypes');

function deleteAllCompletedTodosToModel() {
    this.getNewModelState.subscribe(TodosDeleteAllCompletedButton.onChange)
}

var deleteAllCompletedTodosToModelPrototype
    = deleteAllCompletedTodosToModel.prototype;

deleteAllCompletedTodosToModelPrototype.model = require('../model/Model');

deleteAllCompletedTodosToModelPrototype.onUpdateModel = new Observable();

deleteAllCompletedTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.DELETE_ALL_COMPLETED_TODOS) == 0) {
        var currentModel = deleteAllCompletedTodosToModelPrototype
            .model.deleteAllCompletedItems();

        deleteAllCompletedTodosToModelPrototype
            .onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new deleteAllCompletedTodosToModel();
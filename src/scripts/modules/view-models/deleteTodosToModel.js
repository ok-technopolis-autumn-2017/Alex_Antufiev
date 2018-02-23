var Observable = require('../../utils/observer/Observable');
var subscribe = require('../../utils/observer/subscribe');
var TodosList = require('../../componets/todos_list/TodosList');
var ActionsTypes =require('../../constants/ActionsTypes');

function deleteTodosToModel() {
    this.getNewModelState.subscribe(TodosList.onChange);
}

var deleteTodosToModelPrototype = deleteTodosToModel.prototype;

deleteTodosToModelPrototype.model = require('../model/Model');

deleteTodosToModelPrototype.onUpdateModel = new Observable();

deleteTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.DELETE_TODOS) == 0) {
        var currentModel = deleteTodosToModelPrototype
            .model.deleteItem(value.id);
        deleteTodosToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new deleteTodosToModel();
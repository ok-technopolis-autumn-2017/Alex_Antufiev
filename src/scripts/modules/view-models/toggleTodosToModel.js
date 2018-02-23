var Observable = require('../../utils/observer/Observable');
var subscribe = require('../../utils/observer/subscribe');
var TodosList = require('../../componets/todos_list/TodosList');
var ActionsTypes =require('../../constants/ActionsTypes');

function toggleTodosToModel() {
    this.getNewModelState.subscribe(TodosList.onChange);
}

var toggleTodosToModelPrototype = toggleTodosToModel.prototype;

toggleTodosToModelPrototype.model = require('../model/Model');

toggleTodosToModelPrototype.onUpdateModel = new Observable();

toggleTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.TOGGLE_TODOS) == 0) {
        var currentModel = toggleTodosToModelPrototype
            .model.toggleItem(value.id);
        toggleTodosToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new toggleTodosToModel();
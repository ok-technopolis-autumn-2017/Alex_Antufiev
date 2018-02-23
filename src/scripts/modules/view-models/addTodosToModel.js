var Observable = require('../../utils/observer/Observable');
var subscribe = require('../../utils/observer/subscribe');
var AddTodos = require('../../componets/add-todos/AddTodos');
var FilterTypes = require('../../constants/FilterTypes');
var ActionsTypes =require('../../constants/ActionsTypes');

function addTodosToModel() {
    this.getNewModelState.subscribe(AddTodos.onChange);
}

var addTodosToModelPrototype = addTodosToModel.prototype;

addTodosToModelPrototype.model = require('../model/Model');

addTodosToModelPrototype.onUpdateModel = new Observable();

addTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.ADD_TODOS) == 0) {
        var currentModel = addTodosToModelPrototype.model.addTodos({
            "todosItem": {
                "id": value.id,
                "text": value.text,
                "completed": false
            }
        });

        addTodosToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new addTodosToModel();
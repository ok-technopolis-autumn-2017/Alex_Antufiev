var model = require('./modules/model/Model');
var TodosContainer = require('./componets/TodosContainer');
var FilterTypes = require('./constants/FilterTypes');

function init() {
    if (model.isEmpty()) {
        model.addTodos({
            "todosFilter": FilterTypes.FILTER_ALL
        })
    }

    new TodosContainer().render(model.getModel())
}

document.addEventListener('DOMContentLoaded', init);


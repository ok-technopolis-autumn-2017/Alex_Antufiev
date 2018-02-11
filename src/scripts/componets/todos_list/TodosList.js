var TodosItem = require('./TodosItem');
var Observable = require('../../utils/observer/Observable');
var ActionsTypes = require('../../constants/ActionsTypes');

var TODOS_LIST = ".todos-list";

var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME =
    ["todos-item_done-mark", "todos-item_undone-mark"];


function TodosListConstructor() {
    this.todosList.addEventListener('click', this.handlerClick);
}

function deleteDeletedNodes(parent, ids) {
    var childrens = parent.children;
    var removeChildren = [];
    var i, j, flag;

    for (i = 0; i < childrens.length; i++) {
        flag = true;
        for (j = 0; j < ids.length; j++) {
            if (childrens[i].id == ids[j]) {
                flag = false;
                break;
            }
        }

        if (flag) {
            removeChildren.push(childrens[i])
        }

        flag = true
    }
    
    for (i = 0; i < removeChildren.length; i++) {
        parent.removeChild(removeChildren[i])
    }
    i = null;
}

var todosListConstructorPrototype = TodosListConstructor.prototype;

todosListConstructorPrototype.todosList = document.querySelector(TODOS_LIST);

todosListConstructorPrototype.onChange = new Observable();

todosListConstructorPrototype.handlerClick = function (event) {
    switch (event.target.className) {
        case TODOS_CHECKBOX_CLASS_NAME[0]:
        case TODOS_CHECKBOX_CLASS_NAME[1]: {
            todosListConstructorPrototype.onChange.deliver({
                "type": ActionsTypes.TOGGLE_TODOS,
                "id": event.target.parentNode.parentNode.id
            })
        } break;

        case TODOS_DELETE_BUTTON_CLASS_NAME: {
            todosListConstructorPrototype.onChange.deliver({
                "type": ActionsTypes.DELETE_TODOS,
                "id": event.target.parentNode.parentNode.id
            })
        } break;
    }
};

todosListConstructorPrototype.render = function (currentModel) {
    currentModel.todosArray.forEach(function (currentItemProps, i, array) {
        var TodosItemNode = document.getElementById(currentItemProps.id);

        if (TodosItemNode === null) {

            var newTodosItem = TodosItem.render(currentItemProps,
                currentModel.currentFilter);

            todosListConstructorPrototype.todosList.appendChild(newTodosItem)

            newTodosItem = null;


        } else {

            TodosItem.update(currentItemProps, currentModel.currentFilter,
                TodosItemNode);

        }
    });

    var curIds = currentModel.todosArray.map(function (item) {
        return item.id;
    });

    deleteDeletedNodes(todosListConstructorPrototype.todosList, curIds);

    curIds = null;
};


module.exports = new TodosListConstructor();
var FilterTypes = require('../../constants/FilterTypes')

function TodosItemConstructor() {
}

function setVisibility(currentFilter, completed) {
    switch (currentFilter) {
        case FilterTypes.FILTER_ALL: {
            return "flex"
        }
            break;

        case FilterTypes.FILTER_ACTIVE: {
            return (completed) ?
                "none" : "flex"
        }
            break;

        case FilterTypes.FILTER_COMPLETED : {
            return (!completed) ?
                "none" : "flex"
        }
            break;

        default: {
            return {
                display: "flex"
            };
        }
    }
}

var todosItemConstructorPrototype = TodosItemConstructor.prototype;

todosItemConstructorPrototype.update = function (props, currentFilter, TodosItemNode) {
    TodosItemNode.className = (!props.completed)
        ? "todos-list_item" :
        "todos-list_item __done";

    TodosItemNode.style.display = setVisibility(currentFilter, props.completed);

    TodosItemNode.childNodes[0].className = (!props.completed)
        ? "todos-list_item-unready-w todos-list_item-checkbox" :
        "todos-list_item-ready-w todos-list_item-checkbox";

    TodosItemNode.childNodes[0].childNodes[0].className = (!props.completed)
        ? "todos-list_item-unready-visual" :
        "todos-list_item-ready-visual";

    TodosItemNode.childNodes[0].childNodes[1].className = (!props.completed)
        ? "todos-list_item-unready"
        : "todos-list_item-ready";

    TodosItemNode.childNodes[2].style.textDecoration = (!props.completed)
        ? "none"
        : "line-through";

    if (!props.completed) {
        TodosItemNode.childNodes[0].childNodes[1].removeAttribute("checked");
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("aria-label", "mark unready");
    } else {
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("checked", "checked");
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("aria-label", "mark ready");
    }

};

todosItemConstructorPrototype.render = function (props, currentFilter) {
    var newListEl = document.createElement("div");

    newListEl.className = (!props.completed)
        ? "todos-list_item" :
        "todos-list_item __done";

    newListEl.setAttribute("id", props.id);

    newListEl.style.display = setVisibility(currentFilter, props.completed);

    /**
     * first child
     */
    var newListElChild = document.createElement("div");
    newListElChild.className = (!props.completed)
        ? "todos-list_item-unready-w todos-list_item-checkbox" :
        "todos-list_item-ready-w todos-list_item-checkbox";

    //1 child of first child
    var newListElChildChild = document.createElement("div");
    newListElChildChild.className = (!props.completed)
        ? "todos-list_item-unready-visual" :
        "todos-list_item-ready-visual";
    newListElChild.appendChild(newListElChildChild);

    //2 child of first child
    newListElChildChild = document.createElement("input");
    newListElChildChild.className = (!props.completed)
        ? "todos-list_item-unready" :
        "todos-list_item-ready";
    newListElChildChild.setAttribute("type", "checkbox");
    if (!props.completed) {
        newListElChildChild.removeAttribute("checked");
        newListElChildChild.setAttribute("aria-label", "mark unready");
    } else {
        newListElChildChild.setAttribute("checked", "checked");
        newListElChildChild.setAttribute("aria-label", "mark ready");
    }

    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    /**
     * Second child
     */
    newListElChild = document.createElement("button");
    newListElChild.className = "todos-list_item-remove";
    newListElChild.setAttribute("aria-label", "remove item");

    newListEl.appendChild(newListElChild);

    /**
     * Third child
     */
    newListElChild = document.createElement("div");
    newListElChild.className = "todos-list_item-name";

    //1 of third child
    newListElChild.innerHTML = props.text;

    newListEl.appendChild(newListElChild);

    return newListEl;
};


module.exports = new TodosItemConstructor();
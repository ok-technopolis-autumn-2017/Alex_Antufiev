var FilterTypes = require('../../constants/FilterTypes')

function TodosItemConstructor() {}

function setVisibility(currentFilter, completed) {
    switch (currentFilter) {
        case FilterTypes.FILTER_ALL: {
            return "block"
        } break;

        case FilterTypes.FILTER_ACTIVE: {
            return (completed) ?
                  "none" : "block"
        } break;

        case FilterTypes.FILTER_COMPLETED : {
            return (!completed) ?
                "none" : "block"
        } break;

        default: {
            return {
                display: "block"
            };
        }
    }
}

var todosItemConstructorPrototype = TodosItemConstructor.prototype;

todosItemConstructorPrototype.update = function (props, currentFilter, TodosItemNode) {
    TodosItemNode.className = (!props.completed)
        ? "todos-item":
        "todos-item __done";

    TodosItemNode.style.display = setVisibility(currentFilter, props.completed);

    TodosItemNode.childNodes[0].className = (!props.completed)
        ? "todos-item_undone-mark-w todos-item_belonging-checkbox":
        "todos-item_done-mark-w todos-item_belonging-checkbox";

    TodosItemNode.childNodes[0].childNodes[0].className = (!props.completed)
        ? "todos-item_undone-mark-icon":
        "todos-item_done-mark-icon";

    TodosItemNode.childNodes[0].childNodes[1].className = (!props.completed)
        ? "todos-item_undone-mark":
        "todos-item_done-mark";

    if (!props.completed) {
        TodosItemNode.childNodes[0].childNodes[1].removeAttribute("checked");
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("aria-label", "mark undone");
    } else {
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("checked", "checked");
        TodosItemNode.childNodes[0].childNodes[1].setAttribute("aria-label", "mark done");
    }

};

todosItemConstructorPrototype.render = function(props, currentFilter) {
    var newListEl = document.createElement("div");

    newListEl.className = (!props.completed)
        ? "todos-item":
        "todos-item __done";

    newListEl.setAttribute("id", props.id);

    newListEl.style.display = setVisibility(currentFilter, props.completed);

    /**
     * first child
     */
    var newListElChild = document.createElement("div");
    newListElChild.className = (!props.completed)
        ? "todos-item_undone-mark-w todos-item_belonging-checkbox":
        "todos-item_done-mark-w todos-item_belonging-checkbox";

    //1 child of first child
    var newListElChildChild = document.createElement("div");
    newListElChildChild.className = (!props.completed)
        ? "todos-item_undone-mark-icon":
        "todos-item_done-mark-icon";
    newListElChild.appendChild(newListElChildChild);

    //2 child of first child
    newListElChildChild = document.createElement("input");
    newListElChildChild.className = (!props.completed)
        ? "todos-item_undone-mark":
        "todos-item_done-mark";
    newListElChildChild.setAttribute("type", "checkbox");
    if (!props.completed) {
        newListElChildChild.removeAttribute("checked");
        newListElChildChild.setAttribute("aria-label", "mark undone");
    } else {
        newListElChildChild.setAttribute("checked", "checked");
        newListElChildChild.setAttribute("aria-label", "mark done");
    }

    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    /**
     * Second child
     */
    newListElChild = document.createElement("div");
    newListElChild.className = "todos-item_delete-w";

    //1 of second child
    newListElChildChild = document.createElement("div");
    newListElChildChild.className = "todos-item_delete_icon";
    newListElChild.appendChild(newListElChildChild);

    //2 of second child
    newListElChildChild = document.createElement("button");
    newListElChildChild.className = "todos-item_delete";
    newListElChildChild.setAttribute("aria-label", "delete item");
    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    /**
     * Third child
     */
    newListElChild = document.createElement("div");
    newListElChild.className = "todos-item_name-w";

    //1 of third child
    newListElChildChild = document.createElement("textarea");
    newListElChildChild.className = "todos-item_name";
    newListElChildChild.value = props.text;
    newListElChild.appendChild(newListElChildChild);

    newListEl.appendChild(newListElChild);

    return newListEl;

};


module.exports = new TodosItemConstructor();
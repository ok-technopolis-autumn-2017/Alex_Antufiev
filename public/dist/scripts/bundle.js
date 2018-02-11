/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

Observable = function() {
    this.observers = [];
};

Observable.prototype.deliver =function(data) {
    for (var i in this.observers) {
        this.observers[i].func.call(this.observers[i].context, data); //функция теперь вызывается в нужном контексте
    }
};

module.exports = Observable;




/***/ }),
/* 1 */
/***/ (function(module, exports) {

var CONSTS = {
    "ADD_TODOS": 'ADD_TODOS',
    "TOGGLE_TODOS": 'TOGGLE_TODOS',
    "DELETE_TODOS": 'DELETE_TODOS',
    "MAKE_ALL_COMPLETED_TODOS": 'MAKE_ALL_COMPLETED_TODOS',
    "DELETE_ALL_COMPLETED_TODOS": 'DELETE_ALL_COMPLETED_TODOS',
    "SET_VISIBILITY_FILTER": 'SET_VISIBILITY_FILTER'
};

module.exports = CONSTS;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

var DataStorage = __webpack_require__(9);

var Model = {
    "storage": new DataStorage(),

    "getModel": function () {
        return this.storage.getLocalStorage("todos")
    },

    "addTodos": function (value) {
        this.storage.setLocalStorage(value);
        return this.storage.getLocalStorage("todos")
    },

    "isEmpty": function () {
        return this.storage.isLocalStorageEmpty()
    },

    "makeAllCompleted": function () {
        this.storage.makeAllCompletedLocalStorage();
        return this.storage.getLocalStorage("todos");
    },

    "toggleItem" : function (id) {
        this.storage.toggleTodosLocalStorage(id);
        return this.storage.getLocalStorage("todos");
    },

    "deleteItem": function (id) {
        this.storage.deleteTodosLocalStorage(id);
        return this.storage.getLocalStorage("todos");
    },

    "deleteAllCompletedItems": function () {
        this.storage.deleteAllCompletedTodosLocalStorage();
        return this.storage.getLocalStorage("todos");
    }
}

module.exports = Model;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

Function.prototype.subscribe = function(observable, context) {
    var ctx = context || this; //если контекст вызова не задан, то контекстом считается this «по-умолчанию», то есть текущая функция
    var observer = { //теперь наблюдатель будет сообщать, в каком контексте нужно вызвать функцию
        context: ctx,
        func: this
    };
    observable.observers.push(observer);
    return this;
};

module.exports = Function.prototype.subscribe;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

var CONSTS = {
    "FILTER_ALL": 'todos-filter __all',
    "FILTER_COMPLETED": 'todos-filter __completed',
    "FILTER_ACTIVE": 'todos-filter __active'
};

module.exports = CONSTS;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var ActionsTypes = __webpack_require__(1);

var TODOS_ADD_INPUT = ".todos-add_new-item";
var TODOS_MAKE_ALL_COMPLETED_BUTTON = ".todos-add_select-all";
var ENTER_KEY_CODE = 13;

function AddTodosConstructor() {
    this.todosAddInput.addEventListener('keypress', this.handlerKeyPress);
    this.todosDelButton.addEventListener('click', this.handlerClick);
}

var addTodosConstructorPrototype = AddTodosConstructor.prototype;

addTodosConstructorPrototype.todosAddInput = document.querySelector(TODOS_ADD_INPUT);

addTodosConstructorPrototype.todosDelButton = document.querySelector(TODOS_MAKE_ALL_COMPLETED_BUTTON);

addTodosConstructorPrototype.onChange = new Observable();

addTodosConstructorPrototype.setVisibility = function (numTodoItems) {
    if (numTodoItems == 0) {
        this.todosDelButton.style.visibility = "hidden";
    } else {
        this.todosDelButton.style.visibility = "visible";
    }
};

addTodosConstructorPrototype.handlerKeyPress = function (event) {
    if (event.keyCode == ENTER_KEY_CODE) {
        addTodosConstructorPrototype.onChange.deliver({
            "type": ActionsTypes.ADD_TODOS,
            "id": new Date().getTime(),
            "text": this.value
        });
        this.value = '';
    }
};

addTodosConstructorPrototype.handlerClick = function (event) {
    addTodosConstructorPrototype.onChange.deliver({
        "type": ActionsTypes.MAKE_ALL_COMPLETED_TODOS
    });
};

module.exports = new AddTodosConstructor();

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var TodosItem = __webpack_require__(14);
var Observable = __webpack_require__(0);
var ActionsTypes = __webpack_require__(1);

var TODOS_LIST = ".todos-list";

var TODOS_DELETE_BUTTON_CLASS_NAME = "todos-item_delete";
var TODOS_CHECKBOX_CLASS_NAME = ["todos-item_done-mark", "todos-item_undone-mark"];


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

            var newTodosItem = TodosItem.render(currentItemProps, currentModel.currentFilter);

            todosListConstructorPrototype.todosList.appendChild(newTodosItem)

            newTodosItem = null;


        } else {

            TodosItem.update(currentItemProps, currentModel.currentFilter, TodosItemNode);

        }
    });

    var curIds = currentModel.todosArray.map(function (item) {
        return item.id;
    });

    deleteDeletedNodes(todosListConstructorPrototype.todosList, curIds);

    curIds = null;
};


module.exports = new TodosListConstructor();

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var ActionsTypes = __webpack_require__(1);
var FilterTypes = __webpack_require__(4);

var TODOS_FILTERS_CLASS = ".todos-filters"

function TodosFiltersConstructor() {
    this.todosDelButton.addEventListener('click', this.handlerClick);
}

var todosFiltersConstructorPrototype = TodosFiltersConstructor.prototype;

todosFiltersConstructorPrototype.todosDelButton = document.querySelector(TODOS_FILTERS_CLASS);

todosFiltersConstructorPrototype.onChange = new Observable();

todosFiltersConstructorPrototype.setFocus = function (currentFilter, choosenFilter, type) {
    switch (choosenFilter) {
        case FilterTypes.FILTER_ALL: {
            if (currentFilter.localeCompare(FilterTypes.FILTER_ALL) == 0) {
                if (type = "b") {
                    return '2px solid #efefef'
                } else {
                    return '2px'
                }
            } else {
                if (type = "b") {
                    return '2px solid #fff'
                } else {
                    return '2px'
                }
            }
        } break;

        case (FilterTypes.FILTER_ACTIVE): {

            if (currentFilter.localeCompare(FilterTypes.FILTER_ACTIVE) == 0) {
                if (type = "b") {
                    return '2px solid #efefef'
                } else {
                    return '2px'
                }
            } else {
                if (type = "b") {
                    return '2px solid #fff'
                } else {
                    return '2px'
                }
            }
        } break;

        case (FilterTypes.FILTER_COMPLETED): {
            if (currentFilter.localeCompare(FilterTypes.FILTER_COMPLETED) == 0) {
                if (type = "b") {
                    return '2px solid #efefef'
                } else {
                    return '2px'
                }
            } else {
                if (type = "b") {
                    return '2px solid #fff'
                } else {
                    return '2px'
                }
            }
        } break;
    }
};

todosFiltersConstructorPrototype.handlerClick = function (event) {
    if (event.target.className.localeCompare(FilterTypes.FILTER_COMPLETED) == 0 ||
        event.target.className.localeCompare(FilterTypes.FILTER_ACTIVE) == 0||
        event.target.className.localeCompare(FilterTypes.FILTER_ALL) == 0) {
        todosFiltersConstructorPrototype.onChange.deliver({
            "type": ActionsTypes.SET_VISIBILITY_FILTER,
            "filter": event.target.className
        });
    }
};

todosFiltersConstructorPrototype.render = function (currentFilter) {
    document.getElementsByClassName(FilterTypes.FILTER_ALL)[0].style.border =
            todosFiltersConstructorPrototype.setFocus(currentFilter, FilterTypes.FILTER_ALL, "b");
    document.getElementsByClassName(FilterTypes.FILTER_ACTIVE)[0].style.border =
        todosFiltersConstructorPrototype.setFocus(currentFilter, FilterTypes.FILTER_ACTIVE, "b");
    document.getElementsByClassName(FilterTypes.FILTER_COMPLETED)[0].style.border =
        todosFiltersConstructorPrototype.setFocus(currentFilter, FilterTypes.FILTER_COMPLETED, "b");
    document.getElementsByClassName(FilterTypes.FILTER_ALL)[0].style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter, FilterTypes.FILTER_ALL, "br");
    document.getElementsByClassName(FilterTypes.FILTER_ACTIVE)[0].style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter, FilterTypes.FILTER_ACTIVE, "br");
    document.getElementsByClassName(FilterTypes.FILTER_COMPLETED)[0].style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter, FilterTypes.FILTER_COMPLETED, "br");

};

module.exports = new TodosFiltersConstructor();

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var model = __webpack_require__(2);
var TodosContainer = __webpack_require__(10);
var FilterTypes = __webpack_require__(4);

function init() {
    if (model.isEmpty()) {
        model.addTodos({
            "todosFilter": FilterTypes.FILTER_ALL
        })
    }

    new TodosContainer().render(model.getModel())
}

document.addEventListener('DOMContentLoaded', init);



/***/ }),
/* 9 */
/***/ (function(module, exports) {

function DataStorageConstructor() {}

var dataStorageConstructorPrototype = DataStorageConstructor.prototype;

dataStorageConstructorPrototype.getLocalStorage = function (key) {
    return JSON.parse(localStorage.getItem(key));
};

dataStorageConstructorPrototype.setLocalStorage = function (value) {
    var todosStructure;

    if (localStorage.length === 0) {
        if (value.todosItem === undefined) {
            todosStructure = {
                "todosArray": [],
                "currentFilter": value.todosFilter
            }
        } else {
            todosStructure = {
                "todosArray": [value.todosItem],
                "currentFilter": value.todosFilter
            }
        }
    } else {
        todosStructure = this.getLocalStorage("todos");
        if (value.todosItem !== undefined) {
            todosStructure.todosArray.push(value.todosItem);
        }

        if (value.todosFilter !== undefined) {
            todosStructure.currentFilter = value.todosFilter;
        }
    }

    try {
        localStorage.setItem("todos", JSON.stringify(todosStructure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    todosStructure = null;
};

dataStorageConstructorPrototype.isLocalStorageEmpty = function () {
    var structure = this.getLocalStorage("todos");

    return (structure === null);

};

dataStorageConstructorPrototype.makeAllCompletedLocalStorage = function () {
    var structure = this.getLocalStorage("todos");

    structure.todosArray = structure.todosArray.map(function (todosItem) {
        return {
            "id": todosItem.id,
            "text": todosItem.text,
            "completed": true
        }
    });

    try {
        localStorage.setItem("todos", JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

dataStorageConstructorPrototype.toggleTodosLocalStorage = function(id) {
    var structure = this.getLocalStorage("todos");

    structure.todosArray = structure.todosArray.map(function (todosItem) {
        if (todosItem.id == id) {
            return {
                "id": todosItem.id,
                "text": todosItem.text,
                "completed": !todosItem.completed
            }
        }

        return todosItem
    });

    try {
        localStorage.setItem("todos", JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

dataStorageConstructorPrototype.deleteTodosLocalStorage = function(id) {
    var structure = this.getLocalStorage("todos");

    structure.todosArray = structure.todosArray.filter(function (todosItem) {
        if (todosItem.id == id) {
            return false
        }

        return true
    });

    try {
        localStorage.setItem("todos", JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

dataStorageConstructorPrototype.deleteAllCompletedTodosLocalStorage = function() {
    var structure = this.getLocalStorage("todos");

    structure.todosArray = structure.todosArray.filter(function (todosItem) {
        if (todosItem.completed) {
            return false
        }

        return true
    });

    try {
        localStorage.setItem("todos", JSON.stringify(structure));
    } catch (e) {
        if (e == QUOTA_EXCEEDED_ERR) {
            alert('Sorry')
        }
    }

    structure = null;
};

module.exports = DataStorageConstructor;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var subscribe = __webpack_require__(3);
var addTodosToModel = __webpack_require__(11);
var makeAllCompletedTodosToModel = __webpack_require__(12);
var toggleTodosToModel = __webpack_require__(13);
var deleteTodosToModel = __webpack_require__(15);
var setTodosFilterToModel = __webpack_require__(16);
var deleteAllCompletedTodosToModel = __webpack_require__(17);

var AddTodos = __webpack_require__(5);
var TodosList = __webpack_require__(6);
var TodosBar = __webpack_require__(19);

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

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var subscribe = __webpack_require__(3);
var AddTodos = __webpack_require__(5);
var FilterTypes = __webpack_require__(4);
var ActionsTypes =__webpack_require__(1);

function addTodosToModel() {
    this.getNewModelState.subscribe(AddTodos.onChange);
}

var addTodosToModelPrototype = addTodosToModel.prototype;

addTodosToModelPrototype.model = __webpack_require__(2);

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

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var subscribe = __webpack_require__(3);
var AddTodos = __webpack_require__(5);
var ActionsTypes =__webpack_require__(1);

function makeAllCompletedTodosToModel() {
    this.getNewModelState.subscribe(AddTodos.onChange)
}

var makeAllCompletedTodosToModelPrototype = makeAllCompletedTodosToModel.prototype;

makeAllCompletedTodosToModelPrototype.model = __webpack_require__(2);

makeAllCompletedTodosToModelPrototype.onUpdateModel = new Observable();

makeAllCompletedTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.MAKE_ALL_COMPLETED_TODOS) == 0) {
        var currentModel = makeAllCompletedTodosToModelPrototype.model.makeAllCompleted();

        makeAllCompletedTodosToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new makeAllCompletedTodosToModel();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var subscribe = __webpack_require__(3);
var TodosList = __webpack_require__(6);
var ActionsTypes =__webpack_require__(1);

function toggleTodosToModel() {
    this.getNewModelState.subscribe(TodosList.onChange);
}

var toggleTodosToModelPrototype = toggleTodosToModel.prototype;

toggleTodosToModelPrototype.model = __webpack_require__(2);

toggleTodosToModelPrototype.onUpdateModel = new Observable();

toggleTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.TOGGLE_TODOS) == 0) {
        var currentModel = toggleTodosToModelPrototype.model.toggleItem(value.id);
        toggleTodosToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new toggleTodosToModel();

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var FilterTypes = __webpack_require__(4)

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

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var subscribe = __webpack_require__(3);
var TodosList = __webpack_require__(6);
var ActionsTypes =__webpack_require__(1);

function deleteTodosToModel() {
    this.getNewModelState.subscribe(TodosList.onChange);
}

var deleteTodosToModelPrototype = deleteTodosToModel.prototype;

deleteTodosToModelPrototype.model = __webpack_require__(2);

deleteTodosToModelPrototype.onUpdateModel = new Observable();

deleteTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.DELETE_TODOS) == 0) {
        var currentModel = deleteTodosToModelPrototype.model.deleteItem(value.id);
        deleteTodosToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new deleteTodosToModel();

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var subscribe = __webpack_require__(3);
var TodosFilters = __webpack_require__(7);
var ActionsTypes =__webpack_require__(1);

function setTodosFilterToModel() {
    this.getNewModelState.subscribe(TodosFilters.onChange);
}

var setTodosFilterToModelPrototype = setTodosFilterToModel.prototype;

setTodosFilterToModelPrototype.model = __webpack_require__(2);

setTodosFilterToModelPrototype.onUpdateModel = new Observable();

setTodosFilterToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.SET_VISIBILITY_FILTER) == 0) {
        var currentModel = setTodosFilterToModelPrototype.model.addTodos({
            "todosFilter": value.filter
        });
        setTodosFilterToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new setTodosFilterToModel();

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var subscribe = __webpack_require__(3);
var TodosDeleteAllCompletedButton = __webpack_require__(18);
var ActionsTypes =__webpack_require__(1);

function deleteAllCompletedTodosToModel() {
    this.getNewModelState.subscribe(TodosDeleteAllCompletedButton.onChange)
}

var deleteAllCompletedTodosToModelPrototype = deleteAllCompletedTodosToModel.prototype;

deleteAllCompletedTodosToModelPrototype.model = __webpack_require__(2);

deleteAllCompletedTodosToModelPrototype.onUpdateModel = new Observable();

deleteAllCompletedTodosToModelPrototype.getNewModelState = function(value) {
    if (value.type.localeCompare(ActionsTypes.DELETE_ALL_COMPLETED_TODOS) == 0) {
        var currentModel = deleteAllCompletedTodosToModelPrototype.model.deleteAllCompletedItems();

        deleteAllCompletedTodosToModelPrototype.onUpdateModel.deliver(currentModel);

        currentModel = null;
    }
};

module.exports = new deleteAllCompletedTodosToModel();

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var Observable = __webpack_require__(0);
var ActionsTypes = __webpack_require__(1);

var TODOS_DELETE_ALL_COMPLETED_BUTTON = "todos-actions-bar_delete-done";

function TodosDeleteAllCompletedConstructor() {
    this.todosDelButton.addEventListener('click', this.handlerClick);
}

var todosDeleteAllCompletedConstructorPrototype = TodosDeleteAllCompletedConstructor.prototype;

todosDeleteAllCompletedConstructorPrototype.todosDelButton = document.getElementsByClassName(TODOS_DELETE_ALL_COMPLETED_BUTTON)[0];

todosDeleteAllCompletedConstructorPrototype.onChange = new Observable();

todosDeleteAllCompletedConstructorPrototype.handlerClick = function (event) {
    if (event.target.className.
        localeCompare(TODOS_DELETE_ALL_COMPLETED_BUTTON) === 0) {
        todosDeleteAllCompletedConstructorPrototype.onChange.deliver({
            "type": ActionsTypes.DELETE_ALL_COMPLETED_TODOS,
        });
    }
};

module.exports = new TodosDeleteAllCompletedConstructor();

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var TodosFilters = __webpack_require__(7);
var TodosCounter = __webpack_require__(20);

var TODOS_BAR = ".todos-actions-bar";

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
}

todosBarConstructorPrototype.render = function (todosArray, currentFilter) {
    todosBarConstructorPrototype.setVisibility(todosArray.length);
    TodosFilters.render(currentFilter);
    TodosCounter.render(todosArray);
};

module.exports = new TodosBarConstructor();

/***/ }),
/* 20 */
/***/ (function(module, exports) {

function TodosCounterConstructor() {
}

TodosCounterConstructor.prototype.getNumOfActiveItems = function(todosArray) {
    let num = 0;

    for (let i = 0; i < todosArray.length; i++) {
        if (!todosArray[i].completed) {
            num++;
        }
    }

    return num + " items left";
};

TodosCounterConstructor.prototype.render = function (todosArray) {
    document.querySelector(".todos-actions-bar_counter-undone").innerHTML =
        this.getNumOfActiveItems(todosArray)
};

module.exports = new TodosCounterConstructor();

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map
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

dataStorageConstructorPrototype.deleteAllCompletedTodosLocalStorage
    = function() {

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
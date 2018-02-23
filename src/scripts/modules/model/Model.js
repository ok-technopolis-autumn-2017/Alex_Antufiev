var DataStorage = require("../../dataStorage/DataStorage");

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
};

module.exports = Model;
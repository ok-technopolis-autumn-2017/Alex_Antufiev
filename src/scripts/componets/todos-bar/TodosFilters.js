var Observable = require('../../utils/observer/Observable');
var ActionsTypes = require('../../constants/ActionsTypes');
var FilterTypes = require('../../constants/FilterTypes');

var TODOS_FILTERS_CLASS = ".todos-actions_bar-filters";

function TodosFiltersConstructor() {
    this.todosDelButton.addEventListener('click', this.handlerClick);
}

var todosFiltersConstructorPrototype = TodosFiltersConstructor.prototype;

todosFiltersConstructorPrototype.todosDelButton =
    document.querySelector(TODOS_FILTERS_CLASS);

todosFiltersConstructorPrototype.onChange = new Observable();

todosFiltersConstructorPrototype.setFocus = function (
    currentFilter, choosenFilter, type) {

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
            if (currentFilter.localeCompare(
                    FilterTypes.FILTER_COMPLETED) == 0) {
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
    if (event.target.className.localeCompare(
            FilterTypes.FILTER_COMPLETED) == 0 ||
        event.target.className.localeCompare(
            FilterTypes.FILTER_ACTIVE) == 0||
        event.target.className.localeCompare(
            FilterTypes.FILTER_ALL) == 0) {

        todosFiltersConstructorPrototype.onChange.deliver({
            "type": ActionsTypes.SET_VISIBILITY_FILTER,
            "filter": event.target.className
        });

    }
};

todosFiltersConstructorPrototype.render = function (currentFilter) {
    document.getElementsByClassName(FilterTypes.FILTER_ALL)[0].style.border =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_ALL, "b");
    document.getElementsByClassName(FilterTypes.FILTER_ACTIVE)[0].style.border =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_ACTIVE, "b");
    document.getElementsByClassName(FilterTypes.FILTER_COMPLETED)[0]
        .style.border =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_COMPLETED, "b");
    document.getElementsByClassName(FilterTypes.FILTER_ALL)[0]
        .style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_ALL, "br");
    document.getElementsByClassName(FilterTypes.FILTER_ACTIVE)[0]
        .style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_ACTIVE, "br");
    document.getElementsByClassName(FilterTypes.FILTER_COMPLETED)[0]
        .style.borderRadius =
        todosFiltersConstructorPrototype.setFocus(currentFilter,
            FilterTypes.FILTER_COMPLETED, "br");

};

module.exports = new TodosFiltersConstructor();
import AbstractComponent from "../framework/abstract-component.js";

export default class ExpensesListComponent extends AbstractComponent{
    getTemplate(){
        return  `<ul id="expenses-list"></ul>`;
    }
} 
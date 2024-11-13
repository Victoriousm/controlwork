import ExpensesModel from "./model/expenses-model.js";
import ExpensesPresenter from "./presenter/expenses-presenter.js";

document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".expense-list");
    const expensesModel = new ExpensesModel();
    const expensesPresenter = new ExpensesPresenter(container, expensesModel);
  
    expensesPresenter.init();
  });
import ExpensesListComponent from "../view/expenses-list-component.js";
import ExpenseComponent from "../view/expense-component.js";
import { render } from "../framework/render.js";
import AddExpensesComponent from "../view/addExpenseComponent.js";
import EditExpenseModal from "../view/edit-expense-component.js";



export default class ExpensesPresenter{
    constructor(container,expensesModel){
        this.container = container;
        this.expensesModel = expensesModel;
        this.currentFilter = "all"; 
        this.modalOpen = false; 
    }

    init(){
        const expensesListComponent= new ExpensesListComponent;
        const addExpenseComponent = new AddExpensesComponent;
        const filterElement = document.querySelector("#category-filter");
        

        render(document.querySelector("#add-expense-form"),addExpenseComponent);
        render(this.container,expensesListComponent);
      

        this.setAddExpenseHandler(addExpenseComponent);
        this.updateExpensesView();
        
        this.setFilterHandler(filterElement); 

      }

    
   
  

    renderExpenses(expenses) {
        const listElement = document.querySelector("#expenses-list");
        listElement.innerHTML = ""; 
        
    
        expenses.forEach((expense) => {
          const expenseComponent = new ExpenseComponent(expense, this.handleDeleteExpense.bind(this),this.handleEditExpense.bind(this)); 
          render(listElement, expenseComponent);
          expenseComponent.setEventListeners();
        });
    }
    updateExpensesView() {
      const expenses = this.expensesModel.getExpenses();
  
      const filteredExpenses = this.filterExpenses(expenses, this.currentFilter);
  
      this.renderExpenses(filteredExpenses);
  }
  
  
    filterExpenses(expenses,filter){
      if (filter === "all"){
        return expenses;
      }
      return expenses.filter((expense) => expense.category === filter);
    }
  
    setFilterHandler(filterElement){
      filterElement.addEventListener("change", (event) => {
        this.currentFilter = event.target.value; 
        this.updateExpensesView(); 
      });
    }
   
  handleDeleteExpense(expenseId) {
    this.expensesModel.deleteExpense(expenseId);
    this.updateExpensesView(); 
  }

  setAddExpenseHandler(formComponent){
    formComponent.getElement().addEventListener("submit",(event)=>{
      event.preventDefault();

      const formData = new FormData(event.target);
      const newExpense = {
        id: Date.now(), 
        name: formData.get("name"),
        amount: formData.get("amount"),
        category: formData.get("category"),
      };
      this.expensesModel.addExpense(newExpense);
      
      this.renderExpenses(this.expensesModel.getExpenses());
    
     
      event.target.reset();
    })
  }

  handleEditExpense(expenseId) {
    if (this.modalOpen) return; 
  
    this.modalOpen = true; 
  
    const expense = this.expensesModel.getExpenseId(expenseId);
    if (!expense) {
      console.error("Книга не найдена");
      return;
    }
  
   
    const editModal = new EditExpenseModal(
      expense,
      (updatedExpense) => { 
        this.expensesModel.updateExpense(updatedExpense);
        this.updateExpensesView();
        modalOverlay.remove(); 
        this.modalOpen = false; 
      },
      () => { 
        modalOverlay.remove(); 
        this.modalOpen = false; 
      }
    );
  
    const modalOverlay = document.createElement("div");
    modalOverlay.classList.add("modal-overlay");
  

    document.body.appendChild(modalOverlay);
    modalOverlay.appendChild(editModal.getElement());
  
    editModal.setEventListeners(); 
  }
}
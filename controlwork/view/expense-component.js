import AbstractComponent from "../framework/abstract-component.js";

export default class ExpensesComponent extends AbstractComponent{
    constructor(expense,onDelete,onEdit){
        super();
        this.expense = expense;
        this.onDelete = onDelete;
        this.onEdit = onEdit;
    }


getTemplate() {
    return` 
    <li class="expenses">
        <div class="expense-item">
            <div class="expense-details">
                <p class="namePrice">${this.expense.name} ${this.expense.amount}p.</p>
                <p class="category">Категория: ${this.expense.category}</p>
            </div>
            <div class="expenses-actions">
                <button class="edit-btn">Редактировать</button> 
                <button class="delete-btn">Удалить</button>
            </div>
        </div>
    </li>
    `;
  }
  setEventListeners(){
    this.element.querySelector(".delete-btn").addEventListener("click",()=>{
        this.onDelete(this.expense.id)
    });
    this.element.querySelector(".edit-btn").addEventListener("click", () => {
        this.onEdit(this.expense.id); // Вызываем onDelete при клике на кнопку
      });
  }
}
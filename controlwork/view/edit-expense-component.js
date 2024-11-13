import AbstractComponent from "../framework/abstract-component.js";

export default class EditExpenseModal extends AbstractComponent {
  constructor(expense, onSave, onCancel) {
    super();
    this.expense = expense;
    this.onSave = onSave;
    this.onCancel = onCancel;
  }

  getTemplate() {
    return `
        <div class="modal">
    <div class="modal-content">
        <h2>Редактировать расход</h2>
        <form>
            <label for="expense-name">Название</label>
            <input type="text" id="expense-name" value="${this.expense.name}">
            
            <label for="expense-category">Категория</label>
            <select id="expense-category" required>
                <option value="">Выбрать категорию</option>
                <option value="Еда" ${this.expense.category === 'Еда' ? 'selected' : ''}>Еда</option>
                <option value="Транспорт" ${this.expense.category === 'Транспорт' ? 'selected' : ''}>Транспорт</option>
                <option value="Развлечение" ${this.expense.category === 'Развлечение' ? 'selected' : ''}>Развлечение</option>
                <option value="Другие" ${this.expense.category === 'Другие' ? 'selected' : ''}>Другие</option>
            </select>
            
            <label for="expense-amount">Цена</label>
            <input type="text" id="expense-amount" value="${this.expense.amount}">
            
            <button type="submit">Сохранить</button>
            <button type="button" class="cancel-btn">Отмена</button>
        </form>
    </div>
</div>
      `;
  }

  setEventListeners() {
    this.element.querySelector("form").addEventListener("submit", (event) => {
      event.preventDefault();
      const formElement = event.target;
      const name = formElement.querySelector("#expense-name").value.trim();
      const category = formElement.querySelector("#expense-category").value.trim();
      const amount = formElement.querySelector("#expense-amount").value.trim();

      if (name && category && amount) {
        this.onSave({ ...this.expense, name, category, amount });
      } else {
        alert("Пожалуйста, заполните все поля!");
      }
    });

    this.element.querySelector(".cancel-btn").addEventListener("click", () => {
      this.onCancel();
    });
  }
}

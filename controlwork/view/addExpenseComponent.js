import AbstractComponent from "../framework/abstract-component.js";

export default class AddExpensesComponent extends AbstractComponent{
    getTemplate(){
        return`
        <section class="expense-form">
            <h2>Добавить расход</h2>
            <form id="expense-form">
                <label for="expense-name">Наименование расхода</label>
                <input type="text" id="expense-name" name="name" placeholder="Например, еда">
                
                <label for="expense-category" ">Категория</label>
                <select id="expense-category" name="category">
                    <option value="Еда">Еда</option>
                    <option value="Транспорт">Транспорт</option>
                    <option value="Развлечения">Развлечения</option>
                </select>
                
                <label for="expense-amount" >Стоимость</label>
                <input type="number" id="expense-amount "name="amount" placeholder="0">
                
                <button type="submit" class="add-btn">Добавить расходы</button>
            </form>
        </section>
        `;
    }
}
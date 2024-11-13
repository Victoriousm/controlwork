export default class AbstractComponent {
    getElement() {
      if (!this.element) {
        this.element = this.createElement(this.getTemplate());
      }
      return this.element;
    }
  
    createElement(html) {
      const template = document.createElement("div");
      template.innerHTML = html.trim();
      return template.firstChild;
    }
  
    getTemplate() {
      throw new Error("Метод getTemplate должен быть переопределен");
    }
  }
  
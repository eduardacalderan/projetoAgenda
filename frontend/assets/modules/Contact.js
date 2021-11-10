import validator from "validator";

export default class Contact {
  constructor(formClass) {
    this.form = document.querySelector(formClass);
  }

  init() {
    this.events();
  }

  events() {
    if (!this.form) return;
    this.form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.validate(e);
    });
  }

  validate(e) {
    const el = e.target;
    const nameInput = el.querySelector('input[name="name"]');
    const emailInput = el.querySelector('input[name="email"]');
    const phoneInput = el.querySelector('input[name="phone"]');
    const success = document.querySelector(".lead");
    let error = false;

    if (emailInput.value && !validator.isEmail(emailInput.value)) {
      this.createError(emailInput, "E-mail inválido.");
      error = true;
    }

    if (!nameInput.value) {
      this.createError(nameInput, "Nome é um campo obrigatório.");
      error = true;
    }

    if (!emailInput.value && !phoneInput.value) {
      this.createError(
        phoneInput,
        "E-mail e/ou telefone precisam ser enviados."
      );
      error = true;
    }

    if (!error) {
      this.success(success, "");
      el.submit();
    }
  }

  createError(field, msg) {
    const p = document.createElement("p");
    p.innerHTML = msg;
    p.classList.add("error-msg");
    field.insertAdjacentElement("afterend", p);
  }

  success(field, msg) {
    const p = document.createElement("p");
    p.innerHTML = msg;
    p.classList.add("alert-success");
    field.insertAdjacentElement("afterend", p);
  }
}

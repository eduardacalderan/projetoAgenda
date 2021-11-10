import validator from "validator";

export default class Login {
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
    const emailInput = el.querySelector('input[name="email"]');
    const passwordInput = el.querySelector('input[name="password"]');
    const msg = document.querySelector(".lead");

    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      this.createError(emailInput, "E-mail inválido.");
      error = true;
    }

    if (!error) {
      this.success(msg, "");
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

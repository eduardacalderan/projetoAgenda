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
    const nameInput = el.querySelector('input[name="name"]');
    const surnameInput = el.querySelector('input[name="surname"]');
    const rPW = el.querySelector('input[name="rpass"]');
    const msg = document.querySelector(".lead");

    let error = false;

    if (!validator.isEmail(emailInput.value)) {
      this.createError(emailInput, "E-mail inválido.");
      error = true;
    }

    if (!nameInput.value) {
      this.createError(nameInput, "Nome é obrigatório.");
      error = true;
    }

    if (!surnameInput.value) {
      this.createError(surnameInput, "Sobrenome é orbigatório.");
      error = true;
    }

    if (this.user) {
      this.createError(msg, "Usuário já existe.");
      error = true;
    }

    if (passwordInput.value !== rPW.value) {
      this.createError(rPW, "As senhas precisam ser iguais.");
      error = true;
    }

    if (passwordInput.value.length < 6 || passwordInput.value.length > 50) {
      this.createError(
        passwordInput,
        "A senha precisa ter entre 6 e 50 caracteres"
      );

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

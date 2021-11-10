const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String },
  },
  { collection: "users" }
);

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.errors = [];
    this.user = null;
  }

  async login() {
    this.validLogin();
    if (this.errors.length > 0) return;
    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.errors.push("E-mail e/ou senha inválida.");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.errors.push("Senha inválida.");
      this.user = null;
      return;
    }
  }

  async register() {
    this.valid();
    if (this.errors.length > 0) return; //se passar desse

    delete this.body.rpass;

    await this.userExists(); //irá checar esse /se passar desse

    if (this.errors.length > 0) return; //irá checar esse /se passar desse=

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);

    this.user = await LoginModel.create(this.body);
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email }); // encontrar um email na base de dados igual ao que está sendo enviado

    if (this.user) this.errors.push("Usuário já existe.");
  }

  valid() {
    this.cleanData();

    //validation
    if (!validator.isEmail(this.body.email))
      this.errors.push("E-mail inválido");

    if (!this.body.name) this.errors.push("Nome é obrigatório.");

    if (!this.body.surname) this.errors.push("Sobrenome é orbigatório.");

    if (this.body.password.length < 6 || this.body.password.length > 50) {
      this.errors.push("A senha precisa ter entre 6 e 50 caracteres.");
    }

    if (this.body.password !== this.body.rpass)
      this.errors.push("As senhas precisam ser iguais.");
  }

  validLogin() {
    this.cleanData();
    if (!validator.isEmail(this.body.email)) this.errors.push("Email inválido");
  }

  cleanData() {
    for (let key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }
    this.body = {
      email: this.body.email,
      name: this.body.name,
      surname: this.body.surname,
      phone: this.body.phone,
      password: this.body.password,
      rpass: this.body.rpass,
    };
  }
}

module.exports = Login;

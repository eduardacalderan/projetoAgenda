const mongoose = require("mongoose");
const validator = require("validator");

const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  surname: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  phone: { type: String, required: false, default: "" },
  idUser: { type: String, required: false },
  createDate: { type: Date, default: Date.now },
});

const ContactModel = mongoose.model("Contact", ContactSchema);

function Contact(body, idUser) {
  this.body = body;
  this.user = idUser;
  this.errors = [];
  this.contact = null;
}

Contact.prototype.register = async function () {
  this.valid();
  if (this.errors.length > 0) return;
  this.contact = await ContactModel.create(this.body);
};

Contact.prototype.valid = function () {
  this.cleanUp();

  // Validation
  if (this.body.email && !validator.isEmail(this.body.email))
    this.errors.push("E-mail inválido");
  if (!this.body.name) this.errors.push("Nome é um campo obrigatório.");
  if (!this.body.email && !this.body.phone) {
    this.errors.push("E-mail e/ou telefone precisa ser enviados.");
  }
};

Contact.prototype.cleanUp = function () {
  for (let key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    name: this.body.name,
    surname: this.body.surname,
    email: this.body.email,
    phone: this.body.phone,
    idUser: this.user,
  };
};

Contact.prototype.edit = async function (id) {
  if (typeof id !== "string") return;
  this.valid();
  if (this.errors.length > 0) return;
  this.contact = await ContactModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

// Statics Methods
Contact.searchId = async function (id) {
  if (typeof id !== "string") return;
  const contact = await ContactModel.findById(id);
  return contact;
};

Contact.searchContacts = async function (userEmail) {
  const contacts = await ContactModel.find({ idUser: userEmail }).sort({
    createDate: -1,
  }); // show the contacts in descending order of the dates
  return contacts;
};

Contact.delete = async function (id) {
  if (typeof id !== "string") return;
  const contact = await ContactModel.findOneAndDelete({ _id: id });
  return contact;
};

module.exports = Contact;

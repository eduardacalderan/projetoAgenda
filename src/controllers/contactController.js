const Contact = require("../models/ContactModel");

exports.index = (req, res) => {
  if (req.session.user) return res.render("contact", { contact: {} });
  return res.render("login");
};

exports.register = async (req, res) => {
  try {
    const contact = new Contact(req.body, req.session.user.email);
    await contact.register();
    let idUser = null;

    if (contact.errors.length > 0) {
      req.flash("errors", contact.errors);
      req.session.save(() =>
        res.render("contact", {
          body: req.body,
          errors: contact.errors,
        })
      );
      return;
    }
    req.flash("success", "Contato registrado.");
    idUser = contact.contact._id;
    req.session.save(() =>
      res.redirect(`/contact/index/${contact.contact._id}`)
    );
    return idUser;
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.editIndex = async function (req, res) {
  try {
    if (req.session.user) {
      if (!req.params.id) res.render("404");
      const contact = await Contact.searchId(req.params.id);
      if (!contact) res.render("404");
      idUser = contact._id;
      req.session.contact = {
        _id: idUser || "",
        name: contact.name,
        surname: contact.surname,
        phone: contact.phone,
        email: contact.email,
        idUser: contact.idUser,
      };
      return res.render("contact", { contact });
    }
    return res.render("login");
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.edit = async function (req, res) {
  try {
    if (req.session.user) {
      if (!req.params.id) res.render("404");
      const contact = new Contact(req.body, req.session.user.email);
      await contact.edit(req.params.id);
      idUser = req.params.id;

      if (contact.errors.length > 0) {
        req.flash("errors", contact.errors);
        req.session.contact = {
          _id: idUser,
          name: contact.name,
          surname: contact.surname,
          phone: contact.phone,
          email: contact.email,
          idUser: contact.idUser,
        };

        req.session.save(() =>
          res.render("contact", {
            body: req.session.contact,
            errors: contact.errors,
          })
        );
        req.session.contact._id = idUser;
        return;
      }
      req.flash("success", "Contato editado.");
      idUser = contact.contact._id;
      req.session.save(() =>
        res.redirect(`/contact/index/${contact.contact._id}`)
      );
      return;
    }
    return res.render("login");
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.delete = async function (req, res) {
  try {
    if (req.session.user) {
      if (!req.params.id) res.render("404");
      const contact = await Contact.delete(req.params.id);
      if (!contact) res.render("404");
      req.flash("success", "Contato apagado.");
      req.session.save(() => res.redirect(`back`));
      return;
    }
    return res.render("login");
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

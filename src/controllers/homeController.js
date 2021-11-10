const Contact = require("../models/ContactModel");

exports.index = async (req, res) => {
  if (req.session.user) {
    const contacts = await Contact.searchContacts(req.session.user.email);
    res.render("index", { contacts });
    return;
  }
  res.render("login");
};

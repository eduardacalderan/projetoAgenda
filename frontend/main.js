import "core-js/stable";
import "regenerator-runtime/runtime";
import "./assets/css/style.css";
import Register from "./assets/modules/Register";
import Login from "./assets/modules/Login";
import Contact from "./assets/modules/Contact";

const login = new Login(".form-login");
const register = new Register(".form-register");
login.init();
register.init();

const addContact = new Contact(".form-cadastro");
addContact.init();

console.log("Olá mundo");

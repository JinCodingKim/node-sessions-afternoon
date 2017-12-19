const express = require("express");
const { json } = require("body-parser");
const session = require("express-session");
require("dotenv").config();
const port = process.env.PORT || 3000;
const app = express();

const checkForSessions = require(`${__dirname}/middlewares/checkForSessions`);
const swag = require(`${__dirname}/controllers/swag_controller`);
const authorize = require(`${__dirname}/controllers/auth_controller`);
const cart = require(`${__dirname}/controllers/cart_controller`);
const search = require(`${__dirname}/controllers/search_controller`);

app.use(express.static(`${__dirname}/../build`));
app.use(json());
app.use(
  session({
    secret: process.env.SESSIONS_SECRET,
    resave: false,
    saveUninitialized: true
  })
);
app.use(checkForSessions);

app.get("/api/swag", swag.read);

app.post("/api/login", authorize.login);
app.post("/api/register", authorize.register);
app.post("/api/signout", authorize.signout);
app.get("/api/user", authorize.getUser);

app.post("/api/cart", cart.add);
app.post("/api/cart/checkout", cart.checkout);
app.delete("/api/cart", cart.remove);

app.get("/api/search", search.search);

app.listen(port, () => console.log(`Listening on: ${port}`));

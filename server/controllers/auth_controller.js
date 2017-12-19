const users = require("../models/users");
let id = 1;

module.exports = {
  login: (req, res, next) => {
    const { user } = req.session;
    const { username, password } = req.body;
    if (user.username === username && user.password === password) {
      user.username = username;
      return res.status(200).json(user);
    } else {
      return res.status(500).json("Access Denied");
    }
  },
  register: (req, res, next) => {
    const { username, password } = req.body;
    const { user } = req.session;
    users.push({ id, username, password });
    id++;
    user.username = username;
    return res.status(200).json(user);
  },
  signout: (req, res, next) => {
    req.session.destroy();
    res.status(200).json(req.session);
  },
  getUser: (req, res, next) => {
    const { user } = req.session;
    res.status(200).json(user);
  }
};

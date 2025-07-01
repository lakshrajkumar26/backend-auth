const express = require("express");
const routes = express.Router();
const verifyJwt = require("./middleware/auth");

routes.get('/is-authenticated', verifyJwt, (req, res) => {
  res.status(200).json({
    authenticated: true,
    user: req.userInfo, // email, role, etc.
  });
});
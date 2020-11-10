const express = require('express');

const Router = express.Router();

Router.post('/login', (req, res) => {
  const { role, email, password } = req.body;
  if (email === 'admin@gmail.com' && password === 'admin') { res.send(true); } else { res.send(false); }
});

module.exports = Router;

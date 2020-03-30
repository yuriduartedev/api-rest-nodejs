const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth');

const User = require('../models/User');

const router = express.Router();

function generateTotken(params = {}) {
  return jwt.sign(params, authConfig.secret, {
    expiresIn: 86400,
  });
}

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).send({ error: 'User already exists' });
    if (name.length < 1)
      return res.status(400).send({ error: 'Name cannot be Empty' });
    if (password.length < 1)
      return res.status(400).send({ error: 'Password cannot be Empty' });

    const user = await User.create(req.body)

    user.password = undefined;

    return res.send({
      user,
      token: generateTotken({ id: user.id })
    });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' });
  }
});

router.post('/authenticate', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select('+password');;

  if(!user)
    return res.status(400).send({ erro: 'User not found' });

  if (!await bcrypt.compare(password, user.password))
    return res.status(400).send({ error: 'Invalid password' })

  user.password = undefined;

  const token =

  res.send({
    user,
    token: generateTotken({ id: user.id })
  });
});

module.exports = app => app.use('/auth', router);

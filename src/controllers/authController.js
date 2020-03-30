const express = require('express');

const User = require('../models/User');

const router = express.Router();

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

    return res.send({ user });
  } catch (err) {
    return res.status(400).send({ error: 'Registration failed' });
  }
});

module.exports = app => app.use('/auth', router);
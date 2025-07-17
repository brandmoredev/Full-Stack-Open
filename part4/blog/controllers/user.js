const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (password.length < 3) {
    throw Error('minimum password length should be 2')
  }

  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    password: hashedPassword,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter


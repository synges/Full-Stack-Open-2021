const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response, next) => {
  const { body } = request
  if (!body.password || body.password.length < 3) {
    return response.status(400).json({
      error: 'Password is missing or needs to be be at least 3 charcters',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)
  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })
  console.log(user)
  try {
    const result = await user.save()
    response.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter

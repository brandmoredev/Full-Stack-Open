const bcrypt = require('bcryptjs')
const User = require('../models/user')
const { test, describe, beforeEach, after } = require('node:test')
const assert = require('node:assert')
const helper = require('../tests/test_helper')

const supertest = require('supertest')
const app = require('../app')
const { default: mongoose } = require('mongoose')
const api = supertest(app)

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const password = await bcrypt.hash('secret', 10)
    const user = new User({ username: 'testusername', name: 'testname', password })

    await user.save()
  })

  test('creation fails with proper statuscode and message if username is already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testusername',
      name: 'testname',
      password: 'testpassword'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('expected `username` to be unique'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation fails if minimun password length is not met', async() => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'testusername',
      name: 'testname',
      password: 'pw'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()

    assert(result.body.error.includes('minimum password length should be 2'))
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })
})

after(async () => {
  mongoose.connection.close()
})

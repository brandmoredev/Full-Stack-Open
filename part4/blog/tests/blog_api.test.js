const { test, beforeEach, after, before } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('../tests/test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

const testUser = {
  username: 'testuser',
  name: 'Test User',
  password: 'testpassword'
}

let token

before(async () => {
  await User.deleteMany({})
  await api.post('/api/users').send(testUser)

  const loginResponse = await api
    .post('/api/login')
    .send({ username: testUser.username, password: testUser.password })

  token = loginResponse.body.token
})

beforeEach(async () => {
  await Blog.deleteMany({})

  const user = await User.findOne({ username: testUser.username })

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog({ ...blog, user: user._id })
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('there are two blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)
})

test('unique identifier is named "id"', async () => {
  const response = await api.get('/api/blogs')

  assert(Object.keys(response.body[0]).includes('id'))
})

test('a valid blog can be added', async () => {
  const newBlog ={
    title: 'New Blog Test',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
  assert(contents.includes('New Blog Test'))
})

test('sets likes to 0 if like property is missing on post', async () => {
  const newBlog ={
    title: 'New Blog Test',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likes = response.body.map(r => r.likes)

  assert.strictEqual(likes[2], 0)
})

test('sets status to 400 if title property is missing on post', async () => {
  const newBlog ={
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('sets status to 400 if url property is missing on post', async () => {
  const newBlog ={
    title: 'New Blog Test',
    author: 'Michael Chan',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})

test('delete succeeds with a status of 204 if id is valid', async () => {
  const blogAtStart = await helper.blogsInDb()
  const blogToDelete = blogAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()

  const titles = blogsAtEnd.map(b => b.title)
  assert(!titles.includes(blogToDelete.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
})


test('update blog fails with a status of 404 if id is invalid', async () => {
  const nonExistingId = await helper.nonExistingId()
  const updatedBlog = {
    title: 'New Title',
    author: 'John Doe',
    url: 'www.test.com',
    likes: 5
  }

  await api
    .put(`/api/blogs/${nonExistingId}`)
    .send(updatedBlog)
    .expect(404)
})

test('update suceeds with if updated properties are valid', async () => {
  const blogsAtStart = await helper.blogsInDb()

  const updatedBlogId = blogsAtStart[0].id

  const updatedFirstBlog = {
    title: 'New Title - Valid Length',
    author: 'John Doe',
    url: 'www.test.com',
    likes: 5
  }

  await api
    .put(`/api/blogs/${updatedBlogId}`)
    .send(updatedFirstBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  assert.strictEqual(blogsAtEnd[0].title, updatedFirstBlog.title)
})

after(async () => {
  await mongoose.connection.close()
})

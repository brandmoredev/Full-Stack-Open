const { test, beforeEach, after } = require('node:test')
const mongoose = require('mongoose')
const Blog = require('../models/blog')
const helper = require('../tests/test_helper')
const supertest = require('supertest')
const app = require('../app')
const assert = require('node:assert')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

after(async () => {
  await mongoose.connection.close()
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
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 2)
})
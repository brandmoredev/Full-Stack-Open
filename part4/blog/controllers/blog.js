const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let blog = request.body

  if (blog.likes === undefined) {
    blog = { ...blog, likes: 0 }
  }
  const newBlog = new Blog(blog)

  await newBlog.save()

  response.status(201).json(newBlog)
})

module.exports = blogsRouter
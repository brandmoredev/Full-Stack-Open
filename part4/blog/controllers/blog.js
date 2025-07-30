const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let blog = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if(!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const user = await User.findById(decodedToken.id)

  if (!user) {
    return response.status(401).json({ error: 'UserId missing or not valid' })
  }

  if (blog.likes === undefined) {
    blog = {
      ...blog,
      likes: 0,
    }
  }

  blog = {
    ...blog,
    user: decodedToken.id
  }

  const newBlog = new Blog(blog)

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  const userId = decodedToken.id

  if (!userId) {
    return response.status(401).json({ error: 'token invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).end()
  }

  if (blog.user.toString() === userId.toString()) {
    await Blog.deleteOne({ id: request.params.id })
    return response.status(204).end()
  }

  return response.status(401).json({ error: 'cannot complete operation' })
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body

  const blog = await Blog.findById(request.params.id)

  if (!blog){
    return response.status(404).end()
  }

  blog.title = title
  blog.author = author
  blog.url = url
  blog.likes = likes

  await blog.save()
  response.json(blog)
})

module.exports = blogsRouter
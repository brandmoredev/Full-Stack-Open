const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })

  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  let blog = request.body

  const user = await User.findById('681e57dd5fd7789ee7c93e67')

  if (blog.likes === undefined) {
    blog = {
      ...blog,
      likes: 0,
      user: '681e57dd5fd7789ee7c93e67'
    }
  }
  const newBlog = new Blog(blog)

  const savedBlog = await newBlog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(newBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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
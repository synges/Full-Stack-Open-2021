const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const { body } = request

  const { user } = request

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const { user } = request

  if (blog.user.toString() === user.id) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response
      .status(401)
      .json({ error: "you can't delete a blogpost you don't own" })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const blog = {
    likes: request.body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  })
  response.json(updatedBlog)
})

module.exports = blogsRouter

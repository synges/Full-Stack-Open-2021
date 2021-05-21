const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of blogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('notes are returned as json and correct count', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  expect(response.body).toHaveLength(blogs.length)
})

test('unique identifier is called id', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body[0].id).toBeDefined()
})

test('creating a blog post works', async () => {
  const newBlog = {
    title: 'new Blog',
    author: 'Ahmed Aziz',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 15,
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .set(
      'Authorization',
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN5bmdlczEiLCJpZCI6IjYwYTdkZGRiYjQwZjgyMGYzYzU2OGZiNiIsImlhdCI6MTYyMTYxNjYxMX0.xeNDqpN042yMBSeo6grUHMr3M7ucxWfBVH_lu_ANENQbearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN5bmdlczEiLCJpZCI6IjYwYTdkZGRiYjQwZjgyMGYzYzU2OGZiNiIsImlhdCI6MTYyMTYxNjYxMX0.xeNDqpN042yMBSeo6grUHMr3M7ucxWfBVH_lu_ANENQeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlN5bmdlczEiLCJpZCI6IjYwYTdkZGRiYjQwZjgyMGYzYzU2OGZiNiIsImlhdCI6MTYyMTYyMzEzN30.Z5CmhZw4PKOLLhTlZKIPhpTl_jtPVa2UPVCCRI71xTw'
    )
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const titles = response.body.map((item) => item.title)

  expect(response.body).toHaveLength(blogs.length + 1)
  expect(titles).toContain('new Blog')
})
test('likes property defaults to zero if missing from request', async () => {
  const newBlog = {
    title: 'new Blog',
    author: 'Ahmed Aziz',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const newEntry = response.body.find((item) => item.title === 'new Blog')

  expect(newEntry.likes).toBe(0)
})

test('title and url properties are missing', async () => {
  const newBlogNoTitle = {
    author: 'Ahmed Aziz',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 15,
  }

  await api.post('/api/blogs').send(newBlogNoTitle).expect(400)

  const newBlogNoUrl = {
    title: 'new Blog',
    author: 'Ahmed Aziz',
    likes: 15,
  }

  await api.post('/api/blogs').send(newBlogNoUrl).expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})

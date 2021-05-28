import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  const addBlog = async (createdBlog) => {
    try {
      const newBlog = await blogService.create(createdBlog)
      setBlogs(blogs.concat(newBlog))
      blogFormRef.current.toggleVisibility()
      setNotification({
        message: `a new blog ${newBlog.title} by ${newBlog.author} added`,
        error: false,
      })
    } catch (exception) {
      setNotification({
        message: `failed to create new blog`,
        error: true,
      })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addLike = async (likedBlog) => {
    try {
      const updatedBlog = {
        user: likedBlog.user.id,
        likes: likedBlog.likes + 1,
        author: likedBlog.author,
        title: likedBlog.title,
        url: likedBlog.url,
      }
      const response = await blogService.update(likedBlog, updatedBlog)
      setBlogs(
        blogs.map((blog) => (blog.id !== likedBlog.id ? blog : response))
      )
    } catch (exception) {
      setNotification({
        message: `failed to like the blog`,
        error: true,
      })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({
        message: 'wrong username or password',
        error: true,
      })
    }
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setNotification({
      message: `${user.name} logged out`,
      error: false,
    })
    setUser(null)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser')
    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [user])

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }
  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
      <Togglable buttonLabel="New Blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} addLike={addLike} />
      ))}
    </div>
  )
}

export default App

import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import {
  setNotification,
  clearNotification,
} from './reducers/notificationReducer'
import { initializeBlogs, createBlog } from './reducers/blogsReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)
  const blogs = useSelector((state) => state.blogs)

  const blogFormRef = useRef()

  const displayNotification = (message, error) => {
    dispatch(
      setNotification({
        message,
        error,
      })
    )
    setTimeout(() => {
      dispatch(clearNotification())
    }, 5000)
  }

  const addBlog = async (createdBlog) => {
    try {
      // const newBlog = await blogService.create(createdBlog)
      // setBlogs(blogs.concat(newBlog))
      dispatch(createBlog(createdBlog))
      blogFormRef.current.toggleVisibility()
      displayNotification(
        `a new blog ${createBlog.title} by ${createdBlog.author} added`,
        false
      )
    } catch (exception) {
      displayNotification('failed to create new blog', true)
    }
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
      // setBlogs(
      //   blogs
      //     .map((blog) => (blog.id !== likedBlog.id ? blog : response))
      //     .sort((a, b) => a.likes - b.likes)
      // )
      console.log(response)
    } catch (exception) {
      displayNotification('failed to like the blog', true)
    }
  }

  const deleteBlog = async (deletedBlog) => {
    try {
      await blogService.deleteBlog(deletedBlog)
      // setBlogs(blogs.filter((blog) => blog.id !== deletedBlog.id))
    } catch (exception) {
      displayNotification('failed to delete the blog', true)
    }
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
      displayNotification('wrong username or password', true)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    displayNotification(`${user.name} logged out`, false)
    setUser(null)
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
    blogService.getAll().then(dispatch(initializeBlogs()))
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
              id="username"
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit" id="login-button">
            login
          </button>
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
        <Blog
          key={blog.id}
          blog={blog}
          addLike={addLike}
          deleteBlog={deleteBlog}
          loggedUser={user}
        />
      ))}
    </div>
  )
}

export default App

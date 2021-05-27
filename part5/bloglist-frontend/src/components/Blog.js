import React, { useState } from 'react'
const Blog = ({ blog, addLike }) => {
  const [showDetails, setShowDetails] = useState(false)

  const toggleVisibility = () => {
    setShowDetails(!showDetails)
  }
  if (showDetails) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <br />
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={() => addLike(blog)}>like</button>
        <br />
        {blog.user.name}
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>view</button>
      </div>
    )
  }
}
const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

export default Blog

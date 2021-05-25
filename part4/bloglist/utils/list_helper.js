const lodash = require('lodash')

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes
  return blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    if (favorite.likes < item.likes) {
      return item
    }
    return favorite
  }

  return blogs.reduce(reducer, { likes: 0 })
}

const mostBlogs = (blogs) => {
  const blogCount = lodash.countBy(blogs, (blog) => blog.author)
  const maxKey = lodash.maxBy(
    Object.keys(blogCount),
    (value) => blogCount[value]
  )
  return { author: maxKey, blogs: blogCount[maxKey] }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
}

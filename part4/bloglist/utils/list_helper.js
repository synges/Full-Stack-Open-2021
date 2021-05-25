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

const mostLikes = (blogs) => {
  const groupedByAuthor = lodash.groupBy(blogs, (blog) => blog.author)
  const authorLikes = {}
  for (const author in groupedByAuthor) {
    authorLikes[author] = lodash.sumBy(
      groupedByAuthor[author],
      (blog) => blog.likes
    )
  }

  const maxKey = lodash.maxBy(
    Object.keys(authorLikes),
    (value) => authorLikes[value]
  )
  return { author: maxKey, likes: authorLikes[maxKey] }
}

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
}

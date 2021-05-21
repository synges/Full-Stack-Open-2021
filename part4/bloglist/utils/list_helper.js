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

module.exports = {
  totalLikes,
  favoriteBlog,
}

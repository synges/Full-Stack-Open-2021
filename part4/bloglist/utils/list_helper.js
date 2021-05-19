const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const reducer = (sum, item) => sum + item.likes;
  return blogs.reduce(reducer, 0);
};

const favoriteBlog = (blogs) => {
  const reducer = (favorite, item) => {
    if (favorite.likes < item.likes) {
      favorite.title = item.title;
      favorite.author = item.author;
      favorite.likes = item.likes;
    }
    return favorite;
  };

  return blogs.reduce(reducer, { likes: 0 });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};

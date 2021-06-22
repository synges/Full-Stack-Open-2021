import blogsService from '../services/blogs'

const byLikes = (a, b) => b.likes - a.likes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort(byLikes)
    case 'CREATE':
      return [...state, action.data].sort(byLikes)
    case 'LIKE':
      return state
        .map((blog) => (blog.id !== action.data.id ? blog : action.data))
        .sort(byLikes)
    case 'DELETE':
      return state.filter((blog) => blog.id !== action.data.id).sort(byLikes)
    default:
      return state
  }
}

const initializeBlogs = () => {
  return async (dispatch) => {
    const data = await blogsService.getAll()
    dispatch({
      type: 'INIT',
      data,
    })
  }
}

const createBlog = (blog) => {
  return async (dispatch) => {
    const data = await blogsService.create(blog)
    dispatch({
      type: 'CREATE',
      data,
    })
  }
}

const likeBlog = (likedBlog, updatedBlog) => {
  return async (dispatch) => {
    const data = await blogsService.update(likedBlog, updatedBlog)
    dispatch({ type: 'LIKE', data })
  }
}

const removeBlog = (deletedBlog) => {
  return async (dispatch) => {
    await blogsService.deleteBlog(deletedBlog)
    dispatch({ type: 'DELETE', data: deletedBlog })
  }
}

export default reducer
export { initializeBlogs, createBlog, likeBlog, removeBlog }

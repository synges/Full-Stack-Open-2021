import blogsService from '../services/blogs'

const byLikes = (a, b) => a.likes - b.likes

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'INIT':
      return action.data.sort(byLikes)
    case 'CREATE':
      return [...state, action.data]
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

export default reducer
export { initializeBlogs, createBlog }

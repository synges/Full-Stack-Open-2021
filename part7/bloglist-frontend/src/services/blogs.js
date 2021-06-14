import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const config = { headers: { Authorization: token } }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async (newBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.post(baseUrl, newBlog, config)
  return response.data
}

const update = async (oldBlog, updatedBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.put(
    `${baseUrl}/${oldBlog.id}`,
    updatedBlog,
    config
  )
  return response.data
}

const deleteBlog = async (deletedBlog) => {
  const config = { headers: { Authorization: token } }
  const response = await axios.delete(`${baseUrl}/${deletedBlog.id}`, config)
  return response.status
}

export default { getAll, setToken, create, update, deleteBlog }

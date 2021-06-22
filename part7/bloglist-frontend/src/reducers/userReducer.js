const reducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.user
    case 'CLEAR_USER':
      return null
    default:
      return state
  }
}

const userLogin = (user) => {
  return async (dispatch) => {
    dispatch({
      type: 'SET_USER',
      user,
    })
  }
}

const userLogout = () => {
  return {
    type: 'CLEAR_USER',
  }
}

export default reducer
export { userLogin, userLogout }

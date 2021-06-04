const setNotification = (message, displaySeconds) => {
  return (dispatch) => {
    dispatch({
      type: 'SET_MESSAGE',
      message,
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_MESSAGE',
      })
    }, displaySeconds * 1000)
  }
}

const notificationReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    case 'CLEAR_MESSAGE':
      return ''
    default:
      return state
  }
}

export default notificationReducer
export { setNotification }

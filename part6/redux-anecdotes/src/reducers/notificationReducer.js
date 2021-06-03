const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    message,
  }
}

const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE',
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
export { setMessage, clearMessage }

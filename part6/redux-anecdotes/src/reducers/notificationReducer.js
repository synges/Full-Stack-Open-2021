const setMessage = (message) => {
  return {
    type: 'SET_MESSAGE',
    message,
  }
}
const notificationReducer = (state = 'Notification intial value', action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return action.message
    default:
      return state
  }
}

export default notificationReducer
export { setMessage }

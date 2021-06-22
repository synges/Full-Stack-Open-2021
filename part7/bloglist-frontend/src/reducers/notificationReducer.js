const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification,
  }
}

const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION'
  }
}

const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION': {
      return action.notification
    }
    case 'CLEAR_NOTIFICATION': {
    return null
    }
    default:
      return state
  }
}

export default notificationReducer
export { setNotification , clearNotification }

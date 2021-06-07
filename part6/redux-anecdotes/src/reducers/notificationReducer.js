const setNotification = (message, displaySeconds) => {
  return (dispatch) => {
    const timeoutID = setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION',
      })
    }, displaySeconds * 1000)
    dispatch({
      type: 'SET_NOTIFICATION',
      notification: { message, timeoutID },
    })
  }
}

const notificationReducer = (
  state = { message: '', timeoutId: null },
  action
) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      if (state.timeoutID) {
        clearTimeout(state.timeoutID)
      }
      return action.notification
    case 'CLEAR_NOTIFICATION':
      return { ...state, message: '' }
    default:
      return state
  }
}

export default notificationReducer
export { setNotification }

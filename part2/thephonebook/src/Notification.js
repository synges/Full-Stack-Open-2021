import React from 'react'

const Notification = ({ message }) => {
	if (message === null) {
		return null
	}

	return <div style={notificationStyle}>{message}</div>
}

const notificationStyle = {
	color: 'green',
	background: 'lightgrey',
	fontSize: 19,
	borderStyle: 'solid',
	borderRadius: 4,
	padding: 9,
	marginBottom: 9,
}

export default Notification

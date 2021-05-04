import React from 'react'

const Notification = ({ notification }) => {
	if (notification === null) {
		return null
	}

	return (
		<div style={notification.error ? errorStyle : notificationStyle}>
			{notification.message}
		</div>
	)
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

const errorStyle = {
	...notificationStyle,
	color: 'red',
}

export default Notification

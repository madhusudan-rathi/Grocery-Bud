import React, { useEffect } from 'react'

const Alert = ({type, msg, removeAlert, list}) => {
	useEffect(() => {
		const timeout = setTimeout(() => {
			removeAlert();
		}, 3000);
		return () => clearTimeout(timeout);
	}, [list]);
  	return (
		<React.Fragment>
			<p className={`alert alert-${type}`}>{msg}</p>
		</React.Fragment>
	);
}

export default Alert

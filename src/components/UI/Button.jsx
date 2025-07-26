/* eslint no-unused-vars: "off", unused-imports/no-unused-imports: "off" */
import React from 'react';
import PropTypes from 'prop-types';

// Simple reusable button component
const Button = ({ children, onClick, disabled }) => {
	return (
		<button onClick={onClick} className="btn" disabled={disabled}>
			{children}
		</button>
	);
};

// Define expected prop types for the Button component
Button.propTypes = {
	children: PropTypes.node,
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};

export default Button;

import React from "react"
import { Button } from "react-bootstrap"
import classnames from "classnames"
import PropTypes from "prop-types"

const ButtonField = ({ className, disabled, error, id, label, style, onClick }) => {
	return (
		<Button
			className={classnames("button", className, { error })}
			id={id}
			disabled={disabled}
			style={style}
			onClick={onClick}
		>
			{label}
		</Button>
	)
}

ButtonField.propTypes = {
	disabled: PropTypes.bool,
	error: PropTypes.string,
	id: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired
}

export default ButtonField

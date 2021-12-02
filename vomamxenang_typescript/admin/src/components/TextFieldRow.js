import React from "react"
import classnames from "classnames"
import PropTypes from "prop-types"

const TextFieldRow = ({
  error,
  disabled,
  id,
  info,
  label,
  name,
  placeholder,
  type,
  value,
  onBlur,
  onChange,
}) => {
  return (
    <div className='form-group'>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        disabled={disabled}
        id={id}
        name={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
      />
      {info && <small className='form-text text-muted'>{info}</small>}
      {error && <div className='invalid-feedback'>{error}</div>}
    </div>
  )
}

TextFieldRow.propTypes = {
  disabled: PropTypes.string,
  error: PropTypes.string,
  info: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
}

TextFieldRow.defaultProps = {
  type: "text",
}

export default TextFieldRow

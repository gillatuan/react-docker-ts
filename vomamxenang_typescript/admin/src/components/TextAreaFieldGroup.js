import {
  CFormGroup,
  CFormText,
  CInvalidFeedback,
  CTextarea,
  CLabel,
} from '@coreui/react'

const TextAreaFieldGroup = ({
  className,
  disabled,
  error,
  id,
  info,
  label,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <CFormGroup>
      <CLabel htmlFor={id}>{label}</CLabel>
      <CTextarea
        className={className}
        disabled={disabled}
        id={id}
        invalid={error}
        name={name}
        placeholder={placeholder}
        rows="9"
        value={value}
        onChange={onChange}
      />

      {info && <CFormText className="help-block">{info}</CFormText>}
      {error && <CInvalidFeedback>{error}</CInvalidFeedback>}
    </CFormGroup>
  )
}

export default TextAreaFieldGroup

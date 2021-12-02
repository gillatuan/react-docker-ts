import React, { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

import InputElement from 'components/FormField/Input/InputField/InputElement';
import { ICustomInputEvent, IInputFieldProps } from 'components/FormField/Input/InputType';

import { TEXT_AREA, TEXT_AREA_PROPERTY, DEFAULT_MAX_LENGTH_INPUT } from 'constants/index';

import './Field.scss';

const InputField: React.FC<IInputFieldProps & ICustomInputEvent> = (props) => {
  const { t } = useTranslation();
  const {
    autoComplete,
    checked,
    children,
    component,
    disabled,
    errorText,
    id,
    invalid,
    label,
    multiple,
    name,
    placeholder,
    style,
    touched,
    type,
    value = '',
    maxLength,
    readOnly,
    onChange,
    onKeyDown,
    onBlur
  } = props;
  const updateMaxLength =
    component === TEXT_AREA && maxLength === DEFAULT_MAX_LENGTH_INPUT ? TEXT_AREA_PROPERTY.MAX_LENGTH : maxLength;
    
  return (
    <Fragment>
      {/* is not checkbox and radio */}
      <div>
        <InputElement
          autoComplete={autoComplete}
          checked={checked}
          disabled={disabled}
          id={id}
          invalid={invalid}
          label={label}
          multiple={multiple}
          name={name}
          placeholder={placeholder}
          style={style}
          type={type}
          value={value}
          maxLength={updateMaxLength}
          readOnly={readOnly}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        >
          {children}
        </InputElement>
      </div>

      {/* show error */}
      <div className="text-error">
        {/* show error text while only touched or processing handle change */}
        {touched && errorText && <div className="text-danger">{t(errorText)}</div>}
      </div>
    </Fragment>
  );
};

InputField.defaultProps = {
  maxLength: 100
};

export default InputField;

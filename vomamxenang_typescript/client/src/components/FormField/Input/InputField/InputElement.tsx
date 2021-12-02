import React, { Fragment, useState } from 'react';
import { useField, Field } from 'formik';
import { Input } from 'reactstrap';

import { ICustomInputEvent, IInputFieldProps, TTargetOption } from 'components/FormField/Input/InputType';
import { CLASS_NAME } from 'constants/index';

import 'components/FormField/Input/InputField/Field.scss';

const InputElement: React.FC<IInputFieldProps & ICustomInputEvent> = (props) => {
  const {
    checked,
    children,
    component,
    disabled,
    errorText,
    id,
    invalid,
    label,
    maxLength,
    multiple,
    name,
    placeholder,
    style,
    type,
    value,
    readOnly,
    onChange,
    onKeyDown
  } = props;
  const [, , helpers] = useField({ name });
  const { setValue } = helpers;
  const [inputValue, setInputValue] = useState(value || '');

  const handleChange = (e: React.FormEvent<HTMLInputElement | any>) => {
    // remove Warning: This synthetic event is reused for performance reasons happening
    e.persist();

    let getValue = null;
    // get currentTarget event
    const currTarget = e.currentTarget;
    const currTargetValue = currTarget.value;
    const currTargetOptions = currTarget.options;
    const currTargetChecked = currTarget.checked;
    const currTargetValidity = currTarget.validity;

    if (type !== 'checkbox' && type !== 'radio' && type !== 'range' && type !== 'select') {
      if (multiple) {
        getValue = currTargetOptions
          .filter((opt: TTargetOption) => opt.selected)
          .map((opt: TTargetOption) => opt.value);
      } else {
        getValue = currTargetValue;
      }
    } else {
      getValue = currTargetChecked;
    }

    // set value to state to display on field
    setInputValue(getValue);
    // set value to formik to handle validation
    setValue(getValue);

    // validate field
    const isValidValue = currTargetValidity && currTargetValidity.valid;
    if (!errorText && isValidValue) {
      // call api if have onChange fn
      if (onChange) {
        onChange(e);
      }
    }
  };

  return (
    <Fragment>
      <Input
        className={`${readOnly ? CLASS_NAME.READONLY : ''}`}
        checked={checked}
        component={component}
        disabled={disabled}
        id={id}
        invalid={invalid}
        maxLength={maxLength}
        multiple={multiple}
        name={name}
        placeholder={placeholder}
        style={style}
        tag={Field}
        type={type}
        value={inputValue}
        readOnly={readOnly}
        onChange={handleChange}
        onKeyDown={onKeyDown}
      >
        {children}
      </Input>
      {label}
    </Fragment>
  );
};

export default InputElement;

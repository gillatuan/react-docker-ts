import React from 'react'
import * as Yup from 'yup'
import withFormik from 'storybook-formik'
import { storiesOf } from '@storybook/react'

// import Components
import InputField from 'components/FormField/Input/InputField/InputField'

const textValidationSchema = Yup.object({
  text: Yup.string().required('Is Required Field'),
  email: Yup.string().required('Is Required Field').email(),
})
const handleFormik = {
  formik: {
    initialValues: {
      checkbox: false,
      date: '2020-01-01',
      email: 'test@gmail.com',
      file: '',
      radio: false,
      text: 'test',
      select_multiple: [],
    },
    validationSchema: textValidationSchema,
  },
}

storiesOf('InputField', module)
  .addDecorator(withFormik)
  .add(
    'default',
    () => (
      <InputField
        component="input"
        errorText=""
        id="input-field"
        key="default"
        name="text"
        touched={true}
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'disable',
    () => (
      <InputField
        component="input"
        errorText=""
        disabled={true}
        id="input-field"
        key="disable"
        touched={true}
        name="text"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=email',
    () => (
      <InputField
        component="input"
        errorText=""
        id="email"
        key="email"
        name="emaile"
        touched={true}
        type="email"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=select',
    () => (
      <InputField
        component="select"
        errorText=""
        id="select"
        key="select"
        name="text"
        touched={true}
      >
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
      </InputField>
    ),
    handleFormik
  )
  .add(
    'with type=select_multiple',
    () => (
      <InputField
        component="select"
        errorText=""
        id="select_multiple"
        key="select_multiple"
        name="select_multiple"
        multiple={true}
        touched={true}
        type="select"
      >
        <option value="1">One</option>
        <option value="2">Two</option>
        <option value="3">Three</option>
        <option value="4">Four</option>
      </InputField>
    ),
    handleFormik
  )
  .add(
    'with type=file',
    () => (
      <InputField
        component="input"
        errorText=""
        id="input-field"
        key="file"
        name="file"
        touched={true}
        type="file"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=textarea',
    () => (
      <InputField
        component="textarea"
        errorText=""
        id="input-field"
        key="textarea"
        name="text"
        value=""
        touched={true}
        type="textarea"
      />
    ),
    handleFormik
  )
  .add(
    'with type=search',
    () => (
      <InputField
        component="input"
        errorText=""
        id="input-field"
        key="search"
        name="text"
        touched={true}
        type="search"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=image',
    () => (
      <InputField
        component="input"
        errorText=""
        id="input-field"
        key="image"
        name="text"
        touched={true}
        type="image"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=number',
    () => (
      <InputField
        component="input"
        errorText=""
        id="input-field"
        key="number"
        name="text"
        touched={true}
        type="number"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=date',
    () => (
      <InputField
        component="input"
        errorText=""
        id="input-field"
        key="date"
        name="date"
        touched={true}
        type="date"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=checkbox',
    () => (
      <InputField
        component="input"
        errorText=""
        id="checkbox"
        key="checkbox"
        label="Uncheck Checkbox"
        name="checkbox"
        touched={true}
        type="checkbox"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with type=Disabled Checkbox',
    () => (
      <InputField
        component="input"
        errorText=""
        checked={false}
        disabled={true}
        id="input-fe"
        touched={true}
        key="disabled_checkbox"
        label="Disabled Checkbox"
        name="checkbox"
        type="checkbox"
        value=""
      />
    ),
    handleFormik
  )
  .add(
    'with placeholder',
    () => (
      <InputField
        component="input"
        errorText=""
        id="input-checkbox"
        key="placeholder"
        name="text"
        placeholder="Input your name"
        touched={true}
        value=""
        />
        ),
    handleFormik
  )

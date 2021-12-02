import { FormikBag } from 'formik'

import { RegisterFormValues, OtherProps } from 'pages/Register/RegisterTypes.d'

import { checkValueError, validationRules } from 'utils/validation/validation'
import { convertValidateField } from 'utils/MyUtils'

import { ObjField } from 'constants/types'

export const listRegisterFields: ObjField = {
  email: {
    fieldName: 'email',
    validationRules: validationRules.email,
    fieldInput: 'input',
    fieldLabel: 'Email',
    fieldValue: '',
    fieldType: 'email',
  },
  firstname: {
    fieldName: 'firstname',
    validationRules: validationRules.required,
    fieldInput: 'input',
    fieldLabel: 'First Name',
    fieldValue: '',
    fieldType: 'text',
  },
  lastname: {
    fieldName: 'lastname',
    validationRules: validationRules.required,
    fieldInput: 'input',
    fieldLabel: 'Last Name',
    fieldValue: '',
    fieldType: 'text',
  },
}
export const listRegisterFieldsPassword: ObjField = {
  password: {
    fieldName: 'password',
    validationRules: validationRules.password,
    fieldInput: 'input',
    fieldLabel: 'Password',
    fieldValue: '',
    fieldType: 'password',
  },
  confirmPassword: {
    fieldName: 'confirmPassword',
    validationRules: validationRules.password,
    fieldInput: 'input',
    fieldLabel: 'Confirm Password',
    fieldValue: '',
    fieldType: 'password',
  },
}

export const onSubmit = async (
  values: RegisterFormValues,
  { setErrors, props, setSubmitting }: FormikBag<OtherProps, RegisterFormValues>
) => {
  setSubmitting(true)

  try {
    if (values.password !== values.confirmPassword) {
      setErrors({ password: 'Password / Confirm password is not matched' })

      return
    }
    await props.handleSubmit(values)
  } catch (error) {
    setErrors(error.data)
  } finally {
    setSubmitting(false)
  }
}

export const formikAction = {
  mapPropsToValues: () => {
    return {
      email: '',
      firstname: '',
      lastname: '',
      password: '',
    }
  },
  validate: checkValueError(
    convertValidateField({
      ...listRegisterFields,
      ...listRegisterFieldsPassword,
    })
  ),
  handleSubmit: onSubmit,
}

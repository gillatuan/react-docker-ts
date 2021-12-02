import { FormikBag } from "formik"

import {
  checkValueError,
  validationRules,
} from 'utils/validation/validation'
import { FormFields, LoginFormProps, LoginFormValues, OtherProps } from "views/pages/login/LoginTypes.d"
import { ObjField } from "constants/types"
import { convertValidateField } from "utils/MyUtils"

export const listFields: ObjField = {
  email: {
    fieldName: 'email',
    validationRules: validationRules.email,
    fieldInput: 'input',
    fieldLabel: 'Email',
    fieldValue: '',
    fieldType: 'email',
  },
  password: {
    fieldName: 'password',
    validationRules: validationRules.password,
    fieldInput: 'input',
    fieldLabel: 'Password',
    fieldValue: '',
    fieldType: 'password',
  },
}

export const onSubmit = async (
  values: LoginFormValues,
  {
    setErrors,
    props,
    setSubmitting,
  }: FormikBag<LoginFormProps & OtherProps, LoginFormValues>
) => {
  setSubmitting(true)

  try {
    await props.login(values)
  } catch (error: any) {
      setErrors(error.data)
  } finally {
    setSubmitting(false)
  }
}

export const formikAction = {
  mapPropsToValues: (props: FormFields) => {
    return {
      email: '',
      password: '',
    }
  },
  validate: checkValueError(convertValidateField(listFields)),
  handleSubmit: onSubmit,
}
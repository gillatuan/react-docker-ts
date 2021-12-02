import React, { FormEvent, Fragment } from 'react'

import CIcon from '@coreui/icons-react'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CForm,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
} from '@coreui/react'

import { useTranslation } from 'react-i18next'
import { FormikProps, withFormik } from 'formik'
import { isEmpty, map } from 'lodash'

import {
  FormFields,
  LoginFormProps,
  LoginFormValues,
  OtherProps,
} from 'views/pages/login/LoginTypes.d'
import InputField from 'components/FormField/Input/InputField/InputField'

import { formikAction } from './formikAction'

const LoginFormInner = (
  props: FormFields & LoginFormProps & OtherProps & FormikProps<LoginFormValues>
) => {
  const { formFields, errors, isSuccess, touched, handleSubmit, setFieldValue, setFieldTouched } = props
  const { t } = useTranslation()

  let isDisabled = true
  if (isEmpty(errors)) {
    isDisabled = false
  }

  const onChangeInput = (e: FormEvent<HTMLInputElement | any>) => {
    e.persist()

    formFields[e.currentTarget.id].fieldValue = e.currentTarget.value

    // set to form field
    setFieldValue(e.currentTarget.id, e.currentTarget.value)
  }
  const onBlurInput = (e: FormEvent<HTMLInputElement | any>) => {
    e.persist()
    
    setFieldTouched(e.currentTarget.id, true)
  }

  const generateFields = () => {
    return map(formFields, (item: any, key: string) => {
      const fieldLabel = key.toUpperCase()
      const fieldName = key
      const fieldType = (key === 'email' && 'text') || 'password'
      const fieldIcon = (key === 'email' && 'cil-user') || 'cil-lock-locked'
      let fieldErrored = errors && errors.password
      let fieldTouched = touched && touched.password
      if (key === 'email') {
        fieldErrored = errors && errors.email
        fieldTouched = touched && touched.email
      }
      const isValid = (fieldTouched && fieldErrored && true) || false
      const placeholder = t(`PLACEHOLDER_${fieldLabel}`)

      return (
        <CInputGroup key={key} className="mb-3">
          <CInputGroupPrepend>
            <CInputGroupText>
              <CIcon name={fieldIcon} />
            </CInputGroupText>
          </CInputGroupPrepend>
          <InputField
            autoComplete=""
            component="input"
            errorText={fieldErrored}
            id={fieldName}
            invalid={isValid}
            name={fieldName}
            placeholder={placeholder}
            touched={fieldTouched}
            type={fieldType}
            onChange={onChangeInput}
            onBlur={onBlurInput}
          />
        </CInputGroup>
      )
    })
  }

  const onSubmitForm = () => {
    handleSubmit()
  }

  let clsMessage = 'text-danger'
  if (isSuccess) {
    clsMessage = 'text-success'
  }
  return (
    <Fragment>
      <CCard className="p-4">
        <CCardBody>
          <CForm>
            <h1>Login</h1>
            <p className="text-muted">Sign In to your account</p>
            <p className={clsMessage}>{props.message}</p>
            {generateFields()}
            <CRow>
              <CCol xs="6">
                <CButton color="primary" className="px-4" disabled={isDisabled} onClick={onSubmitForm}>
                  Login
                </CButton>
              </CCol>
              <CCol xs="6" className="text-right">
                <CButton color="link" className="px-0">
                  Forgot password?
                </CButton>
              </CCol>
            </CRow>
          </CForm>
        </CCardBody>
      </CCard>
    </Fragment>
  )
}

const LoginForm = withFormik<
  FormFields & LoginFormProps & OtherProps,
  LoginFormValues
>(formikAction)(LoginFormInner)

export default LoginForm

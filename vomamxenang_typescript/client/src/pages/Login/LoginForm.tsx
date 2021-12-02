import React, { FormEvent, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { FormikProps, withFormik } from 'formik'
import { isEmpty, map } from 'lodash'

import { FormFields, LoginFormProps, LoginFormValues, OtherProps } from 'pages/Login/LoginTypes.d'
import InputField from 'components/FormField/Input/InputField/InputField'

import { ObjField } from 'constants/types'
import { formikAction } from "./formikAction"

const LoginFormInner = (
  props: FormFields & LoginFormProps & OtherProps & FormikProps<LoginFormValues>
) => {
  const {
    formFields,
    errors,
    touched,
    setFieldValue,
    handleSubmit,
  } = props
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

  const generateFields = (
    data: ObjField,
    colLabel: string,
    colInput: string
  ) => {
    return map(data, (item: any, key: string) => {
      const fieldLabel = key.toUpperCase()
      const fieldName = key
      const fieldType = (key === 'email' && 'text') || 'password'
      let fieldErrored = errors && errors.password
      let fieldTouched = touched && touched.password
      if (key === 'email') {
        fieldErrored = errors && errors.email
        fieldTouched = touched && touched.email
      }
      const isValid = fieldTouched && fieldErrored && true || false
      const placeholder = t(`PLACEHOLDER_${fieldLabel}`)

      return (
        <div key={key} className="form-group">
          <label htmlFor={fieldName} className={`${colLabel} control-label`}>
            {fieldLabel} <span className="require">*</span>
          </label>
          <div className={`${colInput}`}>
            <InputField
              component="input"
              errorText={fieldErrored}
              id={fieldName}
              invalid={isValid}
              name={fieldName}
              placeholder={placeholder}
              touched={fieldTouched}
              type={fieldType}
              value=""
              onChange={onChangeInput}
            />
          </div>
        </div>
      )
    })
  }

  const onSubmitForm = () => {
    handleSubmit()
  }

  return (
    <Fragment>
      <div className="col-md-9 col-sm-9">
        <h1>Login</h1>
        <div className="content-form-page">
          <div className="row">
            <div className="col-md-7 col-sm-7">
              <form className="form-horizontal form-without-legend" role="form">
                {generateFields(formFields, 'col-lg-4', 'col-lg-8')}

                <div className="row">
                  <div className="col-lg-8 col-md-offset-4 padding-left-0">
                    <a href="page-forgotton-password.html">Forget Password?</a>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-offset-4 padding-left-0 padding-top-20">
                    <button
                      className="btn btn-primary"
                      disabled={isDisabled}
                      type="button"
                      onClick={onSubmitForm}
                    >
                      Login
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-offset-4 padding-left-0 padding-top-10 padding-right-30">
                    <hr />
                    <div className="login-socio">
                      <p className="text-muted">or login using:</p>
                      <ul className="social-icons">
                        <li>
                          <a
                            href=""
                            data-original-title="facebook"
                            className="facebook"
                            title="facebook"
                          ></a>
                        </li>
                        <li>
                          <a
                            href=""
                            data-original-title="Twitter"
                            className="twitter"
                            title="Twitter"
                          ></a>
                        </li>
                        <li>
                          <a
                            href=""
                            data-original-title="Google Plus"
                            className="googleplus"
                            title="Google Plus"
                          ></a>
                        </li>
                        <li>
                          <a
                            href=""
                            data-original-title="Linkedin"
                            className="linkedin"
                            title="LinkedIn"
                          ></a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="col-md-4 col-sm-4 pull-right">
              <div className="form-info">
                <h2>
                  <em>Important</em> Information
                </h2>
                <p>
                  Duis autem vel eum iriure at dolor vulputate velit esse vel
                  molestie at dolore.
                </p>

                <button type="button" className="btn btn-default">
                  More details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

const LoginForm = withFormik<
  FormFields & LoginFormProps & OtherProps,
  LoginFormValues
>(formikAction)(LoginFormInner)

export default LoginForm

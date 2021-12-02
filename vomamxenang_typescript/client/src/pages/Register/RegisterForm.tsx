import React, { FormEvent } from 'react'
import { useTranslation } from 'react-i18next'

import { FormikProps, withFormik } from 'formik'
import { map } from 'lodash'

import { listRegisterFields, listRegisterFieldsPassword } from 'pages/Register/formikAction'
import {
  RegisterFormValues,
  OtherProps,
} from 'pages/Register/RegisterTypes.d'
import { formikAction } from 'pages/Register/formikAction'

import { ObjField } from 'constants/types'
import InputField from 'components/FormField/Input/InputField/InputField'

const RegisterFormInner = (props: OtherProps & FormikProps<RegisterFormValues>) => {
  const { errors, touched, setFieldValue, handleSubmit } = props
  const { t } = useTranslation()

  const onChangeInput = (e: FormEvent<HTMLInputElement | any>) => {
    // set to form field
    setFieldValue(e.currentTarget.id, e.currentTarget.value)
  }

  const generateFields = (
    data: ObjField,
    colLabel: string,
    colInput: string
  ) => {
    return map(data, (item: any, key: string) => {
      const fieldLabel = key.toLocaleUpperCase()
      const fieldName = item.fieldName
      const fieldType = item.fieldType
      const fieldErrored = errors && errors[fieldName]
      const fieldTouched = touched && touched[fieldName]
      
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
    <div className="col-md-9 col-sm-9">
      <h1>Create an account</h1>
      <div className="content-form-page">
        <div className="row">
          <div className="col-md-7 col-sm-7">
            <form className="form-horizontal" role="form">
              <fieldset>
                <legend>Your personal details</legend>
                {generateFields(listRegisterFields, 'col-lg-4', 'col-lg-8')}
              </fieldset>
              <fieldset>
                <legend>Your password</legend>
                {generateFields(listRegisterFieldsPassword, 'col-lg-4', 'col-lg-8')}
              </fieldset>
              <fieldset>
                <legend>Newsletter</legend>
                <div className="checkbox form-group">
                  <label>
                    <div className="col-lg-4 col-sm-4">
                      Singup for Newsletter
                    </div>
                    <div className="col-lg-8 col-sm-8">
                      <input type="checkbox" />
                    </div>
                  </label>
                </div>
              </fieldset>
              <div className="row">
                <div className="col-lg-8 col-md-offset-4 padding-left-0 padding-top-20">
                  <button type="button" className="btn btn-primary" onClick={onSubmitForm}>
                    Create an account
                  </button>
                  <button type="button" className="btn btn-default">
                    Cancel
                  </button>
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
                Lorem ipsum dolor ut sit ame dolore adipiscing elit, sed sit
                nonumy nibh sed euismod ut laoreet dolore magna aliquarm erat
                sit volutpat. Nostrud exerci tation ullamcorper suscipit
                lobortis nisl aliquip commodo quat.
              </p>

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
  )
}

const RegisterForm = withFormik<
  OtherProps,
  RegisterFormValues
>(formikAction)(RegisterFormInner)

export default RegisterForm

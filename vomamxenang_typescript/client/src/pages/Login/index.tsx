import React, { FC, useContext, useEffect, useState } from 'react'
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import LoginForm from 'pages/Login/LoginForm'
import { listFields } from 'pages/Login/formikAction'
import { LoginFormValues } from 'pages/Login/LoginTypes.d'

import SidebarAuthen from 'modules/SidebarAuthen'

import Authentication from 'services/apis/Authentication'

import AuthContext from 'context/AuthContext'

import { setAuthToken } from 'utils/setAuthToken'

import { DECODED_LOGGED_USER } from 'App.d'

const Login: FC<RouteComponentProps> = () => {
  const { updateDataItem } = useContext(AuthContext)
  const history = useHistory()

  const [, setToken] = useState({})
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (localStorage.jwtToken) {
      // Decode token to get user data
      const decoded: DECODED_LOGGED_USER = jwt_decode(localStorage.jwtToken)
      updateDataItem(decoded.user)

      history.push('/')
    }
  }, [localStorage.jwtToken])

  const handleLogin = async (values: LoginFormValues) => {
    const auth = new Authentication()
    const resp = await auth.login(values)
    if (resp.success) {
      localStorage.setItem('jwtToken', resp.token)

      // Set token to Auth header
      setAuthToken(resp.token)
      setMessage('Login Successfully !!!')
    }

    return resp
  }

  const setCaptchaToken = (token: string) => {
    setToken(token)
  }

  return (
    <div className="row margin-bottom-40 login">
      <SidebarAuthen />

      <LoginForm
        failedTimes={0}
        login={handleLogin}
        message={message}
        formFields={listFields}
        setCaptchaToken={(token: string) => setCaptchaToken(token)}
      />
    </div>
  )
}

export default withRouter(Login)

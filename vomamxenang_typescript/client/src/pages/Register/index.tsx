import React, { FC } from 'react'
import { withRouter, RouteComponentProps, useHistory } from 'react-router-dom'

import RegisterForm from 'pages/Register/RegisterForm'
import { RegisterFormValues } from 'pages/Register/RegisterTypes.d'

import Breadcrumbs from 'modules/Breadcrumbs'
import SidebarAuthen from 'modules/SidebarAuthen'

import Authentication from "services/apis/Authentication"

const Register: FC<RouteComponentProps> = () => {
  const history = useHistory()
  const handleSubmit = async (values: RegisterFormValues) => {
    const auth = new Authentication()
    const resp = await auth.register(values)
    if (resp.success) {
      history.push('/login')
    }

    return resp
  }

  return (
    <>
      <Breadcrumbs />
      <div className="row margin-bottom-40 register">
        <SidebarAuthen />

        <RegisterForm
          handleSubmit={handleSubmit}
        />
      </div>
    </>
  )
}

export default withRouter(Register)
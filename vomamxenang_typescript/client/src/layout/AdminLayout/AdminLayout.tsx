import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import jwt_decode from 'jwt-decode'

import { DECODED_LOGGED_USER } from 'App.d'

import 'layout/AdminLayout/AdminLayout.scss'

const AdminLayout: React.FC = ({ children }) => {
  const history = useHistory()

  useEffect(() => {
    let isAuthorized = false
    if (localStorage.jwtToken) {
      // Decode token to get user data
      const decoded: DECODED_LOGGED_USER = jwt_decode(localStorage.jwtToken)
      if (decoded.user.role === 1) {
        isAuthorized = true
      }
    }

    if (!isAuthorized) {
      history.push('/')
    }
  }, [localStorage.jwtToken])

  return (
    <div className="fullscreen admin-layout">
      <div className="fullscreen__section fullscreen__section--center">
        <div className="fullscreen__section__child admin-layout-content">
          {children}
        </div>
      </div>
    </div>
  )
}

export default AdminLayout

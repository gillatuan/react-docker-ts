import { useContext, useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CRow
} from '@coreui/react'

import jwt_decode from 'jwt-decode'

import Authentication from 'services/apis/Authentication'

import AuthContext from 'context/AuthContext'

import { listFields } from 'views/pages/login/formikAction'
import { setAuthToken } from 'utils/setAuthToken'
import LoginForm from 'views/pages/login/LoginForm'
import { MESSAGE } from 'constants/index'

const Login = (props) => {  
  const { message, updateDataItem, setMessage, setLoading } = useContext(AuthContext)
  const history = useHistory()

  const [, setToken] = useState({})
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    if (localStorage.jwtToken) {
      // Decode token to get user data
      let timeRedirect = 100
      if (isSuccess) {
        timeRedirect = 2000
      }
      
      setTimeout(() => {
        history.push('/')
      }, timeRedirect)
    }
  }, [history, isSuccess])

  const handleLogin = async (values) => {
    setLoading(true)
    const auth = new Authentication()
    const resp = await auth.login(values)

    // set resp data
    let msg = ''
    
    if (resp.success) {
      // Set token to Auth header
      localStorage.setItem('jwtToken', resp.token)
      localStorage.setItem('timeout', resp.timeout)

      const decoded = jwt_decode(resp.token)
      updateDataItem(decoded.user)

      msg = MESSAGE.LOGIN_SUCCESS
      
      setAuthToken(resp.token)
      setIsSuccess(true)
    } else {
      msg = resp.response.data.msg
    }

    setMessage(msg)
    setLoading(false)
  }

  const setCaptchaToken = (token) => {
    setToken(token)
  }

  return (
      <CContainer className="c-app c-default-layout flex-row align-items-center">
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <LoginForm
                failedTimes={0}
                isSuccess={isSuccess}
                login={handleLogin}
                message={message}
                formFields={listFields}
                setCaptchaToken={(token) => setCaptchaToken(token)}
              />
              <CCard className="text-white bg-primary py-5 d-md-down-none" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut
                    labore et dolore magna aliqua.</p>
                  <Link to="/register">
                    <CButton color="primary" className="mt-3" active tabIndex={-1}>Register Now!</CButton>
                  </Link>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
  )
}

export default Login

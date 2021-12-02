import { useContext, useEffect } from 'react'
import { CAlert } from '@coreui/react'
import jwt_decode from 'jwt-decode'

import { TheSidebar, TheFooter } from 'containers'

import AuthContext from 'context/AuthContext'

import MyHeader from 'containers/MyLayout/MyHeader'
import MyContent from 'containers/MyLayout/MyContent'
import Spinner from 'components/Spinner'

const MyLayout = (props) => {
  const { errorMsg, loading, message, setErrorMsg, setMessage } = useContext(AuthContext)
  useEffect(() => {
    let isAuthorized = false
    if (localStorage.jwtToken) {
      // Decode token to get user data
      const decoded = jwt_decode(localStorage.jwtToken)
      if (decoded.user.role === 1) {
        isAuthorized = true

        // if is time out, clear localstorage
        const now = new Date().getTime()
        if (decoded.exp * 1000 < now) {
          isAuthorized = false

          localStorage.clear()
        }
      }
    }

    if (!isAuthorized) {
      props.history.push('/login')
    }
  }, [props.history])

  useEffect(() => {
    const timeoutID = setTimeout(() => {
      setMessage('')
    }, 3000)

    return () => clearTimeout(timeoutID)
  }, [message, setMessage])
  useEffect(() => {
    const timeoutErrorID = setTimeout(() => {
      setErrorMsg('')
      if (errorMsg === 'Token is not valid') {
        localStorage.clear()
        window.location.href = '/login'
      }
    }, 3000)

    return () => clearTimeout(timeoutErrorID)
  }, [errorMsg, setErrorMsg])

  return (
    <div className="c-app c-default-layout">
      <TheSidebar />
      <div className="c-wrapper">
        <MyHeader />
        <div className="c-body">
          {errorMsg && <CAlert color="danger">{errorMsg}</CAlert>}
          {message && <CAlert color="success">{message}</CAlert>}
          <MyContent />
          <Spinner loading={loading} />
        </div>
        <TheFooter />
      </div>
    </div>
  )
}

export default MyLayout

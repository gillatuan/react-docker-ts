import React from "react"
import { Route } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import Spinner from "./Spinner"
import LayoutAdmin from "../../layout/admin/LayoutAdmin"
import Login from "../admin/Auth/Login"

const PrivateRoute = ({ component: Component, auth, loadingStatus, ...rest }) => {
  const pathname = rest.location.pathname

  let isNeedToLogin = false
  if (pathname.indexOf("/api") >= 0) {
    isNeedToLogin = true
  }

  return (
    <Route
      {...rest}
      render={(props) => {
        let renderLayout = <Component />
        if (isNeedToLogin) {
          if (!auth.isAuthenticated) {
            renderLayout = <Login />
          }
          if (auth.isAuthenticated) {
            renderLayout = (
              <LayoutAdmin pathname={pathname}>
                <Component {...props} />

                <Spinner loadingStatus={loadingStatus} />
              </LayoutAdmin>
            )
          }
        }

        return renderLayout
      }}
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    loadingStatus: state.common.loadingStatus,
    messageErr: state.common.messageErr,
  }
}

export default connect(mapStateToProps)(PrivateRoute)

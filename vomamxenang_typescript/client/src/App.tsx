import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

// import Navbar from "./layout/Navbar"
import withLayout from 'layout/withLayout'
import AnonymousUserLayout from 'layout/AnonymousUserLayout/AnonymousUserLayout'
import MainLayout from 'layout/MainLayout/MainLayout'

import Landing from 'pages/Landing'
import Login from 'pages/Login'
import NotFound from 'pages/NotFound'

import { LOGGED_USER } from 'App.d'
import AuthContext from 'context/AuthContext'
import Register from 'pages/Register'
import AdminLayout from 'layout/AdminLayout/AdminLayout'
import Modules from 'pages/admin/Modules'

const LOGGED_USER_DEF: LOGGED_USER = {
  avatar: '',
  email: '',
  deleted: false,
  id: '',
  is_online: false,
  name: '',
  role: 2,
  status: false,
}
const App = () => {
  const [dataItem, setDataItem] = useState(LOGGED_USER_DEF)
  const updateDataItem = (item: LOGGED_USER) => {
    setDataItem(item)
  }

  const dataItemContext = {
    dataItem,
    updateDataItem,
  }

  return (
    <Router>
      <AuthContext.Provider value={dataItemContext}>
        <Switch>
          <Route
            exact
            path="/login"
            component={withLayout(MainLayout, () => (
              <Login />
            ))}
          />
          <Route
            exact
            path="/register"
            component={withLayout(MainLayout, () => (
              <Register />
            ))}
          />
          <Route
            exact
            path="/"
            component={withLayout(MainLayout, () => (
              <Landing />
            ))}
          />
          <Route
            path="/admin/modules/:action"
            component={withLayout(AdminLayout, (props: any) => {
              let id = ''
              if (props.match.params.action === 'edit' || props.match.params.action === 'delete') {
                // get id
                id = props.location.pathname.replace(props.match.url + '/', '') 
              }
              
              return (
                <Modules {...props} id={id} />
              )
            })}
          />
          <Route
            path="*"
            component={withLayout(AnonymousUserLayout, () => (
              <NotFound />
            ))}
          />
        </Switch>
      </AuthContext.Provider>
    </Router>
  )
}

export default App

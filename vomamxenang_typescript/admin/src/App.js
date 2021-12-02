import React, { useState } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import AuthContext from "context/AuthContext"
// import ErrorBoundary from 'containers/MyLayout/ErrorBoundary'

import './scss/style.scss'
import Spinner from 'components/Spinner';

// Containers
// const TheLayout = React.lazy(() => import('./containers/TheLayout'));
const MyLayout = React.lazy(() => import('./containers/MyLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));

const LOGGED_USER_DEF = {
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
  const [errorMsg, setErrorMsg] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const updateDataItem = (item) => {
    setDataItem(item)
  }

  const dataItemContext = {
    dataItem,
    updateDataItem,
    errorMsg,
    setErrorMsg,
    message,
    setMessage,
    loading,
    setLoading
  }

  return (
    <AuthContext.Provider value={dataItemContext}>
      <HashRouter>
          <React.Suspense fallback={<div>Loading Route</div>}>
            <Switch>
              <Route exact path="/login" name="Login Page" render={props => <Login {...props}/>} />
              <Route exact path="/register" name="Register Page" render={props => <Register {...props}/>} />
              <Route exact path="/404" name="Page 404" render={props => <Page404 {...props}/>} />
              <Route exact path="/500" name="Page 500" render={props => <Page500 {...props}/>} />
              <Route path="/" name="My Home" render={props => (
                // <ErrorBoundary>
                  <MyLayout {...props}/>
                // </ErrorBoundary>
              )} />
              {/* <Route path="/" name="Home" render={props => <TheLayout {...props}/>} /> */}
            </Switch>
          </React.Suspense>
      </HashRouter>
    </AuthContext.Provider>
  );
}

export default App;

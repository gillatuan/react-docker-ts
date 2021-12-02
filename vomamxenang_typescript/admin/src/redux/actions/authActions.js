import axios from "axios"
import jwt_decode from "jwt-decode"

import setAuthToken from "utils/setAuthToken"

import { getError, loading } from "redux/actions/common"
import { SET_CURRENT_USER } from "redux/constants/types"

import { API_SERVER } from "config"

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post(API_SERVER + "/api/users/register", userData)
    .then((res) => {
      history.push("/login")
    })
    .catch((err) => dispatch(getError(err.response.data.messageErr)))
}

// Login - Get User Token
export const loginUser = (userData) => (dispatch) => {
  dispatch(loading(true))

  axios
    .post(API_SERVER + "/api/users/login", userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data
      // Set token to ls
      localStorage.setItem("jwtToken", token)
      // Set token to Auth header
      setAuthToken(token)
      // Decode token to get user data
      const decoded = jwt_decode(token)
      // Set current user
      dispatch(setCurrentUser(decoded))
    })
    .catch((err) => {
      let messageErr = (err.response && err.response.data) || err.message
      dispatch(getError(messageErr))
    })
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  }
}

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken")
  // Remove auth header for future requests
  setAuthToken(false)
  // Set current user to {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}))
}

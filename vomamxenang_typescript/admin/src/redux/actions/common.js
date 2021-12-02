import { TOGGLE_LOADING, GET_ERRORS } from "redux/constants/types"

export const loading = (status) => {
  return {
    type: TOGGLE_LOADING,
    loadingStatus: status,
  }
}
export const getError = (error) => {
  return {
    type: GET_ERRORS,
    error,
  }
}

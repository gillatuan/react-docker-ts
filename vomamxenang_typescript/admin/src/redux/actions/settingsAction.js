import axios from "axios"

import { ADD_SETTING, CLEAR_SETTING_STATE, EDIT_SETTING, GET_SETTINGS, GET_SETTING, DELETE_SETTING } from "redux/constants/types"
import { getError, loading } from "redux/actions/common"

// Add Settings
export const addSettings = (settingsData) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataItem = null
    await axios
      .post("/api/settings/new", settingsData)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: ADD_SETTING,
          item: dataItem,
        })
      })
      .catch((err) => {
        dispatch(getError(err.response.data.messageErr))
        dispatch(loading(false))
      })

    if (dataItem) {
      dispatch(loading(false))
    }
  }
}

// update Settings
export const editSettings = (id, settingsData) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataItem = null
    await axios
      .put(`/api/settings/${id}`, settingsData)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: EDIT_SETTING,
          item: dataItem,
        })
      })
      .catch((err) => {
        let errmsg = ""
        if (err && err.response.data.err.codeName === "DuplicateKey") {
          errmsg = "Title is existing"
        }
        dispatch(getError(errmsg))
      })

    if (dataItem) {
      dispatch(loading(false))
    }
  }
}

export const getSettings = (page) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataList = null
    let url = (page && `/api/settings/list/${page}`) || `/api/settings/list/0`

    await axios
      .get(url)
      .then((res) => {
        dataList = res.data

        dispatch({
          type: GET_SETTINGS,
          items: dataList,
        })
      })
      .catch((err) => {
        dispatch(getError(err.response.data))
      })

    if (dataList) {
      dispatch(loading(false))
    }
  }
}

// Get Settings
export const getSetting = (id) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataItem = null
    await axios
      .get(`/api/settings/get/${id}`)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: GET_SETTING,
          data: dataItem,
        })
      })
      .catch((err) => {
        dispatch(getError(err.response.data))
      })

    if (dataItem) {
      dispatch(loading(false))
    }
  }
}
// Get Module by alias
export const getSettingsByAlias = (alias) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataList = null
    await axios
      .get(`/api/settings/get-item/${alias}`)
      .then((res) => {
        dataList = res.data

        dispatch({
          type: GET_SETTINGS,
          items: dataList,
        })
      })
      .catch((err) => {
        dispatch(getError(err.response.data))
      })

    if (dataList) {
      dispatch(loading(false))
    }
  }
}

// Delete Settings
export const deleteSettings = (id) => (dispatch) => {
  axios
    .delete(`/api/settings/delete-${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_SETTING,
        payload: id,
      }),
    )
    .catch((err) => dispatch(getError(err.response.data)))
}

export const updateStatus = (param) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataItem = null
    await axios
      .post("/api/settings/update-status", param)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: GET_SETTINGS,
          items: dataItem,
        })
      })
      .catch((err) => {
        dispatch(getError(err.response.data))
      })

    if (dataItem) {
      dispatch(loading(false))
    }
  }
}

export const clearSettingsState = () => {
  return {
    type: CLEAR_SETTING_STATE,
  }
}

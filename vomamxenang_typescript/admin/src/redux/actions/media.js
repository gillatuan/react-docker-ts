import axios from 'axios'

import {
  GET_LIST_MEDIA,
  GET_MEDIA,
  UPDATE_MEDIA,
} from 'redux/constants/types'
import { getError, loading } from 'redux/actions/common'
import Media from 'services/apis/Media'

// Add Post
export const uploadMedia = async (mediaFiles) => {
  const formData = new FormData()
  formData.append('file', mediaFiles)
  formData.append('title', mediaFiles.title)

  const url = `/api/media/upload`

  const obj = new Media()
  const resp = await obj.uploadItem(url, formData)

  debugger
  return resp
}

// update Media
export const updateMedia = (id, mediaData) => {
  return async (dispatch) => {
    dispatch(loading(true))

    const formData = new FormData()
    // when upload file, using Utils.upload.any() to request in server to process it
    formData.append('selectedFile', mediaData)

    // apply to req.body to server
    formData.append('title', mediaData.title)
    formData.append('filename', mediaData.name)
    formData.append('isPortrait', mediaData.isPortrait)

    let dataItem = null
    await axios
      .put(`/api/media/${id}`, formData)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: UPDATE_MEDIA,
          item: dataItem,
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

export const getListMedia = async (dataPost) => {
  const url = `/api/media/list`

  const obj = new Media()
  const resp = await obj.getItems(url, dataPost)

  return resp
}

// Get Media
export const getMedia = (id) => {
  return async (dispatch) => {
    dispatch(loading(true))

    await axios
      .get(`/api/media/get/${id}`)
      .then((res) => {
        dispatch({
          type: GET_MEDIA,
          data: res.data,
        })
      })
      .catch((err) => {
        let error = ''
        if (err.response) {
          error = err.response.data
        }

        if (err.stack) {
          error = err.stack
        }

        dispatch(getError(error))
      })

    dispatch(loading(false))
  }
}

export const updateStatus = (param) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataList = null
    await axios
      .post('/api/media/update-status', param)
      .then((res) => {
        dataList = res.data

        dispatch({
          type: GET_LIST_MEDIA,
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

export const deleteItem = (param) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataList = null
    await axios
      .post('/api/media/delete', param)
      .then((res) => {
        dataList = res.data

        dispatch({
          type: GET_LIST_MEDIA,
          payload: dataList,
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

import axios from "axios"

import { ADD_POST, CLEAR_POST_STATE, EDIT_POST, GET_POSTS, GET_POST, DELETE_POST } from "redux/constants/types"
import { getError, loading } from "redux/actions/common"
import Posts from 'services/apis/Posts'

// Add Post
export const addPost = (postData) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataItem = null
    await axios
      .post("/api/posts/new", postData)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: ADD_POST,
          item: dataItem,
        })
      })
      .catch((err) => {
        dispatch(getError(err.response.data.messageErr))
      })

    if (dataItem) {
      dispatch(loading(false))
    }
  }
}

// update Post
export const editPost = (id, postData) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataItem = null
    await axios
      .put(`/api/posts/${id}`, postData)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: EDIT_POST,
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

export const getPosts = async (dataPost) => {
  const url = `/api/posts/list`

  const obj = new Posts()
  const resp = await obj.getItems(url, dataPost)

  return resp
}

// Get Post
export const getPost = (id) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataItem = null
    await axios
      .get(`/api/posts/get/${id}`)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: GET_POST,
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
export const getPostByAlias = (alias) => {
  return async (dispatch) => {
    dispatch(loading(true))

    let dataList = null
    await axios
      .get(`/api/posts/get-item/${alias}`)
      .then((res) => {
        dataList = res.data

        dispatch({
          type: GET_POSTS,
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

// Delete Post
export const deletePost = (id) => (dispatch) => {
  axios
    .delete(`/api/posts/delete-${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
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
      .post("/api/posts/update-status", param)
      .then((res) => {
        dataItem = res.data

        dispatch({
          type: GET_POSTS,
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

export const clearPostState = () => {
  return {
    type: CLEAR_POST_STATE,
  }
}

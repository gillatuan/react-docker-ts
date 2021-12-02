import { GET_LIST_MEDIA } from 'redux/constants/types'

export const initialState = {
  data: null
}

export const ModuleReducer = (state, action = null) => {
  switch (action.type) {
    case GET_LIST_MEDIA:
      debugger

      break
    default:
      break
  }

  return state
}
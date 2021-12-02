interface LOGGED_USER {
  avatar: string,
  email: string,
  deleted: Boolean,
  id: string,
  is_online: Boolean,
  name: string,
  role: Number,
  status: Boolean,
}

interface DECODED_LOGGED_USER {
  [x: string]: LOGGED_USER
}

interface RESPONSE_AUTH {
  token: string,
  success: boolean,
}

export {
  DECODED_LOGGED_USER,
  LOGGED_USER
}
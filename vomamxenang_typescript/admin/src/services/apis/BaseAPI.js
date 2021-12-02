import axios from 'axios'
import * as Encrypt from 'utils/Encrypt'
import * as Storage from 'utils/Storage'

import { AUTHORIZATION, ENCRYPT_KEY, ERROR_UNAUTHORIZED_CODE, RESPONSE_SUCCESS_CODE } from 'constants/index'

export default class BaseAPI {
  constructor(baseURL = '') {
    console.log('process.env', process.env)
    this.originalURL = baseURL
  }
  connect(url) {
    this.baseURL = this.originalURL
    this.mParams = {}
    this.mHeaders = {}
    this.mBody = {}
    this.mURL = process.env.REACT_APP_API_SERVER + url
    this.mIsEncrypt = false
    this.mMethod = 'get' //default
    if (url && !url.startsWith('http')) {
      this.mHeaders = {
        Authorization: Storage.getCookieData(AUTHORIZATION, false),
      }
    }
    return this
  }

  addParam(key, value) {
    this.mParams[key] = value
    return this
  }

  addHeader(key, value) {
    this.mHeaders[key] = value
    return this
  }

  addBody(key, value) {
    this.mBody[key] = value
    return this
  }

  setBody(value) {
    this.mBody = value
    return this
  }

  appendBody(obj) {
    this.mBody = { ...this.mBody, ...obj }
    return this
  }

  setEncrypt(isEncrypt) {
    this.mIsEncrypt = isEncrypt
    return this
  }

  get() {
    this.mMethod = 'get'
    return this.request()
  }

  post() {
    this.mMethod = 'post'
    return this.request()
  }

  put() {
    this.mMethod = 'put'
    return this.request()
  }

  delete() {
    this.mMethod = 'delete'
    return this.request()
  }

  getParams() {
    var params = {}
    if (this.mIsEncrypt) {
      //encrypt data here
      var encodedParams = Encrypt.encryptData(this.mParams, ENCRYPT_KEY)
      //and then add to params
      params['params'] = encodedParams
    } else {
      params = this.mParams
    }
    return params
  }

  getHeader() {
    var headers = {}
    if (this.mIsEncrypt) {
      //encrypt data here
      var encodedHeader = Encrypt.encryptData(this.mHeaders, ENCRYPT_KEY)
      //and then add to header
      headers['params'] = encodedHeader
    } else {
      headers = this.mHeaders
    }
    return headers
  }

  getBody() {
    var body = {}
    if (this.mIsEncrypt) {
      //encrypt data here
      var encodedBody = Encrypt.encryptData(this.mBody, ENCRYPT_KEY)
      //and then add to body
      body['params'] = encodedBody
    } else {
      body = this.mBody
    }
    return body
  }

  request() {
    if (localStorage.jwtToken) {
      const token = localStorage.jwtToken.substr(7)
      this.addHeader('Authorization', token)
    }

    const params = {
      method: this.mMethod,
      url: this.mURL,
      params: this.getParams(),
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        ...this.getHeader(),
      },
      timeout: 30000,
      data: this.getBody(),
    }

    return axios(params)
      .then((res) => {
        if (res.status === RESPONSE_SUCCESS_CODE) {
          return res.data
        }

        if (res.response.status === ERROR_UNAUTHORIZED_CODE) {
          return res.response
        }

        return res
      })
      .catch((error) => {
        return error
      })
  }
}

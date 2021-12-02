import BaseAPI from './BaseAPI'

class Authentication extends BaseAPI {
  login(data) {
    return this.connect('/api/users/login')
      .appendBody(data)
      .post()
  }
  register(data) {
    return this.connect('/api/users/register')
      .appendBody(data)
      .post()
  }
}

export default Authentication
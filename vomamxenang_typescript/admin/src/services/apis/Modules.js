import BaseAPI from './BaseAPI'

class Modules extends BaseAPI {
  getItems(url, dataPost) {
    return this.connect(url)
      .appendBody(dataPost)
      .post()
  }
  createNew(url, dataPost) {
    return this.connect(url)
      .post(dataPost)
  }
  updateStatus(url, dataPut) {
    return this.connect(url)
      .appendBody(dataPut)
      .put()
  }
}

export default Modules
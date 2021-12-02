import BaseAPI from './BaseAPI'

class Posts extends BaseAPI {
  getItems(url, dataPost) {
    return this.connect(url).appendBody(dataPost).post()
  }

  uploadItem(url, dataPost) {
    return this.connect(url)
      .setBody(dataPost)
      .post()
  }
}

export default Posts

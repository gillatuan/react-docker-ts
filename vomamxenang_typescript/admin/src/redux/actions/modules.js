import Modules from 'services/apis/Modules'

export const createNew = (dataPost) => {
  const url = '/api/modules/new'
  const api = new Modules
  const resp = api.createNew(url, dataPost)
}
import dev from './development'
import qc from './qc'
import prod from './production'

export interface IConfig {
  API: {
    DOMAIN_HEROKU: string
  }
  LANG: string
}

let config: IConfig = { ...dev }

const env = process.env.REACT_APP_ENV
switch (env) {
  case 'dev':
    config = dev
    break
  case 'qc':
    config = qc
    break
  case 'prod':
    config = prod
    break
  default:
    break
}

export const isDevEnv = () => {
  return process.env.REACT_APP_ENV === 'dev'
}
export const SESSION_TIMEOUT = Number(process.env.REACT_APP_SESSION_TIMEOUT)
export const API_SERVER = config.API.DOMAIN_HEROKU
export {
  // Add common config values here
  env,
}

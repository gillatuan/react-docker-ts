import { IConfig } from 'config/index'

const CONFIG: IConfig = {
  API: {
    DOMAIN_HEROKU: `${process.env.REACT_APP_API_SERVER}`,
  },
  LANG: 'en',
}

export default CONFIG

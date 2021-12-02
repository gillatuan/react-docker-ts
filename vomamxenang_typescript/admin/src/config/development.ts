import { IConfig } from 'config'

const CONFIG: IConfig = {
  API: {
    DOMAIN_HEROKU: `${process.env.REACT_APP_API_SERVER}`,
  },
  LANG: 'en',
}

export default CONFIG

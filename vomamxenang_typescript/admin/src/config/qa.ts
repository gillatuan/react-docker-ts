import { IConfig } from './index';
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST;
const CONFIG: IConfig = {
  API: {
    DOMAIN_HEROKU: `${process.env.API_SERVER}`,
  },
  LANG: 'en',
};

export default CONFIG;

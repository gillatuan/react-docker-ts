import { IConfig } from './index';
const CONFIG: IConfig = {
  API: {
    DOMAIN_HEROKU: `${process.env.API_SERVER}`,
  },
  LANG: 'en',
};

export default CONFIG;

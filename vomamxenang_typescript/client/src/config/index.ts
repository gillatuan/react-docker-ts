import dev from './development';
import qc from './qc';
import prod from './production';

export interface IConfig {
  API: {
    CATEGORY_DATA_SERVICE: string;
    USER_SERVICE: string;
    EXPORT_SERVICE: string;
    UPLOAD_SERVICE: string;
    USER_SERVICE_LOGOUT: string;
    PERMISSION_SERVICE_GET_ALL: string;
    USER_SERVICE_SUGGESTION: string;
    USER_GROUP_SERVICE: string;
    USER_SERVICE_LOGIN: string;
    USER_SERVICE_REFRESH_TOKEN: string;
    USER_SERVICE_PERMISSION: string;
    CASTING_SERVICE: string;
    LICENSOR_SERVICE: string;
    CATALOGS_SERVICE: string;
    CATEGORIES_SERVICE: string;
    METATAG_TIPS_SERVICE: string;
    GENRES_SERVICE: string;
    CHANNELS_SERVICE: string;
    PAYMENT_GATEWAYS_SERVICE: string;
    PAYMENT_GATEWAYS_SERVICE_SUBSCRIPTION_PLANS: string;
    PAYMENT_GATEWAYS_SERVICE_SUBSCRIPTION_PRODUCTS: string;
    PAYMENT_GATEWAYS_SERVICE_RETRIAL_CONFIGS: string;
    ACTIVITY_LOG_SERVICE: string;
    RISK_ENGINE_SERVICE: string;
    RISK_ENGINE_RULES_ACTIVATE: string;
    RISK_ENGINE_RULES_DEACTIVATE: string;
    CATEGORY_SERVICE: string;
    SHOW_SERVICE: string;
  };
  LINK: {
    SHAHID_WEB: string;
  };
  LANG: string;
  GIGYA_KEY: string;
  SITE_NAME: string;
}

let config: IConfig = { ...dev };
const env = process.env.REACT_APP_ENV;
switch (env) {
  case 'dev':
    config = dev;
    break;
  case 'qc':
    config = qc;
    break;
  case 'prod':
    config = prod;
    break;
  default:
    break;
}

export const isDevEnv = () => {
  return process.env.REACT_APP_ENV === 'dev';
};
export const SESSION_TIMEOUT = Number(process.env.REACT_APP_SESSION_TIMEOUT);
export default {
  // Add common config values here
  env,
  ...config
};

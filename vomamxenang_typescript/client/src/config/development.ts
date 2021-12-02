import { IConfig } from './index';
const REACT_APP_API_HOST = process.env.REACT_APP_API_HOST || 'http://localhost:3004';
const CONFIG: IConfig = {
  API: {
    CATEGORY_DATA_SERVICE: `${REACT_APP_API_HOST}/bo-core/categorydata`,
    USER_SERVICE: `${REACT_APP_API_HOST}/bo-auth/users`,
    EXPORT_SERVICE: `${REACT_APP_API_HOST}/exportFiles`,
    USER_SERVICE_LOGOUT: `${REACT_APP_API_HOST}/bo-auth/logout`,
    USER_SERVICE_SUGGESTION: `${REACT_APP_API_HOST}/suggestion`,
    UPLOAD_SERVICE: `${REACT_APP_API_HOST}/upload`,
    USER_GROUP_SERVICE: `${REACT_APP_API_HOST}/bo-auth/usergroups`,
    USER_SERVICE_LOGIN: `${REACT_APP_API_HOST}/bo-auth/login`,
    USER_SERVICE_REFRESH_TOKEN: `${REACT_APP_API_HOST}/bo-auth/refresh-token`,
    USER_SERVICE_PERMISSION: `${REACT_APP_API_HOST}/bo-auth/user-permissions`,
    PERMISSION_SERVICE_GET_ALL: `${REACT_APP_API_HOST}/bo-auth/permissions`,
    LICENSOR_SERVICE: `${REACT_APP_API_HOST}/bo-core/licensors`,
    CATALOGS_SERVICE: `${REACT_APP_API_HOST}/bo-core/catalogs`,
    CATEGORIES_SERVICE: `${REACT_APP_API_HOST}/bo-core/categories`,
    METATAG_TIPS_SERVICE: `${REACT_APP_API_HOST}/bo-core/metatags/tips`,
    GENRES_SERVICE: `${REACT_APP_API_HOST}/bo-core/genres`,
    CASTING_SERVICE: `${REACT_APP_API_HOST}/bo-core/casts`,
    CHANNELS_SERVICE: `${REACT_APP_API_HOST}/bo-core/channels`,
    ACTIVITY_LOG_SERVICE: `${REACT_APP_API_HOST}/activity-log`,
    PAYMENT_GATEWAYS_SERVICE_SUBSCRIPTION_PLANS: `${REACT_APP_API_HOST}/shellmoney-configuration/subscription-plans`,
    PAYMENT_GATEWAYS_SERVICE_SUBSCRIPTION_PRODUCTS: `${REACT_APP_API_HOST}/shellmoney-configuration/subscription-products`,
    PAYMENT_GATEWAYS_SERVICE_RETRIAL_CONFIGS: `${REACT_APP_API_HOST}/shellmoney-configuration/retrial-configs/payment-gateways`,
    PAYMENT_GATEWAYS_SERVICE: `${REACT_APP_API_HOST}/shellmoney-configuration/payment-gateways`,
    RISK_ENGINE_SERVICE: `${REACT_APP_API_HOST}/shellmoney-configuration/riskengine/rules`,
    RISK_ENGINE_RULES_ACTIVATE: `${REACT_APP_API_HOST}/shellmoney-configuration/riskengine/rules/{id}/activation`,
    RISK_ENGINE_RULES_DEACTIVATE: `${REACT_APP_API_HOST}/shellmoney-configuration/riskengine/rules/{id}/deactivation`,
    CATEGORY_SERVICE: `${REACT_APP_API_HOST}/bo-core/categories`,
    SHOW_SERVICE: `${REACT_APP_API_HOST}/bo-core/shows`
  },
  LINK: {
    SHAHID_WEB: `${process.env.REACT_APP_SHAHID_WEB}`
  },
  LANG: 'en',
  GIGYA_KEY: `${process.env.REACT_APP_GIGYA_SITE_KEY}`,
  SITE_NAME: `${process.env.REACT_APP_GIGYA_SITE_NAME}`
};

export default CONFIG;

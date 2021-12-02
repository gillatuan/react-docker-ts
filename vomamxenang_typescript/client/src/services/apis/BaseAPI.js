import axios from "axios";
import * as Encrypt from "utils/Encrypt";
import * as Storage from "utils/Storage";
import { AUTHORIZATION } from "constants/index";

const ENCRYPT_KEY = "v(m!mx#n!ng";
export default class BaseAPI {
    constructor(baseURL = '') {
        this.originalURL = baseURL;
    }
    connect(url) {
        this.baseURL = this.originalURL;
        this.mParams = {};
        this.mHeaders = {};
        this.mBody = {};
        this.mURL = url;
        this.mIsEncrypt = false;
        this.mMethod = "get"; //default
        if (url && !url.startsWith("http")) {
            this.mHeaders = { Authorization: Storage.getCookieData(AUTHORIZATION, false) };
        }
        return this;
    }

    addParam(key, value) {
        this.mParams[key] = value;
        return this;
    }

    addHeader(key, value) {
        this.mHeaders[key] = value;
        return this;
    }

    addBody(key, value) {
        this.mBody[key] = value;
        return this;
    }

    setBody(value) {
        this.mBody = value;
        return this;
    }

    appendBody(obj) {
        this.mBody = { ...this.mBody, ...obj };
        return this;
    }

    setEncrypt(isEncrypt) {
        this.mIsEncrypt = isEncrypt;
        return this;
    }

    get() {
        this.mMethod = "get";
        return this.request();
    }

    post() {
        this.mMethod = "post";
        return this.request();
    }

    put() {
        this.mMethod = "put";
        return this.request();
    }

    delete() {
        this.mMethod = "delete";
        return this.request();
    }

    getParams() {
        var params = {};
        if (this.mIsEncrypt) {
            //encrypt data here
            var encodedParams = Encrypt.encryptData(this.mParams, ENCRYPT_KEY);
            //and then add to params
            params["params"] = encodedParams;
        } else {
            params = this.mParams;
        }
        return params;
    }

    getHeader() {
        var headers = {};
        if (this.mIsEncrypt) {
            //encrypt data here
            var encodedHeader = Encrypt.encryptData(this.mHeaders, ENCRYPT_KEY);
            //and then add to header
            headers["params"] = encodedHeader;
        } else {
            headers = this.mHeaders;
        }
        return headers;
    }

    getBody() {
        var body = {};
        if (this.mIsEncrypt) {
            //encrypt data here
            var encodedBody = Encrypt.encryptData(this.mBody, ENCRYPT_KEY);
            //and then add to body
            body["params"] = encodedBody;
        } else {
            body = this.mBody;
        }
        return body;
    }

    request() {
        return new Promise((onSuccess, onError) => {
            var params = {
                method: this.mMethod,
                url: this.mURL,
                params: this.getParams(),
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    ...this.getHeader()
                },
                timeout: 30000,
                data: this.getBody()
            };
            if (!this.mURL.startsWith("http")) {
                params.baseURL = this.baseURL;
            }

            axios(params)
                .then(response => {
                    //Decode data here
                    var decodedData = response.data;
                    //callback
                    onSuccess(decodedData);
                })
                .catch(error => {
                    onError(error.response);
                });
        });
    }
}

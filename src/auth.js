import Vue from 'vue';
import router from './router';
import store from './store';
import privilege from './plugins/privilege'

/**
 * @var{string} LOGIN_URL The endpoint for logging in. This endpoint should be proxied by Webpack dev server
 *    and maybe nginx in production (cleaner calls and avoids CORS issues).
 */
const LOGIN_URL = '../token';

/**
 * @var{string} LOGIN_URL The endpoint for logging in. This endpoint should be proxied by Webpack dev server
 *    and maybe nginx in production (cleaner calls and avoids CORS issues).
 */
const REFRESH_TOKEN_URL = '../token';

/**
 * Auth Plugin
 *
 * (see https://vuejs.org/v2/guide/plugins.html for more info on Vue.js plugins)
 *
 * Handles login and token authentication using OAuth2.
 */
export default {
    /**
     * Install the Auth class.
     * Creates a axios http interceptor to handle automatically adding auth headers
     * and refreshing tokens. Then attaches this object to the global Vue (as Vue.auth).
     * @param {Object} Vue The global Vue.
     * @param {Object} options Any options we want to have in our plugin.
     * @return {void}
     */
    install(Vue, options) {
        var that = this;
        // Creates a axios http interceptor
        // Add a request interceptor
        Vue.http.interceptors.request.use(function(config) {
            // Do something before request is sent
            const accessToken = store.state.auth.accessToken || "";
            if (accessToken.length > 0) {
                config.headers.Authorization = 'Bearer ' + accessToken;
            }
            return config;
        }, function(error) {
            // Do something with request error
            return Promise.reject(error);
        });

        // Add a response interceptor
        Vue.http.interceptors.response.use(function(response) {
            // Do something with response data
            return response;
        }, function(error) {
            // Do something with response error
            if (that._isInvalidToken(error.response)) {
                return that._refreshToken(error.config);
            }
            return Promise.reject(error.response);
        });

        // 添加 $auth 插件到Vue的全局对象上
        Vue.prototype.$auth = Vue.auth = this;
    },

    /**
     * Login
     * @param {Object.<string>} userInfo The username and password for logging in.
     * @return {Promise}
     */
    login(creds, redirect) {
        const data = "grant_type=password&username=" + creds.username + "&password=" + creds.password + "&captcha1=" + creds.captcha1 + "&captcha2=" + creds.captcha2;
        //console.log(data);
        return Vue.http.post(LOGIN_URL, data)
            .then((response) => {
                // 保存登陆信息
                this._storeToken(response);

                if (redirect) {
                    router.push({ name: redirect });
                }

                return response.data;
            });
    },

    /**
     * Logout
     * Clear all data in our Vuex store (which resets logged-in status) and redirect back to login form.
     * @return {void}
     */
    logout() {
        // store.commit('CLEAR_ALL_DATA');
        // privilege.reset();
        
        // router.push({ name: 'login' });
        Vue.http.post("../api/portaluser/logout")
          .finally(()=>{
            store.commit('CLEAR_ALL_DATA');
            privilege.reset();

            router.push({
              name: 'login'
            });
          });
    },

    /**
     * Retry the original request.
     * Let's retry the user's original target request that had recieved a invalid token response
     * (which we fixed with a token refresh).
     * @param {Request} request The axios Request instance to use to repeat an http call.
     * @return {Promise}
     */
    _retry(config) {
        return Vue.http.request(config);
    },


    /**
     * Refresh the access token
     * Make an ajax call to the OAuth2 server to refresh the access token (using our refresh token).
     * @private
     * @param {Request} request Vue-resource Request instance, the original request that we'll retry.
     * @return {Promise}
     */
    _refreshToken(config) {
        const params = "grant_type=refresh_token&refresh_token=" + store.state.auth.refreshToken

        return Vue.http.post(REFRESH_TOKEN_URL, params)
            .then((resp) => {
                this._storeToken(resp);
                return this._retry(config);
            })
            .catch((err) => {
                return Promise.reject(err);
            });
    },

    /**
     * Store tokens
     * Update the Vuex store with the access/refresh tokens received from the response from the Oauth2 server.
     * @private
     * @param {Response} response axios Response instance from an OAuth2 server. that contains our tokens.
     * @return {void}
     */
    _storeToken(response) {
        const auth = store.state.auth;

        auth.isLoggedIn = true;
        auth.accessToken = response.data.access_token;
        auth.refreshToken = response.data.refresh_token;

        store.commit('UPDATE_AUTH', auth);
    },

    /**
     * Check if the axios Response is an invalid token response.
     *
     * @private
     * @param {Response} response The axios Response instance received from an http call.
     * @return {boolean}
     */
    _isInvalidToken(response) {
        const status = response.status;
        const error = response.statusText;
        return (status == 401 && (error == 'invalid_token' || error == 'expired_token'));
    }
}
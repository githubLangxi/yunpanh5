import Vue from 'vue'
import Auth from '../auth'

const HEARTBEAT_INTERVAL = 60;


/**
 * HeartBeat Plugin
 *
 */
export default {
    /**
     * Install the HeartBeat class.
     * @param {Object} Vue The global Vue.
     * @param {Object} options Any options we want to have in our plugin.
     * @return {void}
     */
    install(Vue, options) {
    },

    keepAlive() {
        localStorage.heartbeat = new Date();
        setInterval(function () {
            localStorage.heartbeat = new Date();
        }, 60 * 1000);
    },

    isAlive() {
        var lastHeartbeat = localStorage.heartbeat;
        //超过90S没有心跳，代表浏览器已经关闭
        if (lastHeartbeat === null
            ||
            new Date(lastHeartbeat).dateDiff('s', new Date()) > (HEARTBEAT_INTERVAL + 30)) {
            return false;
        }
        return true;
    },
}
import {NssUiComponentInterface} from "../NssUiComponentInterface.js";
import {NssLoadingIndicator} from "../NssLoadingIndicator/NssLoadingIndicator.js";
import {NssClientLoadingIndicator} from "./NssClientLoadingIndicator.js";
import {NssHelper} from "../NssHelper/NssHelper.js";

class NssClient extends NssUiComponentInterface {

    /**
     * @static
     * @type {string}
     */
    static XHR_TYPE_POST = 'POST';

    /**
     * @static
     * @type {Object.<string,NssClient~responseCallback>}
     * @private
     */
    static _response_type_cb_list = {};

    /**
     * @param {string} resource_name
     * @constructor
     */
    constructor(resource_name) {

        super();

        /**
         * @type {string}
         * @private
         */
        this._resource_name = resource_name;

        /**
         * @type {NssLoadingIndicator|null}
         * @private
         */
        this._loading_indicator = null;

        /**
         * @type {number}
         * @protected
         */
        this._loading_indicator_delay_in_ms = 500;

        /**
         * @type {NssClientLoadingIndicatorByRet}
         * @private
         */
        this._loading_indicator_by_ret = {};

        this._setupClientEventListener();
    }

    /**
     * @param {number} delay_in_ms
     * @return {NssClient}
     */
    setLoadingIndicatorDelay(delay_in_ms) {
        this._loading_indicator_delay_in_ms = delay_in_ms;
        return this;
    }

    /**
     * @param {string} event_name
     * @param {*} [data]
     * @param {function} [cb]
     * @param {HTMLElement|false|null} [loading_indicator_target_el=document.body]
     * @return {NssClient}
     */
    post(event_name, data, cb, loading_indicator_target_el) {
        this._xhr(event_name, data, cb, NssClient.XHR_TYPE_POST, loading_indicator_target_el);
        return this;
    }

    /**
     * @return {NssClient}
     * @param {Object} [data]
     */
    close(data = {}) {
        this.post('close', data);
        return this;
    }

    /**
     * @param {function} cb
     * @return {string}
     * @private
     */
    _uniqueResponseType(cb) {
        const response_type_uid = this._resource_name + '_uid_' + NssHelper.getUniqueId();
        NssClient._response_type_cb_list[response_type_uid] = cb;
        return response_type_uid;
    }

    /**
     * @param {string} event_name
     * @param {NssClientMessageRequest} [data]
     * @param {NssClient~responseCallback} [cb]
     * @param {string} [method]
     * @param {HTMLElement|false|null} [loading_indicator_target_el=document.body]
     * @private
     */
    _xhr(event_name, data, cb, method, loading_indicator_target_el) {

        if (this._resource_name === '') {
            console.error('Resource name is not set - waiting for first client message.');
        }

        method = method || NssClient.XHR_TYPE_POST;

        if (typeof data !== 'object') {
            data = {};
        }

        const url = 'http://' + this._resource_name + '/' + event_name

        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        /**
         * The LUA client gets the information of the callback id ('response_event_type'). If the LUA client answers
         * with the same 'response_event_type' id given in 'data.type' then the callback will be called.
         */
        if (typeof cb === 'function') {

            xhr.timeout = 1000 * 30; // 30 Sekunden

            data.response_event_type = this._uniqueResponseType(cb);

            // On callback, we have to wait for answer from LUA client. During this time we show a loading indicator.
            this._showLoadingIndicator(xhr, data.response_event_type, loading_indicator_target_el);
        }

        xhr.send(JSON.stringify(data));
    }

    /**
     * @param {HTMLElement|null|false} [target_el]
     * @return {NssClientLoadingIndicator|null}
     * @protected
     */
    _initializeLoadingIndicator(target_el) {

        if (typeof target_el === 'undefined') {
            target_el = document.body;
        }

        if (target_el === null || target_el === false) {
            return null;
        }

        if (typeof target_el._nss_client_loading_indicator === 'undefined') {
            target_el._nss_client_loading_indicator = new NssClientLoadingIndicator(target_el, this._loading_indicator_delay_in_ms);
        }

        return target_el._nss_client_loading_indicator;
    }

    /**
     * @param {XMLHttpRequest} xhr
     * @param {string} response_event_type
     * @param {HTMLElement|null|false} [target_el=document.body]
     * @private
     */
    _showLoadingIndicator(xhr, response_event_type, target_el) {

        let loading_indicator = this._initializeLoadingIndicator(target_el);

        if (loading_indicator === null) {
            return;
        }

        loading_indicator.add(xhr);

        // noinspection UnnecessaryLocalVariableJS
        /**
         * @type {NssClientLoadingIndicatorByRetItem}
         */
        const loading_indicator_by_ret_item = {
            target_el: target_el,
            loading_indicator: loading_indicator,
            xhr: xhr
        };

        this._loading_indicator_by_ret[response_event_type] = loading_indicator_by_ret_item;
    }

    /**
     * @private
     */
    _setupClientEventListener() {
        window.addEventListener('message', this._onClientMessage.bind(this))
    }

    /**
     * @param {string} event_name
     * @param {NssClient~responseCallback} cb
     * @return {NssClient}
     */
    on(event_name, cb) {
        NssClient._response_type_cb_list[event_name] = cb;
        return this;
    }

    /**
     * @param {MessageEvent} event
     * @protected
     */
    _onClientMessage(event) {

        /**
         * @type {NssClientMessageResponse}
         */
        const data = event.data || {};

        const type = data.type = data.type || 'unknown_type';

        const response_callback = NssClient._response_type_cb_list[type] || null;

        if (typeof response_callback === 'function') {
            response_callback(data);

            const loading_indicator_by_ret_item = this._loading_indicator_by_ret[type] || null;

            if (loading_indicator_by_ret_item !== null) {
                loading_indicator_by_ret_item.loading_indicator.remove(loading_indicator_by_ret_item.xhr);
                delete this._loading_indicator_by_ret[type];
            }

            return;
        }

        console.error('Unknown client message type:', type, data);
    }

    /**
     * @inheritDoc
     */
    static getStyleFilenames() {
        return [];
    }

    /**
     * @return {string}
     */
    static getComponentName() {
        return 'NssClient';
    }

    /**
     * @param {string} resource_name
     * @return {Promise<NssClientMock>}
     */
    static async mockFactory(resource_name) {
        const imported_obj = await import("./NssClientMock.js");
        const mock = new imported_obj.NssClientMock(resource_name);
        return mock;
    }
}

export {NssClient};
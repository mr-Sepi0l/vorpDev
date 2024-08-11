import {NssTip} from "../../nss/NssTip/NssTip.js";

class Client {

    /**
     * @static
     * @type {string}
     */
    static XHR_TYPE_POST = 'POST';

    /**
     * @static
     * @type {number}
     * @private
     */
    static _response_type_uid = 0;

    /**
     * @static
     * @type {Object.<string,function>}
     * @private
     */
    static _response_type_cb_list = {};

    /**
     * @constructor
     * @param {function} on_show
     * @param {function} on_hide
     * @param {PinBoard} pinboard
     */
    constructor(on_show, on_hide, pinboard) {

        /**
         * @type {string}
         * @private
         */
        this._resource_name = '';

        /**
         * @type {PinBoardOnShowCallback}
         * @protected
         */
        this._on_show = on_show || function () {
            console.error('Please specify on_show callback.');
        };

        /**
         * @type {PinBoard}
         * @protected
         */
        this._pinboard = pinboard;

        /**
         * @type {function}
         * @protected
         */
        this._on_hide = on_hide || function () {
            console.error('Please specify on_hide callback.');
        };

        this._setupClientEventListener();
    }

    /**
     * @param {string} event_name
     * @param {*} [data]
     * @param {function} [cb]
     * @return {Client}
     */
    post(event_name, data, cb) {
        this._xhr(event_name, data, cb, Client.XHR_TYPE_POST);
        return this;
    }

    /**
     * @param {string|number} [poster_id]
     * @param {function} [cb]
     * @return {Client}
     */
    removePoster(poster_id, cb) {
        const data = {id: poster_id};
        this.post('remove_poster', data, cb);
        return this;
    }

    /**
     * @param {PinBoardTextPoster} text_poster
     * @param {function} [cb]
     * @return {Client}
     */
    saveTextPoster(text_poster, cb) {
        this.post('save_text_poster', text_poster, cb);
        return this;
    }

    /**
     * @param {PinBoardImagePoster} image_poster
     * @param {function} [cb]
     * @return {Client}
     */
    saveImagePoster(image_poster, cb) {
        this.post('save_image_poster', image_poster, cb);
        return this;
    }

    /**
     * @param {function} cb
     * @return {Client}
     */
    getPosterList(cb) {
        const data = {};
        this.post('get_poster_list', data, cb);
        return this;
    }

    /**
     * @return {Client}
     */
    close() {
        this.post('close');
        return this;
    }

    /**
     * @param {function} cb
     * @return {Client}
     */
    getDayMode(cb) {

        if (this._resource_name === '') {
            return this;
        }

        const data = {};
        this.post('get_day_mode', data, cb);
        return this;
    }

    /**
     * @param {function} cb
     * @return {string}
     * @private
     */
    _uniqueResponseType(cb) {
        Client._response_type_uid++;
        const response_type_uid = 'rtuid_' + Client._response_type_uid;
        Client._response_type_cb_list[response_type_uid] = cb;
        return response_type_uid;
    }

    /**
     * @param {string} event_name
     * @param {*} [data]
     * @param {function} [cb]
     * @param {string} [method]
     * @private
     */
    _xhr(event_name, data, cb, method) {

        if (this._resource_name === '') {
            console.error('Resource name is not set - waiting for first client message.');
        }

        method = method || Client.XHR_TYPE_POST;

        if (typeof data !== 'object') {
            data = {};
        }

        const url = 'http://' + this._resource_name + '/' + event_name

        const xhr = new XMLHttpRequest();
        xhr.open(method, url);
        xhr.setRequestHeader('Content-Type', 'application/json');

        if (typeof cb === 'function') {
            data.response_event_type = this._uniqueResponseType(cb);
        }

        xhr.send(JSON.stringify(data));
    }

    /**
     * @private
     */
    _setupClientEventListener() {
        window.addEventListener('message', this._onClientMessage.bind(this))
    }

    /**
     * @param {MessageEvent} event
     * @private
     */
    _onClientMessage(event) {

        /**
         * @type {PinBoardMessageResponse}
         */
        const data = event.data || {};
        const type = data.type || 'unknown_type';

        const response_callback = Client._response_type_cb_list[type] || null;

        if (typeof response_callback === 'function') {
            response_callback(data);
            return;
        }

        switch (type) {

            case 'show':
                this._onMessageShow(data);
                return;

            case 'hide':
                this._onMessageHide();
                return;

            case 'error':

                const tip = new NssTip(`<span style="text-align:center; color:#c00; font-weight:bold;">${data.message}</span>`);

                const duration_in_ms = this._pinboard._config.NotificationDurationInMs || 4000;

                tip
                    .setCenterCenter()
                    .setDuration(duration_in_ms)
                    .show();

                return;
        }

        console.error('Unknown client message type:', type, data);
    }

    /**
     * @param {PinBoardMessageResponse} data
     * @protected
     */
    _onMessageShow(data) {

        this._resource_name = data.resource_name || '';
        const is_night = data.is_night || false;
        const char_details = data.char_details || null;
        const pinboard_cfg = data.pinboard_cfg || null;

        /**
         * @type {PinBoardConfig}
         */
        const config = data.config || {};

        /**
         * @type {PinBoardLanguage}
         */
        const language = data.language || {error: 'No language given!'};

        if (language.error) {
            console.error('nss_pinboard: ' + language.error);
            this._on_hide();
            return;
        }

        this._on_show(language, config, is_night, char_details, pinboard_cfg);
    }

    /**
     * @protected
     */
    _onMessageHide() {
        this._on_hide();
    }
}

export {Client};
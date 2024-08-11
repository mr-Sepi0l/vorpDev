import {NssHelper} from "../NssHelper/NssHelper.js";
import {NssLoadingIndicator} from "../NssLoadingIndicator/NssLoadingIndicator.js";

class NssClientLoadingIndicator {

    /**
     * @static
     * @type {string[]}
     */
    static XHR_EVENT_NAMES = ['timeout', 'abort', 'error', 'load'];

    /**
     * @param {HTMLElement} target_el
     * @param {number} [delay_in_ms=500]
     */
    constructor(target_el, delay_in_ms = 500) {

        /**
         * @type {number}
         * @private
         */
        this._delay_in_ms = delay_in_ms;

        /**
         * @type {Object.<string,{xhr:XMLHttpRequest, on_load_event:function}>}
         * @private
         */
        this._active_requests = {};

        /**
         * @type {HTMLElement}
         * @private
         */
        this._target_el = target_el;

        /**
         * @type {NssLoadingIndicator|null}
         * @private
         */
        this._loading_indicator = null;

        /**
         * @type {number|null}
         * @private
         */
        this._show_timeout = null;
    }

    /**
     * @param {XMLHttpRequest} xhr
     */
    add(xhr) {

        if (false === this.hasActiveRequests()) {
            this.show();
        }

        xhr._nss_client_uid = xhr._nss_client_uid || NssHelper.getUniqueId();

        const onXhrEvent = this.remove.bind(this, xhr);

        this.rememberActiveRequest(xhr, onXhrEvent);

        NssClientLoadingIndicator.XHR_EVENT_NAMES.forEach((event_name) => {
            xhr.addEventListener(event_name, onXhrEvent);
        });
    }

    /**
     * @param {XMLHttpRequest} xhr
     */
    remove(xhr) {

        this.forgetActiveRequest(xhr);

        if (false === this.hasActiveRequests()) {
            this.hide();
        }
    }

    /**
     * @private
     */
    _resetShowTimeout() {

        if (this._show_timeout) {
            window.clearTimeout(this._show_timeout);
            this._show_timeout = null;
        }
    }

    hide() {

        this._resetShowTimeout();

        if (this._loading_indicator) {
            this._loading_indicator.destroy();
            this._loading_indicator = null;
        }
    }

    show() {

        if (this._loading_indicator || this._show_timeout) {
            return;
        }

        this._show_timeout = window.setTimeout(() => {

            this._resetShowTimeout();

            if (this._loading_indicator) {
                return;
            }

            this._loading_indicator = new NssLoadingIndicator(this._target_el);
            this._loading_indicator.show();

        }, this._delay_in_ms);
    }

    /**
     * @return {boolean}
     */
    hasActiveRequests() {
        return Object.keys(this._active_requests).length > 0;
    }

    /**
     * @param {XMLHttpRequest} xhr
     * @param {function} on_load_event
     */
    rememberActiveRequest(xhr, on_load_event) {

        this._active_requests[xhr._nss_client_uid] = {
            xhr: xhr,
            on_load_event: on_load_event
        };
    }

    /**
     * @param {XMLHttpRequest} xhr
     */
    forgetActiveRequest(xhr) {

        const xhr_data = this._active_requests[xhr._nss_client_uid] || null;

        if (xhr_data) {

            NssClientLoadingIndicator.XHR_EVENT_NAMES.forEach((event_name) => {
                xhr.removeEventListener(event_name, xhr_data.on_load_event);
            });
        }

        delete this._active_requests[xhr._nss_client_uid];
    }
}

export {NssClientLoadingIndicator};
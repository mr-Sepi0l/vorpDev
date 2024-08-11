import {NssClient} from "./NssClient.js";

class NssClientMock extends NssClient {

    /**
     * @static
     * @type {Object.<string,NssClientMock~delayedSimulatePostResponseCallback>}
     * @private
     */
    static _simulate_post_response_cb_list = {};

    /**
     * @inheritDoc
     */
    post(event_name, data, cb, loading_indicator_target_el) {

        /**
         * @type {NssClientMock~delayedSimulatePostResponseCallback|null}
         */
        let simulate_cb = NssClientMock._simulate_post_response_cb_list[event_name] || null;

        if (typeof simulate_cb !== 'function') {
            console.error(`No simulate post response callback for event name: ${event_name}`);
            return this;
        }

        /**
         * @type {NssClientLoadingIndicator|null}
         */
        let loading_indicator = this._initializeLoadingIndicator(loading_indicator_target_el);

        let has_loading_indicator = () => {
            return loading_indicator !== null;
        }

        let show_loading_indicator = () => {
            if (has_loading_indicator()) {
                loading_indicator.show()
            }
        };

        let hide_loading_indicator = () => {
            if (has_loading_indicator()) {
                loading_indicator.hide();
            }
        };

        show_loading_indicator();

        simulate_cb(data).then((response_data) => {

            hide_loading_indicator();

            if (typeof cb === 'function') {
                cb(response_data);
            }
        });

        return this;
    }

    /**
     * @param {string} event_name
     * @param {any} data
     */
    simulateClientToNuiEvent(event_name, data) {

        const message = {
            data: data,
            type: event_name,
        };

        window.postMessage(message, '*');
    }

    /**
     * @param {string} event_name
     * @param {NssClientMock~simulatePostResponseCallback} cb
     * @param {number} [timeout_in_ms=100]
     * @return {this}
     */
    listenPostForResponseSimulation(event_name, cb, timeout_in_ms = 100) {

        /**
         * @type {NssClientMock~delayedSimulatePostResponseCallback}
         */
        const delayed_cb = (request_data) => {

            /**
             * @type {Promise<any>}
             */
            const promise = new Promise((resolve) => {

                const on_timeout = () => {
                    const response = cb(request_data);
                    resolve(response);
                };

                setTimeout(on_timeout, timeout_in_ms);
            });

            return promise;
        };

        NssClientMock._simulate_post_response_cb_list[event_name] = delayed_cb;

        return this;
    }
}

export {NssClientMock};
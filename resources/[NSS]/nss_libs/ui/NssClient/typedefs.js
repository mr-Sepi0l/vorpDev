/**
 * @typedef {Object.<string,*>} NssClientMessageRequest
 * @property {string} [response_event_type]
 */

/**
 * @typedef {Object} NssClientLoadingIndicatorByRetItem
 * @property {HTMLElement} target_el
 * @property {NssClientLoadingIndicator} loading_indicator
 * @property {XMLHttpRequest} xhr
 */

/**
 * @typedef {Object.<string, NssClientLoadingIndicatorByRetItem>} NssClientLoadingIndicatorByRet
 */

/**
 * @typedef {Object.<string,*>} NssClientMessageResponse
 * @property {string} type
 * @property {string} [response_event_type]
 */

/**
 * @callback NssClient~responseCallback
 * @param {NssClientMessageResponse} response_data
 */

/**
 * @callback NssClientMock~simulatePostResponseCallback
 * @param {any} request_data
 * @return {any}
 */

/**
 * @callback NssClientMock~delayedSimulatePostResponseCallback
 * @param {any} request_data
 * @return {Promise<any>}
 */
import {NssUiComponentInterface} from "../NssUiComponentInterface.js";
import {NssHelper} from "../NssHelper/NssHelper.js";

/**
 * @implements {NssUiComponentInterface}
 */
class NssResponsive extends NssUiComponentInterface {

    constructor() {

        super();

        /**
         * @type {Function}
         */
        this.updateScreenWidthFactorDebounceClocked = null;

        this.initialize();
    }

    updateScreenWidthFactor() {
        const screen_width_factor = Math.round((window.outerWidth / 1920) * 100);
        document.documentElement.style.fontSize = screen_width_factor + "%";
    }

    /**
     * @return {boolean}
     * @private
     */
    _isInitializedBefore() {

        const YES = 'yes';
        const NO = 'no';
        const ATTR_NAME = 'data-nss-response-initialized';

        const is_initialized = document.body.getAttribute(ATTR_NAME) || NO;

        if (is_initialized === YES) {
            return true;
        }

        document.body.setAttribute(ATTR_NAME, YES);

        return false;
    }

    initialize() {

        if (this._isInitializedBefore()) {
            return;
        }

        const interval_in_ms = 100;

        this.updateScreenWidthFactorDebounceClocked = NssHelper.debounceClocked(this.updateScreenWidthFactor, interval_in_ms);

        window.addEventListener('resize', this.updateScreenWidthFactorDebounceClocked);

        this.updateScreenWidthFactor();
    }

    static getComponentName() {
        return "NssResponsive";
    }

    static getStyleFilenames() {
        return ['NssResponsive.css'];
    }

    /**
     * @return {NssHelper}
     */
    getHelper() {
        return NssHelper;
    }
}

export {NssResponsive}
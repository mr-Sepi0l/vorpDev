import {NssUiComponentInterface} from "../NssUiComponentInterface.js";
import {NssResponsive} from "../NssResponsive/NssResponsive.js";
import {NssUiComponent} from "../NssUiComponent.js";

/**
 * @extends {NssUiComponent}
 */
class NssTip extends NssUiComponent {

    static POSITIONS = {
        TOP_LEFT: 'nss-tip--tl',
        TOP_CENTER: 'nss-tip--tc',
        TOP_RIGHT: 'nss-tip--tr',
        CENTER_LEFT: 'nss-tip--cl',
        CENTER_CENTER: 'nss-tip--cc',
        CENTER_RIGHT: 'nss-tip--cr',
        BOTTOM_LEFT: 'nss-tip--bl',
        BOTTOM_CENTER: 'nss-tip--bc',
        BOTTOM_RIGHT: 'nss-tip--br',
    }

    static ANIM_IN_OUT_DURATION_IN_MS = 500;

    /**
     * @param {string} message
     */
    constructor(message) {

        super();

        /**
         * @type {string}
         * @private
         */
        this._message = message;

        /**
         * @type {number}
         * @private
         */
        this._duration_in_ms = 4000;

        /**
         * @type {string}
         * @private
         */
        this._position = NssTip.POSITIONS.BOTTOM_CENTER;

        /**
         * @type {number|null}
         * @private
         */
        this._hide_timeout_id = null;

        /**
         * @type {HTMLElement|null}
         * @private
         */
        this._el = null;
    }

    /**
     * @param {number} new_duration_in_ms
     * @return {NssTip}
     */
    setDuration(new_duration_in_ms) {
        this._duration_in_ms = new_duration_in_ms;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setTopLeft() {
        this._position = NssTip.POSITIONS.TOP_LEFT;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setTopCenter() {
        this._position = NssTip.POSITIONS.TOP_CENTER;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setTopRight() {
        this._position = NssTip.POSITIONS.TOP_RIGHT;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setCenterLeft() {
        this._position = NssTip.POSITIONS.CENTER_LEFT;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setCenterCenter() {
        this._position = NssTip.POSITIONS.CENTER_CENTER;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setCenterRight() {
        this._position = NssTip.POSITIONS.CENTER_RIGHT;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setBottomLeft() {
        this._position = NssTip.POSITIONS.BOTTOM_LEFT;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setBottomCenter() {
        this._position = NssTip.POSITIONS.BOTTOM_CENTER;
        return this;
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {NssTip}
     */
    setBottomRight() {
        this._position = NssTip.POSITIONS.BOTTOM_RIGHT;
        return this;
    }

    /**
     * @return {Promise<void>}
     */
    show() {

        return new Promise((resolve) => {

            this.destroyNow();

            this._el = document.createElement('div');
            this._el.classList.add('nss-tip');
            this._el.classList.add(this._position);
            this._el.innerHTML = this._message;
            document.body.appendChild(this._el);

            this._hide_timeout_id = window.setTimeout(() => {
                this.hide().then(() => {
                    resolve();
                });
            }, (this._duration_in_ms + NssTip.ANIM_IN_OUT_DURATION_IN_MS));
        });
    }

    /**
     * @param {boolean} [force_now=false]
     * @return {Promise<void>}
     */
    hide(force_now) {

        return new Promise((resolve) => {

            if (typeof this._hide_timeout_id === "number") {
                window.clearTimeout(this._hide_timeout_id);
                this._hide_timeout_id = null;
            }

            if (this._el === null) {
                resolve();
                return this;
            }

            const removeIt = () => {

                if (this._el !== null) {
                    this._el.remove();
                    this._el = null;
                }

                resolve();
            };

            if (typeof force_now === "boolean" && force_now === true) {
                removeIt();
                return this;
            }

            this._el.classList.add('nss-tip--out');
            window.setTimeout(removeIt, NssTip.ANIM_IN_OUT_DURATION_IN_MS);
        });
    }

    // noinspection JSUnusedGlobalSymbols
    /**
     * @return {Promise<void>}
     */
    destroyNow() {
        return this.hide(true);
    }

    static getComponentName() {
        return "NssTip";
    }

    static getStyleFilenames() {
        return ["NssTip.css"];
    }
}

export {NssTip}
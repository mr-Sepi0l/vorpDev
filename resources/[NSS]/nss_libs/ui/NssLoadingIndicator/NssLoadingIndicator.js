import {NssUiComponent} from "../NssUiComponent.js";

/**
 * @extends {NssUiComponent}
 */
class NssLoadingIndicator extends NssUiComponent {

    CSS_SHOW = 'nss-loading-indicator--show';
    CSS_HIDE = 'nss-loading-indicator--hide';
    CSS_HIDDEN = 'nss-loading-indicator--hidden';

    STATUS_VISIBLE = 'visible';
    STATUS_HIDDEN = 'hidden';

    /**
     * @param {HTMLElement} [target_el]
     */
    constructor(target_el) {
        
        super();

        /**
         * @type {HTMLElement}
         * @private
         */
        this._target_el = target_el || document.body;

        /**
         * @type {string}
         * @private
         */
        this._status = this.STATUS_HIDDEN;
    }

    /**
     * @return {boolean}
     * @private
     */
    _isVisible() {
        return this._status === this.STATUS_VISIBLE;
    }

    /**
     * @private
     */
    _createDom() {

        if (this._el) {
            return;
        }

        this._el = document.createElement('div');
        this._el.classList.add('nss-loading-indicator');

        this._loader_el = document.createElement('div');
        this._loader_el.classList.add('quest-loading-indicator__loader');
        this._loader_el.innerHTML = `<div class="quest-loading-indicator__loader-img"></div>`;

        this._el.appendChild(this._loader_el);

        this._target_el.appendChild(this._el);
    }

    /**
     * @private
     */
    _resetTimeout() {
        if (this._timeout) {
            window.clearTimeout(this._timeout);
            this._timeout = null;
        }
    }

    /**
     * @return {Promise<void>}
     */
    show() {

        this._resetTimeout();

        return new Promise((resolve) => {

            if (this._isVisible()) {
                resolve();
                return;
            }

            this._status = this.STATUS_VISIBLE;

            this._createDom();

            this._el.classList.remove(this.CSS_HIDDEN);
            this._el.classList.remove(this.CSS_HIDE);

            this._timeout = window.setTimeout(() => {

                this._el.classList.add(this.CSS_SHOW);

                this._timeout = window.setTimeout(() => {
                    this._resetTimeout();
                    resolve();
                }, 500);
            }, 0);
        });
    }

    /**
     * @return {Promise<void>}
     */
    hide() {

        this._resetTimeout();

        return new Promise((resolve) => {

            if (false === this._isVisible()) {
                resolve();
                return;
            }

            this._status = this.STATUS_HIDDEN;

            this._el.classList.remove(this.CSS_SHOW);

            this._timeout = window.setTimeout(() => {

                this._el.classList.add(this.CSS_HIDE);

                this._timeout = window.setTimeout(() => {

                    this._el.classList.add(this.CSS_HIDDEN);
                    this._el.classList.remove(this.CSS_HIDE);

                    this._resetTimeout();
                    resolve();
                }, 500);
            }, 0);
        });
    }

    /**
     * @return {Promise<void>}
     */
    destroy() {
        return new Promise((resolve) => {
            this.hide().then(() => {
                if (this._el) {
                    this._el.remove();
                    this._el = null;
                }
                resolve();
            });
        });
    }

    /**
     * @inheritDoc
     */
    static getComponentName() {
        return "NssLoadingIndicator";
    }

    /**
     * @inheritDoc
     */
    static getStyleFilenames() {
        return ['NssLoadingIndicator.css'];
    }
}

export {NssLoadingIndicator};
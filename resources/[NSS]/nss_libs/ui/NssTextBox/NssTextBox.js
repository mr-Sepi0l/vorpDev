import {NssResponsive} from "../NssResponsive/NssResponsive.js";
import {NssUiComponent} from "../NssUiComponent.js";

/**
 * @extends {NssUiComponent}
 */
class NssTextBox extends NssUiComponent {

    static CSS_VISIBLE = 'nss-text-box__container--visible';
    static CSS_TEXT_SMALL = 'nss-text-box__container--small';
    static CSS_TEXT_DEFAULT = 'nss-text-box__container--default';
    static CSS_TEXT_MEDIUM = 'nss-text-box__container--medium';
    static CSS_TEXT_LARGE = 'nss-text-box__container--large';
    static CSS_NO_WRAP = 'nss-text-box__container--no-wrap';

    /**
     * @constructor
     * @param {HTMLElement} target_el
     */
    constructor(target_el) {

        super();

        if (typeof NssResponsive === 'undefined') {
            window.alert('Initialize dependency NssResponsive, please!');
        }

        /**
         * @type {string}
         * @private
         */
        this._text = '';

        /**
         * @type {HTMLElement}
         * @private
         */
        this._target_el = target_el;

        /**
         * @type {string}
         * @private
         */
        this._size_css_cls = '';

        /**
         * @type {boolean}
         * @private
         */
        this._no_wrap = false;
    }

    /**
     * @private
     */
    _createDom() {

        if (this._isInDom()) {
            return;
        }

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._container_el = document.createElement('div');
        this._container_el.classList.add('nss-text-box__container');

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._text_before_el = document.createElement('div');
        this._text_before_el.classList.add('nss-text-box__text-before');
        this._container_el.appendChild(this._text_before_el);

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._text_el = document.createElement('div');
        this._text_el.classList.add('nss-text-box__text');
        this._container_el.appendChild(this._text_el);

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._text_after_el = document.createElement('div');
        this._text_after_el.classList.add('nss-text-box__text-after');
        this._container_el.appendChild(this._text_after_el);

        this._target_el.appendChild(this._container_el);

        this._update();
    }

    /**
     * @return {boolean}
     * @private
     */
    _isInDom() {
        return (this._container_el || null) !== null;
    }

    /**
     * @return {NssTextBox}
     */
    setNoWrap() {
        return this._updateNoWrap(true);
    }

    /**
     * @return {NssTextBox}
     */
    setWrap() {
        return this._updateNoWrap(false);
    }

    /**
     * @param {boolean} [new_value]
     * @return {NssTextBox}
     * @private
     */
    _updateNoWrap(new_value) {
        this._no_wrap = new_value || this._no_wrap;

        if (false === this._isInDom()) {
            return this;
        }

        if (this._no_wrap) {
            this._container_el.classList.add(NssTextBox.CSS_NO_WRAP);
        } else {
            this._container_el.classList.remove(NssTextBox.CSS_NO_WRAP);
        }

        return this;
    }

    /**
     * @return {NssTextBox}
     */
    setTextSizeDefault() {
        return this._updateTextSize(NssTextBox.CSS_TEXT_DEFAULT);
    }

    /**
     * @return {NssTextBox}
     */
    setTextSizeSmall() {
        return this._updateTextSize(NssTextBox.CSS_TEXT_SMALL);
    }

    /**
     * @return {NssTextBox}
     */
    setTextSizeMedium() {
        return this._updateTextSize(NssTextBox.CSS_TEXT_MEDIUM);
    }

    /**
     * @return {NssTextBox}
     */
    setTextSizeLarge() {
        return this._updateTextSize(NssTextBox.CSS_TEXT_LARGE);
    }

    /**
     * @param {string} [new_size]
     * @return {NssTextBox}
     * @private
     */
    _updateTextSize(new_size) {

        this._size_css_cls = new_size || this._size_css_cls;

        if (false === this._isInDom()) {
            return this;
        }

        const classes_to_remove = [NssTextBox.CSS_TEXT_DEFAULT, NssTextBox.CSS_TEXT_LARGE, NssTextBox.CSS_TEXT_MEDIUM, NssTextBox.CSS_TEXT_SMALL];
        classes_to_remove.forEach(css_cls => this._container_el.classList.remove(css_cls));
        this._container_el.classList.add(this._size_css_cls);

        return this;
    }

    /**
     * @private
     */
    _update() {
        this._updateText();
        this._updateTextSize();
        this._updateNoWrap();
    }

    /**
     * @return {NssTextBox}
     */
    show() {

        this._createDom();

        this._update();

        this._container_el.classList.add(NssTextBox.CSS_VISIBLE);

        return this;
    }

    /**
     * @return {NssTextBox}
     */
    hide() {

        this._container_el.classList.remove(NssTextBox.CSS_VISIBLE);

        return this;
    }

    /**
     * @return {NssTextBox}
     */
    removeDom() {

        this._container_el.remove();

        this._text_el = null;
        this._container_el = null;

        return this;
    }

    /**
     * @private
     * @return {NssTextBox}
     */
    _updateText() {

        if (false === this._isInDom()) {
            return this;
        }

        this._text_el.innerHTML = this.getText();

        return this;
    }

    /**
     * @return {string}
     */
    getText() {
        return this._text;
    }

    /**
     * @param {string} value
     * @return {NssTextBox}
     */
    setText(value) {

        if (typeof value !== 'string' && typeof value !== 'number') {
            value = '';
        }

        this._text = value;

        this._updateText();

        return this;
    }

    static getComponentName() {
        return "NssTextBox";
    }

    static getStyleFilenames() {
        return ["NssTextBox.css"];
    }
}

export {NssTextBox};
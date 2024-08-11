import {NssUiComponent} from "../NssUiComponent.js";
import {NssAudio} from "../NssAudio/NssAudio.js";

/**
 * @callback NssModal~closeCallback
 * @param {NssModal} modal
 */


/**
 * @extends {NssUiComponent}
 */
class NssModal extends NssUiComponent {

    static TEMPLATE_MODAL = '<div class="nss-modal"></div>';

    static TEMPLATE_CONTENT = '<div class="nss-modal-content"></div>';

    static ANIM_DUR_BUFFER_IN_MS = 100;

    static NOT_EDITABLE_INPUT_TYPES = ['checkbox', 'radio', 'button', 'submit', 'reset', 'file', 'image', 'hidden', 'range'];

    constructor() {

        super();

        /**
         * @type {HTMLElement}
         * @private
         */
        this._modal_el = null;

        /**
         * @type {HTMLElement}
         * @private
         */
        this._modal_content_el = null;

        /**
         * @type {HTMLElement}
         * @private
         */
        this._content_el = null;

        /**
         * @type {boolean}
         * @private
         */
        this._close_on_modal = false;

        /**
         * @type {NssModal~closeCallback}
         * @private
         */
        this._on_close_callback = null;

        /**
         * @type {Object.<string,boolean>}
         * @private
         */
        this._close_keys = {};
    }

    /**
     * @inheritDoc
     */
    static getComponentName() {
        return "NssModal";
    }

    /**
     * @inheritDoc
     */
    static getStyleFilenames() {
        return ['NssModal.css'];
    }

    /**
     * @return {NssModal}
     * @private
     */
    _createModal() {

        const template = document.createElement('template');
        template.innerHTML = NssModal.TEMPLATE_MODAL;

        this._modal_el = template.content.querySelector('.nss-modal');
        this._modal_el.addEventListener('click', this._onModalClick.bind(this));

        document.body.appendChild(this._modal_el);

        return this;
    }

    /**
     * @return {NssModal}
     * @private
     */
    _createModalContent() {

        if (false === this.hasContent()) {
            return this;
        }

        const template = document.createElement('template');
        template.innerHTML = NssModal.TEMPLATE_CONTENT;

        this._modal_content_el = template.content.querySelector('.nss-modal-content');
        this._modal_content_el.appendChild(this._content_el);
        document.body.appendChild(this._modal_content_el);

        return this;
    }

    /**
     * @private
     * @return {number}
     */
    _getAnimDuration() {

        const style = getComputedStyle(document.body);
        const anim_dur_str = style.getPropertyValue('--nss-modal-anim-dur') || '500ms'
        const anim_dur_number = parseFloat(anim_dur_str, 10);

        let anim_dur_in_ms = 1000;

        if (anim_dur_str.indexOf('ms') !== -1) {
            anim_dur_in_ms = anim_dur_number;
        } else if (anim_dur_str.indexOf('s') !== -1) {
            anim_dur_in_ms = anim_dur_number * 1000;
        }

        return anim_dur_in_ms + NssModal.ANIM_DUR_BUFFER_IN_MS;
    }

    /**
     * @return {Promise<void>}
     * @private
     */
    _waitForAnim() {

        const anim_duration_in_ms = this._getAnimDuration();

        return new Promise((resolve) => {

            window.setTimeout(() => {
                resolve();
            }, anim_duration_in_ms);
        });
    }

    /**
     * @param {MouseEvent} event
     * @private
     */
    _onModalClick(event) {
        if (this._close_on_modal) {
            this.hide();
        }
    }

    /**
     * @param {NssModal~closeCallback} callback
     * @return {NssModal}
     */
    onClose(callback) {
        this._on_close_callback = callback;
        return this;
    }

    /**
     * @return {Promise<void>}
     */
    show() {

        if (this._modal_el) {
            return Promise.resolve();
        }

        this._createModal();

        this._createModalContent();

        NssAudio.playSfxShowMenu(0.5);

        return this._waitForAnim();
    }

    /**
     * @return {Promise<void>}
     */
    hide() {

        if (this._modal_el.classList.contains('nss-modal--out')) {
            return Promise.resolve();
        }

        this._modal_el.classList.add('nss-modal--out');

        if (this._modal_content_el) {
            this._modal_content_el.classList.add('nss-modal-content--out');
        }

        NssAudio.playSfxHideMenu1(0.5);

        const anim_promise = this._waitForAnim();

        anim_promise.then(() => {

            if (this._on_close_callback) {
                this._on_close_callback(this);
            }

            this._destroy();
        });

        return anim_promise;
    }

    /**
     * @private
     */
    _destroy() {

        this._removeCloseOnKeyListener();

        this._modal_el.remove();
        this._modal_el = null;

        if (this._modal_content_el) {
            this._modal_content_el.remove();
            this._modal_content_el = null;
        }
    }

    /**
     * @return {NssModal}
     */
    closeOnModal() {
        this._close_on_modal = true;
        return this;
    }

    /**
     * @return {NssModal}
     */
    closeOnEscape() {
        this.closeOnKeys('Escape');
        return this;
    }

    /**
     * @return {NssModal}
     */
    closeOnBackspace() {
        this.closeOnKeys('Backspace');
        return this;
    }

    /**
     * @return {boolean}
     * @private
     */
    _isActiveElementEditable() {

        /**
         * @type {HTMLElement|HTMLInputElement|HTMLTextAreaElement|null}
         */
        const focused_el = document.activeElement || null;

        if (focused_el && focused_el.tagName) {

            const tag_name = focused_el.tagName.toLowerCase();

            if (focused_el.disabled || focused_el.readOnly) {
                return false;
            }

            switch (tag_name) {

                case 'input':

                    const type = focused_el.getAttribute('type').toLowerCase();
                    const is_type_editable = NssModal.NOT_EDITABLE_INPUT_TYPES.indexOf(type) === -1;

                    return is_type_editable;

                case 'textarea':

                    return true;

                default:

                    const editable_value = focused_el.getAttribute('contenteditable') || "false";
                    const is_editable = editable_value === "true";

                    return is_editable;
            }
        }

        return false;
    }

    /**
     * @param {string[]|string} keys
     * @return {NssModal}
     */
    closeOnKeys(keys) {

        if (typeof keys === 'string') {
            keys = [keys];
        }

        keys.forEach((key) => {
            this._close_keys[key] = true;
        });

        this._removeCloseOnKeyListener();

        this._close_key_handler = (/**KeyboardEvent*/event) => {

            if (this._isActiveElementEditable()) {
                return;
            }

            const is_close_key = this._close_keys[event.key] || false;

            if (is_close_key) {

                this._removeCloseOnKeyListener();

                this.hide();
            }
        }

        window.addEventListener('keydown', this._close_key_handler);

        return this;
    }

    /**
     * @return {NssModal}
     * @private
     */
    _removeCloseOnKeyListener() {

        if (this._close_key_handler) {
            window.removeEventListener('keydown', this._close_key_handler);
        }

        return this;
    }

    /**
     * @param {HTMLElement} content_el
     * @return {NssModal}
     */
    setContent(content_el) {
        this._content_el = content_el;
        return this;
    }

    /**
     * @return {boolean}
     */
    hasContent() {
        return this._content_el !== null;
    }
}

export {NssModal};
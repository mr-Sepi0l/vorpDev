import {NssButtons} from "../NssButtons/NssButtons.js";
import {NssUiComponent} from "../NssUiComponent.js";

/**
 * @extends {NssUiComponent}
 */
class NssConfirm extends NssUiComponent {

    static TEMPLATE_MODAL = '<div class="nss-confirm-modal"></div>';

    static TEMPLATE_DIALOG = `
            <div class="nss-confirm-dialog">
                <div class="nss-confirm__content">
                    <!-- Content will be inserted dynamically //-->
                </div>
                
                <div class="nss-confirm__buttons">
                    <!-- Buttons will be inserted dynamically //-->
                </div>
            </div>
    `;

    /**
     * @private
     * @param {string} message
     * @param {string} yes_label
     * @param {string} [no_label='']
     * @param {boolean} [danger=false]
     * @return {Promise}
     */
    static _factory(message, yes_label, no_label, danger) {

        danger = danger || false;

        const promise = new Promise((resolve, reject) => {

            const confirm = new NssConfirm();

            confirm
                .setMessage(message)
                .setYesLabel(yes_label, resolve);

            if (no_label !== '') {
                confirm.setNoLabel(no_label, reject);
            }

            if (danger) {
                confirm.setDanger();
            }

            confirm.show();
        });

        return promise;
    }

    /**
     * @param {string} message
     * @param {string} yes_label
     * @param {string} no_label
     * @param {boolean} [danger=false]
     * @return {Promise}
     */
    static confirm(message, yes_label, no_label, danger) {
        return this._factory(message, yes_label, no_label, danger);
    }

    /**
     * @param {string} message
     * @param {string} yes_label
     * @param {boolean} [danger=false]
     * @return {Promise}
     */
    static alert(message, yes_label, danger) {
        return this._factory(message, yes_label, '', danger);
    }

    constructor() {

        super();

        /**
         * @type {string}
         * @private
         */
        this._message = 'No message set.';

        /**
         * @type {string}
         * @private
         */
        this._yes_label = '';

        /**
         * @type {string}
         * @private
         */
        this._no_label = '';


        /**
         * @type {function}
         * @private
         */
        this._yes_cb = null;

        /**
         * @type {function}
         * @private
         */
        this._no_cb = null;

        /**
         * @type {boolean}
         * @private
         */
        this._is_danger = false;
    }

    /**
     * @return {NssConfirm}
     */
    setDanger() {
        this._is_danger = true;
        return this;
    }

    _createModal() {

        const template = document.createElement('template');
        template.innerHTML = NssConfirm.TEMPLATE_MODAL;

        /**
         * @type {HTMLElement}
         * @private
         */
        this._modal_el = template.content.querySelector('.nss-confirm-modal');
        this._modal_el.addEventListener('click', this._onNoClick.bind(this));

        document.body.appendChild(this._modal_el);
    }

    _createDialog() {

        const template = document.createElement('template');
        template.innerHTML = NssConfirm.TEMPLATE_DIALOG;

        /**
         * @type {HTMLElement}
         * @private
         */
        this._dialog_el = template.content.querySelector('.nss-confirm-dialog');

        this._dialog_el.querySelector('.nss-confirm__content').innerHTML = this._message;

        /**
         * @type {HTMLElement}
         * @private
         */
        this._buttons_container_el = this._dialog_el.querySelector('.nss-confirm__buttons');


        const buttons = new NssButtons();

        /**
         * @type {NssButton}
         * @private
         */
        this._yes_btn = null;

        if (this._yes_label !== '') {

            this._yes_btn =  buttons.create(this._yes_label);
            this._yes_btn.onClick(this._onYesClick.bind(this));

            if (this._is_danger) {
                this._yes_btn.setDanger();
            }

            this._buttons_container_el.appendChild(this._yes_btn.getWrapperEl());
        }

        /**
         * @type {NssButton}
         * @private
         */
        this._no_btn = null;

        if (this._no_label !== '') {

            this._no_btn =  buttons.create(this._no_label);
            this._no_btn.onClick(this._onNoClick.bind(this));

            this._buttons_container_el.appendChild(this._no_btn.getWrapperEl());
        }

        document.body.appendChild(this._dialog_el);
    }

    /**
     * @return {number}
     */
    getAnimDuration() {

        const style = getComputedStyle(document.body);
        const anim_dur_str = style.getPropertyValue('--nss-confirm-anim-dur') || '500ms'
        const anim_dur_number = parseInt(anim_dur_str, 10);

        let anim_dur_in_ms = 1000;

        if (anim_dur_str.indexOf('ms') !== -1) {
            anim_dur_in_ms = anim_dur_number;
        } else if (anim_dur_str.indexOf('s') !== -1) {
            anim_dur_in_ms = anim_dur_number * 1000;
        }

        return anim_dur_in_ms;
    }

    /**
     * @return {NssConfirm}
     */
    show() {

        this._createModal();

        this._createDialog();

        return this;
    }

    /**
     * @private
     */
    _onYesClick() {

        if (typeof this._yes_cb === "function") {
            this._yes_cb();
        }

        this.hide();
    }

    /**
     * @private
     */
    _onNoClick() {

        if (typeof this._no_cb === "function") {
            this._no_cb();
        }

        this.hide();
    }

    /**
     * @param {string} message
     * @return {NssConfirm}
     */
    setMessage(message) {
        this._message = message;
        return this;
    }

    /**
     * @param {string} label
     * @param {function} cb
     * @return {NssConfirm}
     */
    setYesLabel(label, cb) {
        this._yes_label = label;
        this._yes_cb = cb;
        return this;
    }

    /**
     * @param {string} label
     * @param {function} cb
     * @return {NssConfirm}
     */
    setNoLabel(label, cb) {
        this._no_label = label;
        this._no_cb = cb;
        return this;
    }

    /**
     * @return {Promise}
     */
    hide() {

        this._modal_el.classList.add('nss-confirm-modal--out');
        this._dialog_el.classList.add('nss-confirm-dialog--out');
        const anim_dur_in_ms = this.getAnimDuration() + 100;

        return new Promise((resolve, reject) => {
            window.setTimeout(() => {
                this._destroy();
                resolve();
            }, anim_dur_in_ms);
        });
    }

    /**
     * @private
     */
    _destroy() {
        this._modal_el.remove();
        this._dialog_el.remove();
    }

    /**
     * @inheritDoc
     */
    static getStyleFilenames() {
        return ['NssConfirm.css']
    }

    /**
     * @inheritDoc
     */
    static getComponentName() {
        return 'NssConfirm';
    }
}

export {NssConfirm};
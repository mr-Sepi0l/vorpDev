import {Language} from "./Language.js";
import {NssConfirm} from "../../nss/NssConfirm/NssConfirm.js";

class NewPosterImageDialog {

    static MODE_EVERYWHERE = true;
    static MODE_ONLY_HERE = false;

    /**
     * @param {PinBoard} pinboard
     * @param {Client|ClientMock} client
     * @param {boolean} [post_everywhere_at_once]
     * @param {PinBoardBoard} pinboard_cfg
     */
    constructor(pinboard, client, post_everywhere_at_once, pinboard_cfg) {

        /**
         * @type {PinBoard}
         * @private
         */
        this._pinboard = pinboard;

        /**
         * @type {Client|ClientMock}
         * @private
         */
        this._client = client;

        /**
         * @type {string}
         * @private
         */
        this._validated_image_url = '';

        /**
         * @type {boolean}
         * @private
         */
        this._post_everywhere_at_once = post_everywhere_at_once || false;

        /**
         * @type {boolean}
         * @private
         */
        this._pinning_service_available = pinboard_cfg.pinning_service_available || false;

        /**
         * @type {number}
         * @private
         */
        this._pinning_service_cost = pinboard_cfg.pinning_service_cost || 0;

        this._pinboard.lock();

        this._createDom();
    }

    /**
     * @private
     */
    _createDom() {

        this._createModal();

        this._createForm();
    }

    /**
     * @private
     */
    _createForm() {

        /**
         * @type {HTMLTemplateElement}
         */
        const tpl = document.querySelector('.pb-new-image-poster__template');

        /**
         * @type {HTMLElement}
         * @private
         */
        this._el = tpl.content.querySelector('.pb-new-image-poster').cloneNode(true);

        /**
         * @type {HTMLElement}
         * @private
         */
        this._form_el = this._el.querySelector('.pb-new-image-poster__form');

        /**
         * @type {HTMLInputElement}
         * @private
         */
        this._input_el = this._form_el.querySelector('.pb-new-image-poster__image-link-input');
        this._input_el.addEventListener('focus', () => {
            this._input_el.select();
        });

        /**
         * @type {HTMLElement}
         * @private
         */
        this._image_container_el = this._el.querySelector('.pb-new-image-poster__image-container');
        this._createPlacerHolderImage();

        this._label_el = this._form_el.querySelector('.pb-new-image-poster__image-link-label');
        this._label_el.innerHTML = Language.LHtml('image_link');

        /**
         * @type {HTMLElement}
         * @private
         */
        this._tip_el = this._form_el.querySelector('.pb-new-image-poster__image-link-help');
        this._tip_el.innerHTML = Language.LHtml('image_tip');

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._check_btn_el = this._form_el.querySelector('.pb-new-image-poster__image-check-btn');
        this._check_btn_el.innerHTML = Language.LHtml('check_image');
        this._check_btn_el.addEventListener('click', this._onCheckBtnClick.bind(this));

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._cancel_btn_el = this._el.querySelector('.pb-new-image-poster__cancel-btn');
        this._cancel_btn_el.innerHTML = Language.LHtml('notice_discard');
        this._cancel_btn_el.addEventListener('click', this.hide.bind(this));

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._save_btn_el = this._el.querySelector('.pb-new-image-poster__create-btn');
        this._save_btn_el.innerHTML = Language.LHtml('notice_pin');
        this._save_btn_el.addEventListener('click', this._save.bind(this));
        this._disableSaveBtn();

        document.body.appendChild(this._el);
    }

    /**
     * @private
     */
    _createPlacerHolderImage() {
        this._createImage('./img/placeholder.png');
    }

    /**
     * @param {string} src
     * @param {function} [on_load_callback]
     * @param {function} [on_error_callback]
     * @private
     */
    _createImage(src, on_load_callback, on_error_callback) {

        /**
         * @type {HTMLImageElement}
         * @private
         */
        this._image_el = document.createElement('img');

        if (on_load_callback) {
            this._image_el.addEventListener('load', on_load_callback);
        }

        if (on_error_callback) {
            this._image_el.addEventListener('error', on_error_callback);
        }

        this._image_el.classList.add('pb-new-image-poster__image');
        this._image_el.src = src;

        this._image_container_el.innerHTML = '';
        this._image_container_el.appendChild(this._image_el);
    }

    /**
     * @private
     */
    _disableSaveBtn() {
        this._save_btn_el.disabled = true;
    }

    /**
     * @private
     */
    _enableSaveBtn() {
        this._save_btn_el.disabled = false;
    }

    /**
     * @private
     */
    _animInputError() {
        this._shakeInput();
        this._disableSaveBtn();
        this._input_el.focus();
    }

    /**
     * @private
     */
    _onCheckBtnClick() {

        const image_url = (this._input_el.value || '').trim();

        const yes_label = Language.LHtml('ok');

        const show_error = () => {
            this._animInputError();
        };

        if (image_url === '') {
            NssConfirm.alert(Language.LHtml('image_url_empty'), yes_label).then(show_error);
            return;
        }

        const regex = new RegExp('^(http|https):\\/\\/.*[.]{1}(jpg|png|jpeg|webm)$', 'gmi')

        const pathname = image_url.split('?')[0] || image_url;

        if (false === regex.test(pathname)) {
            NssConfirm.alert(Language.LHtml('no_valid_image_url'), yes_label).then(show_error);
            return;
        }

        const block_urls = this._pinboard.getBlockedUrls();

        if (block_urls.length > 0) {

            const block_urls_regexp = new RegExp(block_urls.join('|'), 'gmi');
            const is_blocked = block_urls_regexp.test(image_url);

            if (is_blocked === true) {
                NssConfirm.alert(Language.LHtml('blocked_image_url'), yes_label).then(show_error);
                return;
            }
        }

        const on_load = () => {
            this._validated_image_url = image_url;
            this._enableSaveBtn();
        };

        const on_error = () => {
            this._createPlacerHolderImage();
            NssConfirm.alert(Language.LHtml('image_not_found'), yes_label).then(show_error);
        }

        this._createImage(image_url, on_load, on_error);
    }

    /**
     * @private
     */
    _shakeInput() {

        this._input_el.classList.remove('pb-new-image-poster__image-link-input--shake');

        window.setTimeout(() => {
            this._input_el.classList.add('pb-new-image-poster__image-link-input--shake');
        }, 0);
    }

    /**
     * @private
     */
    _save() {

        /**
         * @param {boolean} [everywhere]
         * @param {boolean} [pinning_service]
         */
        const save = (everywhere, pinning_service) => {

            everywhere = everywhere || false;
            pinning_service = pinning_service || false;

            /**
             * @type {PinBoardImagePoster}
             */
            const image_poster = {
                image_url: this._validated_image_url,
                everywhere: everywhere,
                pinning_service: pinning_service,
            }

            this._client.saveImagePoster(image_poster, () => {
                this._pinboard.reloadPoster();
                this._pinboard.showNotice(Language.LHtml('you_pinned_something'));
                this.hide();
            });
        };

        if (this._post_everywhere_at_once) {

            const answer = NssConfirm.confirm(
                Language.LHtml('post_everywhere_at_once'),
                Language.LHtml('post_everywhere_at_once_every_where'),
                Language.LHtml('post_everywhere_at_once_only_here')
            );

            answer
                .then(() => {
                    save(NewPosterImageDialog.MODE_EVERYWHERE);
                })
                .catch(() => {
                    save(NewPosterImageDialog.MODE_ONLY_HERE);
                });

            return;
        }

        if (this._pinning_service_available && this._pinning_service_cost > 0) {

            const answer = NssConfirm.confirm(
                Language.LHtml('post_pinning_service'),
                Language.LHtml('post_pinning_service_every_where', this._pinning_service_cost),
                Language.LHtml('post_pinning_service_only_here')
            );

            answer
                .then(() => {
                    save(NewPosterImageDialog.MODE_ONLY_HERE, NewPosterImageDialog.MODE_EVERYWHERE);
                })
                .catch(() => {
                    save(NewPosterImageDialog.MODE_ONLY_HERE, NewPosterImageDialog.MODE_ONLY_HERE);
                });

            return;
        }

        save(NewPosterImageDialog.MODE_ONLY_HERE);
    }

    /**
     * @private
     */
    _createModal() {

        this._modal_el = document.createElement('div');
        this._modal_el.classList.add('pb-new-image-poster__modal');

        document.body.appendChild(this._modal_el);
    }

    /**
     * @return {number}
     */
    getAnimDuration() {

        const style = getComputedStyle(document.body);
        const anim_dur_str = style.getPropertyValue('--pb-new-text-poster-anim-dur') || '500ms'
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
     * @return {Promise}
     */
    hide() {

        this._modal_el.classList.add('pb-new-image-poster__modal--out');
        this._el.classList.add('pb-new-image-poster--out');
        const anim_dur_in_ms = this.getAnimDuration() + 100;

        return new Promise((resolve) => {
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
        this._pinboard.unlock();
        this._modal_el.remove();
        this._el.remove();
    }
}

export {NewPosterImageDialog};
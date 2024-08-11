import {Poster} from "./Poster.js";
import {NssConfirm} from "../../nss/NssConfirm/NssConfirm.js";
import {Language} from "./Language.js";

class PosterDetails extends Poster {

    /**
     * @type {PinBoardOnPosterDetailsClosedCallback}
     * @private
     */
    _on_close_cb = null;

    /**
     * @type {PinBoardOnPosterRemovedCallback}
     * @private
     */
    _on_remove_cb = null;

    /**
     * @inheritDoc
     */
    _determineElements() {

        super._determineElements();

        this._el.classList.add('pb-poster--details');

        /**
         * @type {HTMLDivElement}
         */
        const next_container_el = document.createElement('div');
        next_container_el.classList.add('pb-poster__next-btn');

        /**
         * @type {HTMLButtonElement}
         */
        this.next_button_el = document.createElement('button');
        this.next_button_el.classList.add('nss-btn');
        this.next_button_el.classList.add('nss-btn--icon');
        this.next_button_el.innerHTML = '<span class="pb-icon__right-open"></span>';
        next_container_el.appendChild(this.next_button_el)

        if (this._hasNext() === false) {
            this.next_button_el.disabled = true;
        }

        this._body_el.appendChild(next_container_el);


        /**
         * @type {HTMLDivElement}
         */
        const prev_container_el = document.createElement('div');
        prev_container_el.classList.add('pb-poster__prev-btn');

        /**
         * @type {HTMLButtonElement}
         */
        this.prev_button_el = document.createElement('button');
        this.prev_button_el.classList.add('nss-btn');
        this.prev_button_el.classList.add('nss-btn--icon');
        this.prev_button_el.innerHTML = '<span class="pb-icon__left-open"></span>';
        prev_container_el.appendChild(this.prev_button_el)

        if (this._hasPrev() === false) {
            this.prev_button_el.disabled = true;
        }

        this._body_el.appendChild(prev_container_el);
    }

    /**
     * @inheritDoc
     */
    _setupEvents() {

        super._setupEvents();

        this._close_btn_el.addEventListener('click', this._onClickCloseBtn.bind(this));

        if (this._remove_btn_el) {
            this._remove_btn_el.addEventListener('click', this._onClickRemoveBtn.bind(this));
        }

        this.next_button_el.addEventListener('click', this._onClickNextBtn.bind(this));

        this.prev_button_el.addEventListener('click', this._onClickPrevBtn.bind(this));
    }

    /**
     * @private
     * @return {HTMLDivElement}
     */
    _getPreviewEl() {
        return document.querySelector('.pb-poster--preview[data-nss-pinboard-poster-id="' + this._id + '"]');
    }

    /**
     * @return {boolean}
     * @private
     */
    _hasNext() {
        const preview_el = this._getPreviewEl();
        return preview_el.nextElementSibling !== null;
    }

    /**
     * @return {boolean}
     * @private
     */
    _hasPrev() {
        const preview_el = this._getPreviewEl();
        return preview_el.previousElementSibling !== null;
    }

    /**
     * @private
     */
    _removeButtons() {

        this.prev_button_el.remove();
        this.next_button_el.remove();

        if (this._remove_btn_el) {
            this._remove_btn_el.remove();
        }

        this._close_btn_el.remove();
    }

    /**
     *
     * @param {string} [css_class]
     * @private
     */
    _removeSilently(css_class) {

        if (typeof css_class === 'string' && css_class !== '') {
            this._el.classList.add(css_class);
        }

        this._removeButtons();

        window.setTimeout(() => {

            const parent_el = this._el.parentElement;

            if (parent_el.classList.contains('pb-modal__poster-container')) {
                parent_el.remove();
            }

            this.destroy();

        }, 1000);
    }

    /**
     * @private
     */
    _onClickNextBtn() {

        const preview_el = this._getPreviewEl();
        const next_el = preview_el.nextElementSibling || preview_el.parentElement.firstElementChild;
        next_el.click();

        this._removeSilently('pb-new-text-poster__poster-back--anim-next-out');
    }

    /**
     * @private
     */
    _onClickPrevBtn() {

        const preview_el = this._getPreviewEl();
        const prev_el = preview_el.previousElementSibling || preview_el.parentElement.lastElementChild;
        prev_el.click();

        this._removeSilently('pb-new-text-poster__poster-back--anim-prev-out');
    }

    /**
     * @private
     */
    _onClickRemoveBtn() {

        this.lock();

        const promise = NssConfirm.confirm(
            Language.LHtml('really_unpin'),
            Language.LHtml('really_unpin_yes'),
            Language.LHtml('really_unpin_no'),
            true
        );

        promise
            .then(this._removePoster.bind(this))
            .catch(() => { /* Nix */
            })
            .finally(this.unlock.bind(this));
    }

    /**
     * @private
     */
    _removePoster() {
        this._client.removePoster(this._id, function () {
            this._fireRemove();
            this.hide();
        }.bind(this));
    }

    hide() {
        this._fireClose();
        this.destroy();
    }

    /**
     * @private
     */
    _onClickCloseBtn() {
        this.hide();
    }

    /**
     * @param {PinBoardOnPosterDetailsClosedCallback} cb
     * @return {PosterDetails}
     */
    listenOnClose(cb) {
        this._on_close_cb = cb;
        return this;
    }

    /**
     * @param {PinBoardOnPosterRemovedCallback} cb
     * @return {PosterDetails}
     */
    listenOnRemove(cb) {
        this._on_remove_cb = cb;
        return this;
    }

    /**
     * @private
     */
    _fireClose() {
        if (this._on_close_cb) {
            this._on_close_cb(this);
        }
    }

    /**
     * @private
     */
    _fireRemove() {
        if (this._on_remove_cb) {
            this._on_remove_cb(this);
        }
    }
}

export {PosterDetails};
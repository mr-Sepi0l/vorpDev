import {NssSimpleTextEditor} from "../../nss/NssSimpleTextEditor/NssSimpleTextEditor.js";
import {Language} from "./Language.js";
import {NssConfirm} from "../../nss/NssConfirm/NssConfirm.js";

class NewPosterTextDialog {

    static MODE_EVERYWHERE = true;
    static MODE_ONLY_HERE = false;

    /**
     * @static
     * @type {PinBoardPosterBackground[]}
     */
    static PAPER_BG_LIST = [
        {
            id: 1,
            poster_cls: 'pb-new-text-poster__poster-back--1',
            container_cls: 'pb-new-text-poster__text-container--1'
        },
        {
            id: 2,
            poster_cls: 'pb-new-text-poster__poster-back--2',
            container_cls: 'pb-new-text-poster__text-container--2'
        },
        {
            id: 3,
            poster_cls: 'pb-new-text-poster__poster-back--3',
            container_cls: 'pb-new-text-poster__text-container--3'
        },
        {
            id: 4,
            poster_cls: 'pb-new-text-poster__poster-back--4',
            container_cls: 'pb-new-text-poster__text-container--4'
        },
        {
            id: 5,
            poster_cls: 'pb-new-text-poster__poster-back--5',
            container_cls: 'pb-new-text-poster__text-container--5'
        },
        {
            id: 6,
            poster_cls: 'pb-new-text-poster__poster-back--6',
            container_cls: 'pb-new-text-poster__text-container--6'
        },
    ];

    /**
     * @param {number} id
     * @return {PinBoardPosterBackground}
     */
    static getBgById(id) {

        const found_bg = NewPosterTextDialog.PAPER_BG_LIST.find((bg) => {
            return bg.id === id;
        });

        return found_bg;
    }

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
         * @type {number}
         * @private
         */
        this._current_bg_index = 4;

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

        const bg = this._getBgByIndex(this._current_bg_index);

        /**
         * @type {HTMLTemplateElement}
         */
        const tpl = document.querySelector('.pb-new-text-poster__template');

        /**
         * @type {HTMLElement}
         * @private
         */
        this._el = tpl.content.querySelector('.pb-new-text-poster').cloneNode(true);

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._cancel_btn_el = this._el.querySelector('.pb-new-text-poster__cancel-btn');
        this._cancel_btn_el.innerHTML = Language.LHtml('notice_discard');
        this._cancel_btn_el.addEventListener('click', this.hide.bind(this));

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._save_btn_el = this._el.querySelector('.pb-new-text-poster__create-btn');
        this._save_btn_el.innerHTML = Language.LHtml('notice_pin');
        this._save_btn_el.addEventListener('click', this._save.bind(this));

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._next_bg_btn_el = this._el.querySelector('.pb-new-text-poster__next-bg-btn');
        this._next_bg_btn_el.addEventListener('click', this._nextBg.bind(this));

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._prev_bg_btn_el = this._el.querySelector('.pb-new-text-poster__prev-bg-btn');
        this._prev_bg_btn_el.addEventListener('click', this._prevBg.bind(this));

        /**
         * @type {HTMLElement}
         * @private
         */
        this._poster_bg_el = this._el.querySelector('.pb-new-text-poster__poster-back');
        this._poster_bg_el.classList.add(bg.poster_cls);

        /**
         * @type {HTMLElement}
         * @private
         */
        this._text_container = this._el.querySelector('.pb-new-text-poster__text-container');
        this._text_container.classList.add(bg.container_cls);

        /**
         * @type {NssSimpleTextEditor}
         * @private
         */
        this._editor = new NssSimpleTextEditor(this._text_container);
        this._editor
            .setPlaceholderText(Language.LHtml('placeholder_your_text_here'))
            .start();

        document.body.appendChild(this._el);
    }

    /**
     * @private
     */
    _save() {

        if (false === this._editor.isErrorHandlingSuccessful()) {
            return;
        }

        /**
         * @param {boolean} [everywhere]
         * @param {boolean} [pinning_service]
         */
        const save = (everywhere, pinning_service) => {

            everywhere = everywhere || false;
            pinning_service = pinning_service || false;

            const bg = this._getBgByIndex();
            const sections = this._editor.getSectionsComputed();

            /**
             * @type {PinBoardTextPoster}
             */
            const text_poster = {
                paper: bg.id,
                sections: sections,
                everywhere: everywhere,
                pinning_service: pinning_service,
            }

            this._client.saveTextPoster(text_poster, () => {
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
                    save(NewPosterTextDialog.MODE_EVERYWHERE);
                })
                .catch(() => {
                    save(NewPosterTextDialog.MODE_ONLY_HERE);
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
                    save(NewPosterTextDialog.MODE_ONLY_HERE, NewPosterTextDialog.MODE_EVERYWHERE);
                })
                .catch(() => {
                    save(NewPosterTextDialog.MODE_ONLY_HERE, NewPosterTextDialog.MODE_ONLY_HERE);
                });

            return;
        }

        save(NewPosterTextDialog.MODE_ONLY_HERE);
    }

    /**
     * @private
     */
    _createModal() {

        this._modal_el = document.createElement('div');
        this._modal_el.classList.add('pb-new-text-poster__modal');

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
     * @param {HTMLElement} new_el
     * @param {HTMLElement} reference_el
     * @private
     */
    _insertAfter(new_el, reference_el) {
        reference_el.parentNode.insertBefore(new_el, reference_el.nextSibling);
    }

    /**
     * @param {string} new_container_class
     * @private
     */
    _setNewContainerCls(new_container_class) {
        NewPosterTextDialog.PAPER_BG_LIST.forEach((bg) => {
            this._text_container.classList.remove(bg.container_cls);
        });

        this._text_container.classList.add(new_container_class);
    }

    /**
     * @private
     */
    _nextBg() {

        const old_bg_el = this._poster_bg_el;
        old_bg_el.classList.add('pb-new-text-poster__poster-back--anim-next-out');

        const next_bg = this._getNextBg();
        const next_bg_el = document.createElement('div');
        next_bg_el.classList.add('pb-new-text-poster__poster-back');
        next_bg_el.classList.add(next_bg.poster_cls);
        next_bg_el.classList.add('pb-new-text-poster__poster-back--anim-next-in');

        this._setNewContainerCls(next_bg.container_cls);
        this._poster_bg_el = next_bg_el;

        this._insertAfter(next_bg_el, old_bg_el);

        const anim_dur = this.getAnimDuration();

        window.setTimeout(() => {
            next_bg_el.classList.remove('pb-new-text-poster__poster-back--anim-next-in');
            old_bg_el.remove();
        }, anim_dur);
    }

    /**
     * @private
     */
    _prevBg() {

        const old_bg_el = this._poster_bg_el;
        old_bg_el.classList.add('pb-new-text-poster__poster-back--anim-prev-out');

        const prev_bg = this._getPrevBg();
        const prev_bg_el = document.createElement('div');
        prev_bg_el.classList.add('pb-new-text-poster__poster-back');
        prev_bg_el.classList.add('pb-new-text-poster__poster-back--anim-prev-in');
        prev_bg_el.classList.add(prev_bg.poster_cls);

        this._setNewContainerCls(prev_bg.container_cls);
        this._poster_bg_el = prev_bg_el;

        this._insertAfter(prev_bg_el, old_bg_el);

        const anim_dur = this.getAnimDuration();

        window.setTimeout(() => {
            prev_bg_el.classList.remove('pb-new-text-poster__poster-back--anim-prev-in');
            old_bg_el.remove();
        }, anim_dur);
    }

    /**
     * @return {PinBoardPosterBackground}
     * @private
     */
    _getPrevBg() {

        this._current_bg_index--;

        if (this._current_bg_index < 0) {
            this._current_bg_index = NewPosterTextDialog.PAPER_BG_LIST.length - 1;
        }

        return this._getBgByIndex(this._current_bg_index);
    }

    /**
     * @return {PinBoardPosterBackground}
     * @private
     */
    _getNextBg() {

        this._current_bg_index++;

        if (this._current_bg_index >= NewPosterTextDialog.PAPER_BG_LIST.length) {
            this._current_bg_index = 0;
        }

        return this._getBgByIndex(this._current_bg_index);
    }

    /**
     * @param {number} [index]
     * @return {PinBoardPosterBackground}
     * @private
     */
    _getBgByIndex(index) {

        if (typeof index === 'undefined') {
            index = this._current_bg_index;
        }

        return NewPosterTextDialog.PAPER_BG_LIST[index];
    }

    /**
     * @return {Promise}
     */
    hide() {

        this._modal_el.classList.add('pb-new-text-poster__modal--out');
        this._el.classList.add('pb-new-text-poster--out');
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

export {NewPosterTextDialog};
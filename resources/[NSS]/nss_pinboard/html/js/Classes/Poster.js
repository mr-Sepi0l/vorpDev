import {NewPosterTextDialog} from "./NewPosterTextDialog.js";
import {Language} from "./Language.js";

class Poster {

    static CSS_REMOVABLE = 'pb-poster--removable';
    static CSS_TEXT = 'pb-poster--text';

    /**
     * @constructor
     * @param {string|number} id
     * @param {string} type
     * @param {PinBoardTextPoster|PinBoardImagePoster} content
     * @param {boolean} removable
     * @param {Client} client
     * @param {PinBoard} pinboard
     */
    constructor(id, type, content, removable, client, pinboard) {

        /**
         * @type {string|number}
         * @protected
         */
        this._id = id;

        /**
         * @type {string}
         * @protected
         */
        this._type = type;

        /**
         * @type {PinBoardTextPoster|PinBoardImagePoster}
         * @protected
         */
        this._content = content || '';

        /**
         * @type {boolean}
         * @protected
         */
        this._removable = removable || false;

        /**
         * @type {Client}
         * @protected
         */
        this._client = client;

        /**
         * @type {PinBoard}
         * @protected
         */
        this._pinboard = pinboard;

        this._determineElements();

        this._setupEvents();
    }

    /**
     * @protected
     */
    _setupEvents() {
        /** Nix */
    }

    /**
     * @protected
     */
    _determineElements() {

        /**
         * @type {HTMLTemplateElement}
         */
        const template = document.querySelector('.pb-poster__template');

        /**
         * @type {HTMLElement}
         * @protected
         */
        this._el = template.content.querySelector('.pb-poster').cloneNode(true);

        if (this.isRemovable()) {
            this._el.classList.add(Poster.CSS_REMOVABLE);
        }

        /**
         * @type {HTMLButtonElement}
         * @protected
         */
        this._close_btn_el = this._el.querySelector('.pb-poster__close-btn');
        this._close_btn_el.innerHTML = Language.LHtml('notice_leave');

        /**
         * @type {HTMLButtonElement}
         * @protected
         */
        this._remove_btn_el = this._el.querySelector('.pb-poster__remove-btn');
        this._remove_btn_el.innerHTML = Language.LHtml('notice_unpin');

        if (this.isRemovable() === false) {
            this._remove_btn_container_el = this._el.querySelector('.pb-poster__remove-btn-container');
            this._remove_btn_container_el.remove();
            delete this._remove_btn_el;
        }

        /**
         * @type {HTMLDivElement}
         * @protected
         */
        this._body_el = this._el.querySelector('.pb-poster__body');


        switch (this._type) {

            case 'text':

                this._el.classList.add(Poster.CSS_TEXT);

                const bg = NewPosterTextDialog.getBgById(this._content.paper);

                const bg_el = document.createElement('div');
                bg_el.classList.add('pb-new-text-poster__poster-back');
                bg_el.classList.add(bg.poster_cls);

                this._body_el.appendChild(bg_el);

                const content_el = document.createElement('div');
                content_el.classList.add('pb-new-text-poster__text-container');
                content_el.classList.add(bg.container_cls);
                this._body_el.appendChild(content_el);

                /**
                 * @type {PinBoardPosterSection[]}
                 */
                const sections = this._content.sections || [];

                sections.forEach((section) => {
                    const section_el = document.createElement('div');
                    section_el.classList.add('pb-new-text-poster__text-section');
                    section_el.classList.add('pb-new-text-poster__text-section--align-' + section.align);
                    section_el.classList.add('pb-new-text-poster__text-section--type-' + section.type);
                    section_el.innerText = section.text;
                    content_el.appendChild(section_el);
                });

                break;

            case 'image':

                /**
                 * @type {HTMLImageElement}
                 * @private
                 */
                const img_el = document.createElement('img');

                const addRandomRipped = () => {

                    const ripped_images = [
                        'bulletin_paper_01_ripped.png',
                        'bulletin_paper_02_ripped.png',
                        'bulletin_paper_03_ripped.png',
                        'bulletin_paper_04_ripped.png',
                        'bulletin_paper_05_ripped.png'
                    ];

                    const random = Math.floor(Math.random() * 3);
                    const random_image = ripped_images[random];
                    img_el.src = './img/' + random_image;
                }

                const removeLoadingIndicator = () => {
                    img_el.classList.remove('pb-poster__image--loading');
                };

                const onImageLoad = () => {
                    removeEventHandler();
                    removeLoadingIndicator();
                };

                const onImageError = () => {
                    removeEventHandler();
                    removeLoadingIndicator();
                    addRandomRipped();
                }

                const removeEventHandler = () => {
                    img_el.removeEventListener('load', onImageLoad);
                    img_el.removeEventListener('error', onImageError);
                }

                img_el.addEventListener('load', onImageLoad);
                img_el.addEventListener('error', onImageError);

                img_el.classList.add('pb-poster__image');
                img_el.classList.add('pb-poster__image--loading');
                img_el.src = this._content.image_url;

                this._body_el.appendChild(img_el);

                break;
        }

        this._el.setAttribute('data-nss-pinboard-poster-id', this._id);
    }

    /**
     * @return {HTMLElement}
     */
    getEl() {
        return this._el;
    }

    /**
     * @return {boolean}
     */
    isRemovable() {
        return this._removable === true;
    }

    destroy() {
        this._el.remove();
    }

    /**
     * @param {PosterDetails|PosterPreview|function} poster_class
     * @return {PosterDetails|PosterPreview}
     */
    createClone(poster_class) {
        const poster_details = new poster_class(this._id, this._type, this._content, this._removable, this._client, this._pinboard);
        return poster_details;
    }

    /**
     * @return {Poster}
     */
    lock() {
        this._pinboard.lock();
        return this;
    }

    /**
     * @return {Poster}
     */
    unlock() {
        this._pinboard.unlock();
        return this;
    }
}

export {Poster};
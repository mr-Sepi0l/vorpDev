import {NssButtons} from "../NssButtons/NssButtons.js";
import {NssHelper} from "../NssHelper/NssHelper.js";
import {NssUiComponent} from "../NssUiComponent.js";
import {NssAudio} from "../NssAudio/NssAudio.js";

/**
 * @extends {NssUiComponent}
 */
class NssPadLock extends NssUiComponent {

    CSS_OPEN_LOCK = 'combi-lock__closer--open';
    CSS_VISIBLE = 'combi-lock--visible';
    CSS_SLIDE_IN = 'combi-lock__slide-in';
    CSS_SLIDE_OUT = 'combi-lock__slide-out';
    CSS_CAROUSEL = 'combi-lock__carousel';
    CSS_ERROR = 'combi-lock--error';

    /**
     * @type {Object.<string,{start:number, code:string}>}
     * @private
     */
    static _cache = {};

    /**
     * @param {string} code
     */
    constructor(code) {

        super();

        /**
         * @type {string}
         * @private
         */
        this._code = code;

        /**
         * @type {number}
         * @private
         */
        this._code_length = code.length;

        /**
         * @type {number}
         * @private
         */
        this._number_length = '0123456789'.length;

        /**
         * @type {number}
         * @private
         */
        this._deg_per_number = 360 / this._number_length;

        /**
         * @type {HTMLDivElement[]}
         * @private
         */
        this._rollers = [];

        /**
         * @type {NssButtons}
         * @private
         */
        this._btn_generator = new NssButtons();

        /**
         * @type {NssPadLock~onNewCode}
         * @private
         */
        this._on_new_code_cb = null;

        /**
         * @type {NssPadLock~onOpen}
         * @private
         */
        this._on_open_cb = null;

        /**
         * @type {boolean}
         * @private
         */
        this._is_closable = false;

        /**
         * @type {string}
         * @private
         */
        this._audio_path = 'nui://nss_libs/ui/NssPadLock/sounds/';

        /**
         * @type {NssAudio}
         * @private
         */
        this._audio_player = new NssAudio(this._audio_path, 1);

        /**
         * @type {number}
         * @private
         */
        this._time_penalty_in_ms = 250;

        /**
         * @type {string}
         * @private
         */
        this._translation_unlock = 'Unlock';

        /**
         * @type {string}
         * @private
         */
        this._translation_lock = 'Lock';

        /**
         * @type {boolean}
         * @private
         */
        this._is_automation_disabled = false;

        /**
         * @type {function|null}
         * @private
         */
        this._remove_listeners_cb = null;

        /**
         * @type {string|null}
         * @private
         */
        this._cache_uid = null;

        /**
         * @type {number|null}
         * @private
         */
        this._cache_duration_in_ms = null;


        this._generateDom();
    }

    /**
     * @param {string} unique_identifier
     * @param {number} cache_duration_in_ms
     * @return {this}
     */
    enableCache(unique_identifier, cache_duration_in_ms) {
        this._cache_uid = unique_identifier;
        this._cache_duration_in_ms = cache_duration_in_ms;
        return this;
    }

    /**
     * @private
     * @return {this}
     */
    _refreshCache() {

        if (false === this._hasCache()) {
            return this;
        }

        if (NssPadLock._cache[this._cache_uid] === undefined) {

            NssPadLock._cache[this._cache_uid] = {
                start: Date.now(),
                code: this.getCode()
            };

        } else {
            NssPadLock._cache[this._cache_uid].start = Date.now();
        }

        return this;
    }

    /**
     * @return {string|null}
     * @private
     */
    _getCodeFromCache() {

        if (false === this._hasCache()) {
            return true;
        }

        const cache = NssPadLock._cache[this._cache_uid] || {start: 0, code: ''};

        const is_cache_expired = (Date.now() - cache.start) > this._cache_duration_in_ms;

        if (is_cache_expired) {
            return null;
        }

        return cache.code;
    }

    /**
     * @return {boolean}
     * @private
     */
    _hasCache() {
        return (typeof this._cache_uid === "string" && this._cache_uid.length > 0);
    }

    /**
     * @param {string} new_translation
     * @return {NssPadLock}
     */
    setTranslationUnlock(new_translation) {
        this._translation_unlock = new_translation;
        return this;
    }

    /**
     * @param {string} new_translation
     * @return {NssPadLock}
     */
    setTranslationLock(new_translation) {
        this._translation_lock = new_translation;
        return this;
    }

    /**
     * For dev usage only.
     * @param {string} path
     * @return {NssPadLock}
     */
    setAudioPath(path) {
        this._audio_path = path;
        this._audio_player.setAudioPath(path);
        return this;
    }

    /**
     * @private
     */
    _generateDom() {

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._el = document.createElement('div');
        this._el.classList.add('combi-lock');
        document.body.appendChild(this._el);

        this._inner_el = document.createElement('div');
        this._inner_el.classList.add('combi-lock__inner');
        this._el.appendChild(this._inner_el);

        /**
         * @type {number}
         * @private
         */
        this._slide_in_out_anim_dur_in_ms = NssHelper.getAnimDuration(this._el, '--combi-lock-anim-dur');

        /**
         * @type {number}
         * @private
         */
        this._error_anim_dur_in_ms = NssHelper.getAnimDuration(this._el, '--combi-lock-error_anim-dur');

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._closer_el = document.createElement('div');
        this._closer_el.classList.add('combi-lock__closer');
        this._inner_el.appendChild(this._closer_el);

        /**
         * @type {number}
         * @private
         */
        this._closer_animation_dur_in_ms = NssHelper.getAnimDuration(this._closer_el, '--transition-duration');

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._rollers_body_el = document.createElement('div');
        this._rollers_body_el.classList.add('combi-lock__rollers-body');
        this._inner_el.appendChild(this._rollers_body_el);

        const top_el = document.createElement('div');
        top_el.classList.add('combi-lock__top');
        this._rollers_body_el.appendChild(top_el);

        this._rollers_el = document.createElement('div');
        this._rollers_el.classList.add('combi-lock__rollers');
        this._rollers_body_el.appendChild(this._rollers_el);

        const bottom_el = document.createElement('div');
        bottom_el.classList.add('combi-lock__bottom');
        this._rollers_body_el.appendChild(bottom_el);

        this._addSeparator();

        for (let i = 0; i < this._code_length; i++) {

            const roller_el = this._generateRoller(this._rollers_el);

            roller_el._pos = i;

            this._rollers.push(roller_el);

            this._addSeparator();
        }

        /**
         * @type {NssButton}
         * @private
         */
        this._unlock_btn = this._btn_generator.create(this._translation_unlock);
        this._unlock_btn.setGlowGreen();

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._unlock_btn_container_el = this._unlock_btn.getWrapperEl();
        this._unlock_btn_container_el.classList.add('combi-lock__unlock-btn');

        this._inner_el.appendChild(this._unlock_btn_container_el);

        this._unlock_btn.onClick(() => {

            if (this.isOpen()) {

                this.closeLock().then(() => {
                    this.reset();
                });

                return;

            }

            this._handleOpeningTry();
        });
    }

    /**
     * @private
     */
    _handleOpeningTry() {

        if (this._on_new_code_cb) {
            this._on_new_code_cb(this.getCode());
        }

        if (this._is_automation_disabled) {
            return;
        }

        if (this.getCode() === this._code) {
            this.openLock();
        } else {
            this.wrongCode();
        }
    }

    /**
     * @return {NssPadLock}
     */
    disableAutomation() {
        this._is_automation_disabled = true;
        return this;
    }

    /**
     * @private
     */
    _resetAnimTimeoutId() {
        if (this._anim_timeout_id) {
            window.clearTimeout(this._anim_timeout_id);
            delete this._anim_timeout_id;
        }
    }

    /**
     * @private
     */
    _resetShowHideTimeouts() {
        if (this._show_hide_timeout_id) {
            window.clearTimeout(this._show_hide_timeout_id);
            delete this._show_hide_timeout_id;
        }

        if (this._show_hide_tick_timeout_id) {
            window.clearTimeout(this._show_hide_tick_timeout_id);
            delete this._show_hide_tick_timeout_id;
        }
    }

    /**
     * @return {Promise<void>}
     */
    show() {

        return new Promise((resolve) => {

            this._addListeners();

            this._resetShowHideTimeouts();

            this._el.classList.remove(this.CSS_SLIDE_OUT);
            this._el.classList.add(this.CSS_VISIBLE);

            this._show_hide_tick_timeout_id = window.setTimeout(() => {

                this._el.classList.add(this.CSS_SLIDE_IN);

                this._show_hide_timeout_id = window.setTimeout(resolve, this._slide_in_out_anim_dur_in_ms);

                this._handleCachedCodeIfAvailable();

            }, 0);
        });
    }

    /**
     * @return {Promise<void>}
     */
    hide() {
        return new Promise((resolve) => {

            this._removeListeners();

            this._resetShowHideTimeouts();

            this._el.classList.remove(this.CSS_SLIDE_IN);

            this._show_hide_tick_timeout_id = window.setTimeout(() => {

                this._el.classList.add(this.CSS_SLIDE_OUT);

                this._show_hide_timeout_id = window.setTimeout(() => {
                    resolve();
                }, this._slide_in_out_anim_dur_in_ms);

            }, 0);

        }).then(() => {
            this._el.classList.remove(this.CSS_VISIBLE);
        });
    }

    destroy() {
        this._el.remove();
    }

    /**
     * @return {Promise<void>}
     */
    shake() {
        return new Promise((resolve) => {

            this._el.classList.remove(this.CSS_ERROR);

            window.setTimeout(() => {

                this._el.classList.add(this.CSS_ERROR);

                window.setTimeout(() => {

                    this._unlock_btn.setEnabled();
                    this._el.classList.remove(this.CSS_ERROR);
                    resolve();

                }, this._error_anim_dur_in_ms);

            }, 0);

        });
    }

    /**
     * @return {NssPadLock}
     */
    disableButtons() {
        this._unlock_btn.setDisabled();
        return this;
    }

    /**
     * @return {NssPadLock}
     */
    enableButtons() {
        this._unlock_btn.setEnabled();
        return this;
    }

    /**
     * @return {Promise<void>}
     */
    wrongCode() {

        return new Promise((resolve) => {

            this.disableButtons();

            this.closeLock().then(() => {

                this.disableButtons();

                this.shake().then(() => {

                    this.disableButtons();

                    this.reset().then(() => {

                        this.disableButtons();

                        window.setTimeout(() => {

                            this.enableButtons();
                            resolve();

                        }, this._time_penalty_in_ms);
                    });
                });
            });
        });
    }

    /**
     * @param {number} duration_in_ms
     * @return {NssPadLock}
     */
    setTimePenalty(duration_in_ms) {
        this._time_penalty_in_ms = duration_in_ms;
        return this;
    }

    /**
     * @return {Promise<void>}
     */
    reset() {
        this._rollers.forEach((roller_el) => {
            const carousel = roller_el.querySelector(`.${this.CSS_CAROUSEL}`);
            this._setCarouselDeg(roller_el, carousel, 0);
            this._determineValue(roller_el);
        });

        return this.closeLock();
    }

    /**
     * @return {boolean}
     */
    isOpen() {
        return this._closer_el.classList.contains(this.CSS_OPEN_LOCK);
    }

    /**
     * @private
     */
    _handleClosable() {

        this._unlock_btn.setLabel(this._translation_unlock);
        this._unlock_btn.setEnabled();

        if (this.isClosable()) {

            if (this.isOpen()) {
                this._unlock_btn.setLabel(this._translation_lock);
            }

        } else {

            if (this.isOpen()) {
                this._unlock_btn.setDisabled();
            }
        }
    }

    /**
     * @return {boolean}
     */
    isClosable() {
        return this._is_closable === true;
    }

    /**
     * @return {NssPadLock}
     */
    setClosable() {
        this._is_closable = true;
        this._handleClosable();
        return this;
    }

    /**
     * @return {NssPadLock}
     */
    setNotClosable() {
        this._is_closable = false;
        this._handleClosable();
        return this;
    }

    /**
     * @private
     */
    _removeListeners() {

        if (this._remove_listeners_cb) {
            this._remove_listeners_cb();
            this._remove_listeners_cb = null;
        }
    }

    /**
     * @private
     */
    _addListeners() {

        if (this._remove_listeners_cb) {
            return;
        }

        this._remove_listeners_cb = this._addDragAndScroll();
    }

    /**
     * @return {Promise<void>}
     */
    openLock() {

        return new Promise(resolve => {

            this._refreshCache();

            this._resetAnimTimeoutId();

            if (this.isOpen()) {
                resolve();
                return;
            }

            this._playAudioOpen();

            this._closer_el.classList.add(this.CSS_OPEN_LOCK);

            this._handleClosable();

            this._anim_timeout_id = window.setTimeout(resolve, this._closer_animation_dur_in_ms);

        }).then(() => {

            this._handleClosable();

            this._resetAnimTimeoutId();

            if (this._on_open_cb) {
                this._on_open_cb(this);
            }
        });
    }

    /**
     * @return {Promise<void>}
     */
    closeLock() {

        return new Promise(resolve => {

            this._resetAnimTimeoutId();

            if (false === this.isOpen()) {
                resolve();
                return;
            }

            this._playAudioOpen();

            this._closer_el.classList.remove(this.CSS_OPEN_LOCK);

            this._handleClosable();

            this._anim_timeout_id = window.setTimeout(resolve, this._closer_animation_dur_in_ms);

        }).then(() => {
            this._handleClosable();
        });
    }

    /**
     * @private
     */
    _addSeparator() {
        const separator_el = document.createElement('div');
        separator_el.classList.add('combi-lock__separator');
        this._rollers_el.appendChild(separator_el);
    }

    /**
     * @param {HTMLDivElement} target_el
     * @return {HTMLDivElement}
     * @private
     */
    _generateRoller(target_el) {

        const roller_el = document.createElement('div');
        roller_el.classList.add('combi-lock__roller');
        target_el.appendChild(roller_el);

        const roller_shadow_el = document.createElement('div');
        roller_shadow_el.classList.add('combi-lock__roller-shadow');
        roller_el.appendChild(roller_shadow_el);

        const carousel_el = document.createElement('div');
        carousel_el.classList.add(this.CSS_CAROUSEL);
        roller_el.appendChild(carousel_el);

        for (let i = 0; i < this._number_length; i++) {
            const number_el = document.createElement('div');
            number_el.classList.add('combi-lock__number');
            number_el.innerText = i;
            number_el.style.transform = `rotateX(${this._deg_per_number * i}deg) translateZ(calc(var(--slide-number-height) * 1.5))`;
            carousel_el.appendChild(number_el);
        }

        roller_el._deg = 0;

        return roller_el;
    }

    /**
     * @param {HTMLElement} roller_el
     * @param {HTMLElement} carousel_el
     * @param {number} deg
     * @return {NssPadLock}
     * @private
     */
    _setCarouselDeg(roller_el, carousel_el, deg) {
        roller_el._deg = deg;
        carousel_el.style.setProperty('--deg', `${roller_el._deg}deg`);
        this._determineValue(roller_el);
        return this;
    }


    /**
     * @param {HTMLElement} roller_el
     * @private
     */
    _determineValue(roller_el) {

        const times = Math.round(roller_el._deg / this._deg_per_number);

        let value

        if (times < 0) {
            value = Math.abs(times % this._number_length);
        } else {
            value = this._number_length - (times % this._number_length);
            if (value === this._number_length) {
                value = 0;
            }
        }

        roller_el._value = value;
    };

    /**
     * @param {HTMLElement} roller_el
     * @param {number} value
     * @return {this}
     * @private
     */
    _setCarouselCode(roller_el, value) {

        const deg = 360 - (this._deg_per_number * value);

        const carousel_el = roller_el.querySelector(`.${this.CSS_CAROUSEL}`);

        this._setCarouselDeg(roller_el, carousel_el, deg);

        return this;
    }

    /**
     * @param {string} code
     * @return {this}
     * @private
     */
    _preAssignCode(code) {

        const code_parts = code.split('');

        this._rollers.forEach((roller_el, index) => {
            const code_part = code_parts[index] || '0';
            this._setCarouselCode(roller_el, code_part);
        });

        return this;
    }

    /**
     * @return {this}
     * @private
     */
    _handleCachedCodeIfAvailable() {

        const cached_code = this._getCodeFromCache();

        if (cached_code) {

            this._preAssignCode(cached_code);

            window.setTimeout(() => {
                this._unlock_btn.getEl().click();
            }, this._slide_in_out_anim_dur_in_ms);
        }

        return this;
    }

    /**
     * @private
     */
    _addDragAndScroll() {

        let roller_el;
        let carousel_el;

        /**
         * @param {number} deg
         */
        const setCarouselDeg = (deg) => {
            this._setCarouselDeg(roller_el, carousel_el, deg);
        };

        const preventCarouselTransition = () => {
            carousel_el.style.setProperty('--transition-duration', '0');
        };

        const resetCarouselTransition = () => {
            carousel_el.style.setProperty('--transition-duration', '');
        };

        const snapCarousel = () => {
            const times = Math.round(roller_el._deg / this._deg_per_number);
            roller_el._deg = times * this._deg_per_number;
            setCarouselDeg(roller_el._deg);
        };

        const mouseIsDown = (/**MouseEvent*/e) => {

            if (false === e.target.classList.contains('combi-lock__roller')) {
                return;
            }

            roller_el = e.target;
            carousel_el = roller_el.querySelector(`.${this.CSS_CAROUSEL}`);

            preventCarouselTransition();

            listenMouseMoveOrUpOrLeave();
        };

        const mouseUpOrLeave = (/**MouseEvent*/e) => {

            resetCarouselTransition();

            snapCarousel();

            this._determineValue(roller_el);

            listenMouseDown();
        };

        const mouseMove = (/**MouseEvent*/e) => {

            const old_value = roller_el._value;

            roller_el._deg -= e.movementY;

            setCarouselDeg(roller_el._deg);

            const new_value = roller_el._value;

            if (old_value !== new_value) {
                this._playAudioClick();
            }
        };

        const listenMouseMoveOrUpOrLeave = () => {
            this._el.addEventListener('mouseup', mouseUpOrLeave)
            this._el.addEventListener('mouseleave', mouseUpOrLeave);
            this._el.addEventListener('mousemove', mouseMove);
            this._el.removeEventListener('mousedown', mouseIsDown);
        };

        const listenMouseDown = () => {
            this._el.removeEventListener('mouseup', mouseUpOrLeave)
            this._el.removeEventListener('mouseleave', mouseUpOrLeave);
            this._el.removeEventListener('mousemove', mouseMove);
            this._el.addEventListener('mousedown', mouseIsDown);
        };

        const removeListeners = () => {
            this._el.removeEventListener('mouseup', mouseUpOrLeave)
            this._el.removeEventListener('mouseleave', mouseUpOrLeave);
            this._el.removeEventListener('mousemove', mouseMove);
            this._el.removeEventListener('mousedown', mouseIsDown);
        }

        listenMouseDown();

        return removeListeners;
    }

    /**
     * @return {string}
     */
    getCode() {

        let code = '';

        this._rollers.forEach(roller_el => {
            code = code + '' + (roller_el._value || 0);
        });

        return code;
    }

    /**
     * @param {NssPadLock~onNewCode} callback
     * @return {NssPadLock}
     */
    onNewCode(callback) {
        this._on_new_code_cb = callback;
        return this;
    }

    /**
     * @param {NssPadLock~onOpen} callback
     * @return {NssPadLock}
     */
    onOpen(callback) {
        this._on_open_cb = callback;
        return this;
    }

    /**
     * @private
     */
    _playAudioOpen() {
        this._audio_player.playAudio('combi-lock-open.mp3');
    }

    /**
     * @private
     */
    _playAudioClick() {
        this._audio_player.playAudio('combi-lock-click.mp3', true);
    }

    /**
     * @inheritDoc
     */
    static getComponentName() {
        return "NssPadLock";
    }

    /**
     * @inheritDoc
     */
    static getStyleFilenames() {
        return ['NssPadLock.css'];
    }
}

export {NssPadLock};

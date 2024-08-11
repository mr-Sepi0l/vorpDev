import {NssAudio} from "../NssAudio/NssAudio.js";

class NssButton {

    colors = {
        white: 'nss-btn--white',
        grey: 'nss-btn--grey',
        danger: 'nss-btn--danger',
        gold: 'nss-btn--gold',
        success: 'nss-btn--success',
    };

    glows = {
        green: 'nss-btn--glow-green',
        gold: 'nss-btn--glow-gold',
        danger: 'nss-btn--glow-danger',
    };

    sizes = {
        very_small: 'nss-btn--very-small',
        small: 'nss-btn--small',
        large: 'nss-btn--large',
    };

    constructor() {

        /**
         * @type {NssPadLock~onClickCallback}
         * @private
         */
        this._on_click_cb = null;

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._btn_el = null;

        this._generateDom();
    }

    /**
     * @private
     */
    _generateDom() {

        this._btn_wraper_el = document.createElement('div');
        this._btn_wraper_el.classList.add('nss-btn__wrapper');

        this._btn_el = document.createElement('button');
        this._btn_el.type = 'button';
        this._btn_el.classList.add('nss-btn');

        this._btn_el.addEventListener('click', () => {
            if (this._on_click_cb) {
                this._on_click_cb(this);
            }

            if (false === this.isDisabled()) {
                this._playClickAudio();
            }
        });

        this._btn_el.addEventListener('mouseenter', () => {
            if (false === this.isDisabled()) {
                this._playHoverAudio();
            }
        });

        this._btn_wraper_el.appendChild(this._btn_el);
    }

    /**
     * @param {string} label
     * @return {NssButton}
     */
    setLabel(label) {
        this._btn_el.innerHTML = label;
        return this;
    }

    /**
     * @param {NssPadLock~onClickCallback} cb
     * @return {NssButton}
     */
    onClick(cb) {

        this._on_click_cb = cb;

        return this;
    }

    /**
     * @return {NssButton}
     */
    setIcon() {
        this._btn_el.classList.add('nss-btn--icon');
        return this;
    }

    /**
     * @return {NssButton}
     */
    unsetIcon() {
        this._btn_el.classList.remove('nss-btn--icon');
        return this;
    }

    /**
     * @return {NssButton}
     */
    setBorderless() {
        this._btn_el.classList.add('nss-btn--borderless');
        return this;
    }

    /**
     * @return {NssButton}
     */
    unsetBorderless() {
        this._btn_el.classList.remove('nss-btn--borderless');
        return this;
    }

    /**
     * @return {boolean}
     */
    isDisabled() {
        return (this._btn_el.disabled || false) === true;
    }

    /**
     * @return {NssButton}
     */
    setDisabled() {
        this._btn_el.disabled = true;
        return this;
    }

    /**
     * @return {NssButton}
     */
    setEnabled() {
        this._btn_el.disabled = false;
        return this;
    }

    /**
     * @return {NssButton}
     */
    enableGlowing() {
        this._btn_el.classList.add('nss-btn--glow');
        return this;
    }

    /**
     * @return {NssButton}
     */
    setGlowGold() {
        this._setGlow(this.glows.gold);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setGlowDanger() {
        this._setGlow(this.glows.danger);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setGlowGreen() {
        this._setGlow(this.glows.green);
        return this;
    }

    /**
     * @return {NssButton}
     */
    disableGlowing() {
        this._resetGlows();
        this._btn_el.classList.remove('nss-btn--glow');
        return this;
    }

    /**
     * @return {NssButton}
     */
    setDanger() {
        this._setColor(this.colors.danger);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setGold() {
        this._setColor(this.colors.gold);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setWhite() {
        this._setColor(this.colors.white);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setSuccess() {
        this._setColor(this.colors.success);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setGrey() {
        this._setColor(this.colors.grey);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setSizeNormal() {
        this._resetColors();
        return this;
    }

    /**
     * @return {NssButton}
     */
    setSizeVerySmall() {
        this._setSize(this.sizes.very_small);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setSizeSmall() {
        this._setSize(this.sizes.small);
        return this;
    }

    /**
     * @return {NssButton}
     */
    setSizeLarge() {
        this._setSize(this.sizes.large);
        return this;
    }

    /**
     * @param {HTMLElement} target_el
     * @returns {NssButton}
     */
    appendTo(target_el) {
        const wrapper_el = this.getWrapperEl();
        target_el.appendChild(wrapper_el);
        return this;
    }

    /**
     * @param {string} new_color_class
     * @private
     */
    _setColor(new_color_class) {
        this._resetColors();
        this._btn_el.classList.add(new_color_class);
    }

    /**
     * @private
     */
    _resetColors() {

        for (const [name, css_class] of Object.entries(this.colors)) {
            this._btn_el.classList.remove(css_class);
        }
    }

    /**
     * @param {string} glow_class
     * @private
     */
    _setGlow(glow_class) {
        this._resetGlows();
        this.enableGlowing();
        this._btn_el.classList.add(glow_class);
    }

    /**
     * @private
     */
    _resetGlows() {

        for (const [name, css_class] of Object.entries(this.glows)) {
            this._btn_el.classList.remove(css_class);
        }
    }

    /**
     * @param {string} size_class
     * @private
     */
    _setSize(size_class) {
        this._resetSizes();
        this._btn_el.classList.add(size_class);
    }

    /**
     * @private
     */
    _resetSizes() {

        for (const [name, css_class] of Object.entries(this.sizes)) {
            this._btn_el.classList.remove(css_class);
        }
    }

    /**
     * @return {HTMLButtonElement}
     */
    getEl() {
        return this._btn_el;
    }

    /**
     * @return {HTMLDivElement}
     */
    getWrapperEl() {
        return this._btn_wraper_el;
    }

    /**
     * @return {NssButton}
     * @private
     */
    _playHoverAudio() {
        NssAudio.playSfxUpDown();
        return this;
    }

    /**
     * @return {NssButton}
     * @private
     */
    _playClickAudio() {
        NssAudio.playSfxNext();
        return this;
    }
}

export {NssButton};
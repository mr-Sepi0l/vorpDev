class NssTip {

    static POSITIONS = {
        TOP_LEFT: 'nss-tip--tl',
        TOP_CENTER: 'nss-tip--tc',
        TOP_RIGHT: 'nss-tip--tr',
        CENTER_LEFT: 'nss-tip--cl',
        CENTER_CENTER: 'nss-tip--cc',
        CENTER_RIGHT: 'nss-tip--cr',
        BOTTOM_LEFT: 'nss-tip--bl',
        BOTTOM_CENTER: 'nss-tip--bc',
        BOTTOM_RIGHT: 'nss-tip--br',
    }

    static ANIM_IN_OUT_DURATION_IN_MS = 500;

    /**
     * @param {string} message
     */
    constructor(message) {

        /**
         * @type {string}
         * @private
         */
        this._message = message;

        /**
         * @type {number}
         * @private
         */
        this._duration_in_ms = 4000;

        /**
         * @type {string}
         * @private
         */
        this._position = NssTip.POSITIONS.BOTTOM_CENTER;
    }

    /**
     * @param {number} new_duration_in_ms
     * @return {NssTip}
     */
    setDuration(new_duration_in_ms) {
        this._duration_in_ms = new_duration_in_ms;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setTopLeft() {
        this._position = NssTip.POSITIONS.TOP_LEFT;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setTopCenter() {
        this._position = NssTip.POSITIONS.TOP_CENTER;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setTopRight() {
        this._position = NssTip.POSITIONS.TOP_RIGHT;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setCenterLeft() {
        this._position = NssTip.POSITIONS.CENTER_LEFT;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setCenterCenter() {
        this._position = NssTip.POSITIONS.CENTER_CENTER;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setCenterRight() {
        this._position = NssTip.POSITIONS.CENTER_RIGHT;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setBottomLeft() {
        this._position = NssTip.POSITIONS.BOTTOM_LEFT;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setBottomCenter() {
        this._position = NssTip.POSITIONS.BOTTOM_CENTER;
        return this;
    }

    /**
     * @return {NssTip}
     */
    setBottomRight() {
        this._position = NssTip.POSITIONS.BOTTOM_RIGHT;
        return this;
    }

    /**
     * @return {Promise}
     */
    show() {

        return new Promise((resolve) => {

            const el = document.createElement('div');
            el.classList.add('nss-tip');
            el.classList.add(this._position);
            el.innerHTML = this._message;
            document.body.appendChild(el);

            window.setTimeout(() => {

                el.classList.add('nss-tip--out');

                window.setTimeout(() => {
                    el.remove();
                    resolve();
                }, NssTip.ANIM_IN_OUT_DURATION_IN_MS);

            }, (this._duration_in_ms + NssTip.ANIM_IN_OUT_DURATION_IN_MS));
        });
    }
}

export {NssTip}
import {NssUiComponentInterface} from "../NssUiComponentInterface.js";

/**
 * @implements {NssUiComponentInterface}
 */
class NssAudio extends NssUiComponentInterface {

    /**
     * @type {NssAudio}
     * @private
     */
    static _internal_player = null;

    /**
     * @type {string}
     * @private
     */
    static _internal_sfx_filepath = 'nui://nss_libs/ui/NssAudio/sfx/';

    /**
     * @type {number}
     * @private
     */
    static _master_volume_in_percent = 1;

    /**
     * @param {string} audio_path
     * @param {number} [volume=0.5]
     */
    constructor(audio_path, volume = 0.5) {

        super();

        /**
         * @type {string}
         * @private
         */
        this._audio_path = audio_path;

        /**
         * @type {number}
         * @private
         */
        this._volume = volume;

        /**
         * @type {HTMLAudioElement}
         * @private
         */
        this._audio = null;

        /**
         * @type {number|null}
         * @private
         */
        this._playback_rate_max = null;

        /**
         * @type {number|null}
         * @private
         */
        this._playback_rate_min = null;
    }

    /**
     * @param {number} [volume]
     * @return {Promise<void>}
     */
    static playSfxBack(volume) {
        return NssAudio._playSfx('rdr2_sfx_back.mp3', volume, true);
    }

    /**
     * @param {number} [volume=0.5]
     * @return {Promise<void>}
     */
    static playSfxNext(volume) {

        if (typeof volume !== 'number') {
            volume = 0.5;
        }

        return NssAudio._playSfx('rdr2_sfx_next.mp3', volume, true);
    }

    /**
     * @param {number} [volume=0.25]
     * @return {Promise<void>}
     */
    static playSfxUpDown(volume) {

        if (typeof volume !== 'number') {
            volume = 0.25;
        }

        return NssAudio._playSfx('rdr2_sfx_up-down.mp3', volume, true);
    }

    /**
     * @param {number} [volume]
     * @return {Promise<void>}
     */
    static playSfxShowMenu(volume) {
        return NssAudio._playSfx('rdr2_sfx_show_menu.mp3', volume, true);
    }

    /**
     * @param {number} [volume]
     * @return {Promise<void>}
     */
    static playSfxIndexOpen(volume) {
        return NssAudio._playSfx('rdr2_sfx_index_open.mp3', volume, true);
    }

    /**
     * @param {number} [volume]
     * @return {Promise<void>}
     */
    static playSfxIndexClose(volume) {
        return NssAudio._playSfx('rdr2_sfx_index_close.mp3', volume, true);
    }

    /**
     * @param {number} [volume]
     * @return {Promise<void>}
     */
    static playSfxHideMenu1(volume) {
        return NssAudio._playSfx('rdr2_sfx_hide_menu_01.mp3', volume, true);
    }

    /**
     * @param {number} [volume]
     * @return {Promise<void>}
     */
    static playSfxHideMenu2(volume) {
        return NssAudio._playSfx('rdr2_sfx_hide_menu_02.mp3', volume, true);
    }

    /**
     * @param {number} [volume]
     * @return {Promise<void>}
     */
    static playSfxHideMenu3(volume) {
        return NssAudio._playSfx('rdr2_sfx_hide_menu_03.mp3', volume, true);
    }

    /**
     * @param {string} filename
     * @param {number} [volume=0.5]
     * @param {boolean} [standalone=false]
     * @return {Promise<void>}
     * @private
     */
    static _playSfx(filename, volume = 0.5, standalone = false) {

        if (NssAudio._internal_player === null) {
            NssAudio._internal_player = new NssAudio(NssAudio._internal_sfx_filepath);
        }

        const mastered_volume = volume * NssAudio._master_volume_in_percent;
        NssAudio._internal_player.setVolume(mastered_volume);
        return NssAudio._internal_player.playAudio(filename, standalone);
    }

    /**
     * @param {number} volume
     * @return {number}
     * @private
     */
    static _calculateMasteredVolume(volume) {
        return volume * NssAudio._master_volume_in_percent;
    }

    /**
     * @param {string} audio_path
     * @return {NssAudio}
     */
    setAudioPath(audio_path) {
        this._audio_path = audio_path;
        return this;
    }

    /**
     * @param {number} volume
     * @return {NssAudio}
     */
    setVolume(volume) {

        if (this._volume !== volume) {

            this._volume = volume;

            if (this._audio !== null) {
                this._audio.volume = NssAudio._calculateMasteredVolume(volume);
            }
        }

        return this;
    }

    /**
     * @param {string} filename
     * @return {Promise<string>}
     */
    loopAudio(filename) {
        return this.playAudio(filename, false, true);
    }

    /**
     * @param {number} min
     * @param {number} max
     * @return {this}
     */
    setRandomPlaybackRate(min, max) {
        this._playback_rate_min = min;
        this._playback_rate_max = max;
        return this;
    }

    /**
     * @param {number} rate
     * @return {this}
     */
    setPlaybackRate(rate) {
        return this.setRandomPlaybackRate(rate, rate);
    }

    /**
     * @return {boolean}
     */
    hasPlaybackRate() {
        return typeof this._playback_rate_min === 'number' && typeof this._playback_rate_max === 'number';
    }

    /**
     * @return {number}
     */
    calculateRandomPlaybackRate() {
        return (Math.random() * (this._playback_rate_max - this._playback_rate_min)) + this._playback_rate_min;
    }

    /**
     * @param {string} filename
     * @param {boolean} [prevent_reset=false]
     * @param {boolean} [loop=false]
     * @return {Promise<string>}
     */
    playAudio(filename, prevent_reset, loop) {

        prevent_reset = prevent_reset || false;
        loop = loop || false;

        if (false === prevent_reset) {
            this.resetAudio();
        }

        this._audio = new Audio(`${this._audio_path}${filename}`);
        this._audio.volume = NssAudio._calculateMasteredVolume(this._volume);
        this._audio.loop = loop;

        if (this.hasPlaybackRate()) {
            this._audio.preservesPitch = false;
            this._audio.webkitPreservesPitch = false;
            this._audio.mozPreservesPitch = false;
            this._audio.playbackRate = this.calculateRandomPlaybackRate();
        }

        const ended_promise = new Promise((resolve) => {

            const on_ended = () => {
                this._audio.removeEventListener('ended', on_ended);
                resolve(filename);
            }

            this._audio.addEventListener('ended', on_ended);

            this._audio._fire_ended = on_ended;

            return this._audio.play().catch((/**DOMException*/error) => {

                const error_name = error.name || '';

                // Sometimes if to many sounds are played real quickly or at the same time, the browser will throw an
                // error that something was aborted.
                if (error_name !== 'AbortError') {
                    console.error(error, error.name, this._audio);
                }

                on_ended();
            });
        });

        return ended_promise;
    }

    /**
     * @return {boolean}
     */
    isPlaying() {
        return this._audio !== null && false === this._audio.paused;
    }

    /**
     * @protected
     */
    resetAudio() {
        if (this._audio) {
            this._audio.pause();
            this._audio.remove();
            delete this._audio;
        }
    }

    /**
     * @param {boolean} [force_ended_event=false]
     */
    stop(force_ended_event) {

        if (this._audio) {

            if (false === this._audio.paused) {
                this._audio.pause();
                force_ended_event = true;
            }

            if (force_ended_event) {
                this._audio._fire_ended();
            }

            this._audio.currentTime = 0;
        }
    }

    /**
     * @return {number|boolean}
     */
    getDuration() {
        return this._audio.duration || false;
    }

    /**
     * @return {number}
     */
    getCurrentTime() {
        return this._audio.currentTime || 0;
    }

    /**
     * @return {number|boolean}
     */
    getDurationInPercent() {
        const duration = this.getDuration();
        const current_time = this.getCurrentTime();

        if (duration === false) {
            return false;
        }

        const percent = (current_time / duration);

        return percent;
    }

    /**
     * @inheritDoc
     */
    static getComponentName() {
        return "NssAudio";
    }

    /**
     * @inheritDoc
     */
    static getStyleFilenames() {
        return [];
    }

    /**
     * @param {number} volume_in_percent
     */
    static setMasterVolumeInPercent(volume_in_percent) {
        NssAudio._master_volume_in_percent = volume_in_percent;
    }

    static resetMasterVolumeInPercent() {
        NssAudio._master_volume_in_percent = 1;
    }
}

export {NssAudio};
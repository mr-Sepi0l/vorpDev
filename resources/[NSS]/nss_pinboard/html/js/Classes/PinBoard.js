import {PosterPreview} from "./PosterPreview.js";
import {Client} from "./Client.js";
import {NssConfirm} from "../../nss/NssConfirm/NssConfirm.js";
import {NewPosterTextDialog} from "./NewPosterTextDialog.js";
import {Language} from "./Language.js";
import {NssTip} from "../../nss/NssTip/NssTip.js";
import {NewPosterImageDialog} from "./NewPosterImageDialog.js";

class PinBoard {

    static CSS_HIDDEN = 'pb--hidden';
    static CSS_DAY = 'pb--day';

    static KEY_BACKSPACE = 'Backspace';
    static KEY_ESCAPE = 'Escape';

    /**
     * @param {Client|ClientMock|function} [client_class]
     */
    constructor(client_class) {

        client_class = client_class || Client;

        /**
         * @type {Client|ClientMock}
         * @private
         */
        this._client = new client_class(this.show.bind(this), this.hide.bind(this), this);

        /**
         * @type {boolean}
         * @private
         */
        this._locked = false;

        /**
         * @type {PinBoardConfig}
         * @private
         */
        this._config = {};

        /**
         * @type {NssPinboardCharDetails}
         * @private
         */
        this._char_details = {};

        /**
         * @type {null|PosterDetails}
         * @private
         */
        this._open_poster = null;

        this._determineAndSetupElements();

        this._setupCloseEvents();

        this._setupDayModeMonitor();
    }

    /**
     * @private
     */
    _setupDayModeMonitor() {

        window.setTimeout(function () {

            if (false === this.isVisible()) {
                return;
            }

            this._client.getDayMode(function (/**PinBoardMessageResponse*/response) {

                if (response.is_night) {
                    this.setNight();
                } else {
                    this.setDay();
                }

            }.bind(this));

        }.bind(this), 10000);
    }

    /**
     * @private
     */
    _determineAndSetupElements() {

        /**
         * @type {HTMLElement}
         * @private
         */
        this._board_el = document.querySelector('.pb');

        /**
         * @type {HTMLElement}
         * @private
         */
        this._poster_container_el = this._board_el.querySelector('.pb__body-inner');

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._new_btn_el = document.querySelector('.pb__new-btn');
        this._new_btn_el.addEventListener('click', this._onNewBtnClick.bind(this));

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._close_btn_el = document.querySelector('.pb__close-btn');
        this._close_btn_el.addEventListener('click', this._onCloseBtnClick.bind(this));
    }

    _setupCloseEvents() {
        window.addEventListener('keydown', this._onWindowKeyDown.bind(this));
    }

    /**
     * @param {KeyboardEvent} event
     * @private
     */
    _onWindowKeyDown(event) {

        if (this.isLocked()) {
            return;
        }

        if (event.key !== PinBoard.KEY_BACKSPACE && event.key !== PinBoard.KEY_ESCAPE) {
            return;
        }

        if (this._open_poster !== null) {
            this._open_poster.hide();
            return;
        }

        this._client.close();
    }

    /**
     * @return {{image: boolean, text: boolean, all: boolean}}
     * @private
     */
    _getPreventions() {

        let preventions = {
            image: false,
            text: false,
            all: false,
        };

        if (this._char_details.is_admin !== true) {

            if (typeof this._current_pinboard_cfg.prevent_image_posters === 'boolean') {
                preventions.image = this._current_pinboard_cfg.prevent_image_posters;
            } else {
                preventions.image = (this._config.PreventCreateImagePosters || false) === true;
            }

            if (typeof this._current_pinboard_cfg.prevent_text_posters === 'boolean') {
                preventions.text = this._current_pinboard_cfg.prevent_text_posters;
            } else {
                preventions.text = (this._config.PreventCreateTextPosters || false) === true;
            }
        }

        if (preventions.image && preventions.text) {
            preventions.all = true;
        }

        return preventions;
    }

    /**
     * @private
     */
    _onNewBtnClick() {

        const preventions = this._getPreventions();

        if (preventions.all) {

            const not_allowed_message = Language.LHtml('no_poster_allowed')
            const not_allowed_tip = new NssTip(not_allowed_message);

            const duration_in_ms = this._config.NotificationDurationInMs || 4000;

            not_allowed_tip
                .setBottomCenter()
                .setDuration(duration_in_ms)
                .show();

            return;
        }

        this.lock();

        const newTextPoster = () => {
            new NewPosterTextDialog(this, this._client, this._char_details.permissions.post_everywhere_at_once, this._current_pinboard_cfg);
        };

        const newImagePoster = () => {
            new NewPosterImageDialog(this, this._client, this._char_details.permissions.post_everywhere_at_once, this._current_pinboard_cfg);
        }

        if (preventions.image) {
            newTextPoster();
            return;
        }

        if (preventions.text) {
            newImagePoster();
            return;
        }

        const answer = NssConfirm.confirm(
            Language.LHtml('what_you_want_create'),
            Language.LHtml('text'),
            Language.LHtml('image_link')
        );

        answer
            .then(newTextPoster)
            .catch(newImagePoster);
    }

    /**
     * @return {PinBoard}
     */
    lock() {
        this._locked = true;
        return this;
    }

    /**
     * @return {PinBoard}
     */
    unlock() {
        this._locked = false;
        return this;
    }

    /**
     * @return {boolean}
     */
    isLocked() {
        return this._locked === true;
    }

    _onCloseBtnClick() {
        this._client.close();
    }

    _loadPosters() {

        this._poster_container_el.innerHTML = 'Lade...';

        this._client.getPosterList(this._onPosterListLoaded.bind(this));
    }

    /**
     * @return {PinBoard}
     */
    reloadPoster() {
        this._loadPosters();
        return this;
    }

    /**
     * @param {PinBoardMessageResponse} response
     * @private
     */
    _onPosterListLoaded(response) {

        this._poster_container_el.innerHTML = '';

        const poster_list = response.table_for_json || [];

        if (poster_list.length === 0) {
            this._poster_container_el.innerHTML = '<div class="pb__no-entries">' + Language.LHtml('no_entries') + '</div>'
            return;
        }

        const toInt = function (/**string|number*/str) {
            return parseInt(str, 10);
        };

        const player_id = toInt(response.charidentifier);

        poster_list.forEach(function (/**PinBoardPosterItem*/poster_item) {

            const poster_owner_id = toInt(poster_item.creator_vorp_char_id);

            const removable = response.remove_allowed || poster_owner_id === player_id;

            const poster = new PosterPreview(
                poster_item.id,
                poster_item.type,
                poster_item.content,
                removable,
                this._client,
                this
            );

            const poster_el = poster.getEl();

            this._poster_container_el.appendChild(poster_el);

        }.bind(this));
    }

    /**
     * @return {boolean}
     */
    isVisible() {
        return this._board_el.classList.contains(PinBoard.CSS_HIDDEN) === false;
    }

    /**
     * @param {PinBoardLanguage} language
     * @param {PinBoardConfig} config
     * @param {boolean} [is_night]
     * @param {NssPinboardCharDetails} [char_details]
     * @param {PinBoardBoard} [pinboard_cfg]
     * @return {PinBoard}
     */
    show(language, config, is_night, char_details, pinboard_cfg) {

        is_night = is_night || false;

        if (is_night) {
            this.setNight();
        } else {
            this.setDay();
        }

        // noinspection JSValidateTypes
        char_details = char_details || {}

        let perms = char_details.permissions || {post_everywhere_at_once: false};
        perms.post_everywhere_at_once = perms.post_everywhere_at_once || false;

        this._char_details = {
            job: char_details.job || '',
            job_grade: char_details.job_grade || 0,
            group: char_details.group || '',
            is_admin: (char_details.is_admin || false) === true,
            char_id: char_details.char_id || 0,
            char_name: char_details.char_name || 'Unknown Player',
            permissions: perms,
        };

        /**
         * @type {PinBoardConfig}
         * @private
         */
        this._config = config;

        /**
         * @type {PinBoardBoard}
         * @private
         */
        this._current_pinboard_cfg = pinboard_cfg || {};

        Language.setupLanguage(language);

        this._updateLanguage();

        if (this._current_pinboard_cfg.alternative_style) {
            this._board_el.classList.add('pb--v2');
        } else {
            this._board_el.classList.remove('pb--v2');
        }

        this._board_el.classList.remove(PinBoard.CSS_HIDDEN);

        this._handleCreateButton();

        this._loadPosters();

        return this;
    }

    /**
     * @returns {string[]}
     */
    getBlockedUrls() {
        return this._config.ImageServerBlacklist || [];
    }

    /**
     * @private
     */
    _handleCreateButton() {

        if (this._canUseCreateButton()) {
            this._new_btn_el.removeAttribute('disabled');
        } else {
            this._new_btn_el.setAttribute('disabled', 'disabled');
        }
    }

    /**
     * @return {boolean}
     * @private
     */
    _canUseCreateButton() {

        const preventions = this._getPreventions();

        if (preventions.all) {
            return false;
        }

        const restrictions = this._current_pinboard_cfg.restrict_create_by_jobs || null;

        if (restrictions === null) {
            return true;
        }

        const job = (this._char_details.job || '').trim();

        if (job === '') {
            return false;
        }

        if (false === restrictions.hasOwnProperty(job)) {
            return false;
        }

        const required_job_grade = (restrictions[job] || 0) * 1;
        const current_job_grade = (this._char_details.job_grade || 0) * 1;

        if (current_job_grade >= required_job_grade) {
            return true;
        }

        return false;
    }

    /**
     * @private
     */
    _updateLanguage() {
        this._new_btn_el.innerHTML = Language.LHtml('new_notice');
        this._close_btn_el.innerHTML = Language.LHtml('leave_bulletin_board');
    }

    /**
     * @return {PinBoard}
     */
    hide() {

        this._board_el.classList.add(PinBoard.CSS_HIDDEN);

        return this;
    }

    /**
     * @return {PinBoard}
     */
    setDay() {
        this._board_el.classList.add(PinBoard.CSS_DAY);
        return this;
    }

    /**
     * @return {PinBoard}
     */
    setNight() {
        this._board_el.classList.remove(PinBoard.CSS_DAY);
        return this;
    }

    /**
     * @param {PosterDetails} poster
     * @return {PinBoard}
     */
    setOpenPoster(poster) {
        this._open_poster = poster;
        return this;
    }

    /**
     * @return {PinBoard}
     */
    resetOpenPoster() {
        this._open_poster = null;
        return this;
    }

    /**
     * @param {string} message
     * @return {Promise}
     */
    showNotice(message) {

        const use_custom_tips = this._config.UseCustomTips || false;

        if (use_custom_tips === false) {

            return new Promise((resolve) => {
                resolve();
            });
        }

        const tip = new NssTip(message);

        const duration_in_ms = this._config.NotificationDurationInMs || 4000;

        return tip
            .setBottomCenter()
            .setDuration(duration_in_ms)
            .show();
    }
}

export {PinBoard};
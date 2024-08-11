import {QuestDialog} from "./QuestDialog.js";
import {QuestLog} from "./QuestLog.js";

class Quest {

    /**
     * @param {NssClient} client
     * @param {NssConfirm|Class} confirm
     * @param {NssLoadingIndicator|Class} loading_indicator_class
     * @param {NssAudio} audio_player
     * @param {NssButtons} button_factory
     * @param {NssModal} modal
     * @param {NssHelper} helper
     */
    constructor(client, confirm, loading_indicator_class, audio_player, button_factory, modal, helper) {

        /**
         * @type {NssHelper}
         * @private
         */
        this._helper = helper;

        /**
         * @type {NssClient}
         * @private
         */
        this._client = client;

        /**
         * @type {NssAudio}
         * @private
         */
        this._audio_player = audio_player;

        /**
         * @type {NssButtons}
         * @private
         */
        this._button_factory = button_factory;

        /**
         * @type {NssConfirm}
         * @private
         */
        this._confirm = confirm;

        /**
         * @type {NssModal}
         * @private
         */
        this._modal = modal;

        /**
         * @type {NssLoadingIndicator|Class}
         * @private
         */
        this._loading_indicator_class = loading_indicator_class;

        /**
         * @type {QuestConfig}
         * @private
         */
        this._config = {};

        /**
         * @type {QuestLanguage}
         * @private
         */
        this._language = {};

        /**
         * @type {boolean}
         * @private
         */
        this._is_showing = false;

        this._client.on('show_quest_log', this.onShowQuestLog.bind(this));

        this._client.on('show', this.onShow.bind(this));

        this._client.on('hide', this.onHide.bind(this));

        this._client.on('error', this.onError.bind(this));
    }

    /**
     * @param {QuestMessageResponse} data
     */
    onError(data) {

        this._dialog.disable();

        this._confirm.alert(data.msg, this._language.ok, true).then(() => {
            window.setTimeout(() => {
                this.hide();
            }, 250);
        });
    }

    /**
     * @param {QuestMessageResponse} data
     */
    _determineConfigIfSet(data) {

        if (data.config) {
            this._config = data.config;
            this._language = data.config.Language;
            this._config.MoneyIconUrl = data.money_image_url;
            this._config.GoldIconUrl = data.gold_image_url;
        }
    }

    /**
     * @param {QuestMessageResponse} data
     */
    onShowQuestLog(data) {

        this._determineConfigIfSet(data);

        new QuestLog(
            this,
            data.open_quests,
            this._modal,
            this._client,
            this._helper,
            this._button_factory,
            this._language
        );
    }

    /**
     * @param {QuestMessageResponse} data
     */
    onShow(data) {

        this._is_showing = true

        this._determineConfigIfSet(data);

        const quest = data.quest;
        const step = data.step;
        const is_first_step = data.is_first_step;
        const is_last_step = data.is_last_step;

        this.showQuestText(quest, step, is_first_step, is_last_step);
    }

    /**
     * @param {QuestMessageResponse} response
     */
    onHide(response) {
        this.hideQuestText();
    }

    /**
     * @param {QuestItem} quest
     * @param {QuestStepItem} step
     * @param {boolean} [is_first_step=false]
     * @param {boolean} [is_last_step=false]
     * @param {boolean} [only_preview=false]
     */
    showQuestText(quest, step, is_first_step, is_last_step, only_preview) {

        /**
         * @type {QuestDialog}
         * @private
         */
        this._dialog = new QuestDialog(
            quest,
            step,
            this._language,
            this._config,
            this._loading_indicator_class,
            this._audio_player,
            this._button_factory
        );

        if (only_preview) {
            this._dialog.setOnlyPreview();
        }

        if (is_first_step) {
            this._dialog.setFirstStep();
        }

        if (is_last_step) {
            this._dialog.setLastStep();
        }

        this._dialog.onAccept(() => {
            this.clientAcceptQuest(quest.id, step.id);
        });

        this._dialog.onDecline(() => {
            this.hideQuestText();
        });

        this._dialog.show()
    }

    /**
     * @param {string} quest_id
     * @param {string} step_id
     * @return {Quest}
     */
    clientAcceptQuest(quest_id, step_id) {

        const request_data = {
            quest_id: quest_id,
            step_id: step_id
        }

        this._client.post('accept', request_data);

        return this;
    }

    hideQuestText() {

        if (this._dialog instanceof QuestDialog) {
            this._dialog.hide().then(() => {
                this._dialog.destroy();
                delete this._dialog;
                this.hide();
            });

            return;
        }

        this.hide();
    }

    hide() {

        if (false === this._is_showing) {
            return;
        }

        this._is_showing = false

        this._client.close();
    }

}

export {Quest};
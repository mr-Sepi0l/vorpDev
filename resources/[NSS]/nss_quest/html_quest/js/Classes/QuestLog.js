class QuestLog {

    /**
     * @param {Quest} quest_instance
     * @param {OpenQuests} open_quests
     * @param {NssModal} modal
     * @param {NssClient} client
     * @param {NssHelper} helper
     * @param {NssButtons} button_factory
     * @param {QuestLanguage} language
     * @constructor
     */
    constructor(quest_instance, open_quests, modal, client, helper,button_factory, language) {

        /**
         * @type {QuestLanguage}
         * @private
         */
        this._language = language;

        /**
         * @type {NssButtons}
         * @private
         */
        this._button_factory = button_factory;

        /**
         * @type {Quest}
         * @private
         */
        this._quest_instance = quest_instance;

        /**
         * @type {NssHelper}
         * @private
         */
        this._helper = helper;

        /**
         * @type {OpenQuests}
         * @private
         */
        this._open_quests = open_quests;

        /**
         * @type {NssModal}
         * @private
         */
        this._modal = modal;

        /**
         * @type {NssClient}
         * @private
         */
        this._client = client;

        /**
         * @type {NssModal|null}
         * @private
         */
        this._modal_instance = null;

        this.show();
    }

    /**
     * @return {this}
     */
    show() {

        const quest_total = this._open_quests.length || 0;

        /**
         * @type {HTMLDivElement}
         */
        const content_el = document.createElement("div");

        /**
         * @type {HTMLDivElement}
         */
        const bg_el = document.createElement("div");
        bg_el.setAttribute('data-nss-libs-svg-replacer-image-mask', './img/dialog_bg_optimized.svg');
        bg_el.classList.add("quest-log");

        /**
         * @type {HTMLDivElement}
         */
        const headline_el = document.createElement("div");
        headline_el.classList.add("quest-log__headline");
        headline_el.setAttribute('data-nss-libs-svg-replacer-image-mask', './img/tooltip_bg_optimized.svg');
        headline_el.innerHTML = `${this._language.quest_log} (${quest_total})`;
        bg_el.appendChild(headline_el);

        /**
         * @type {HTMLDivElement}
         */
        const quest_list_el = document.createElement("div");
        quest_list_el.classList.add("quest-log__quest-list");
        quest_list_el.setAttribute('data-nss-libs-svg-replacer-image-mask', './img/tooltip_bg_optimized.svg');
        bg_el.appendChild(quest_list_el);

        const backgrounds = [
            'tooltip_bg_optimized.svg',
            'tooltip_bg_optimized_flipped.svg',
            'tooltip_bg_optimized_flipped_2.svg',
        ];

        const NOT_FIRST = false;
        const NOT_LAST = false;
        const ONLY_PREVIEW = true;

        this._open_quests.forEach((open_item) => {

            let img_src = './img/' + this._helper.getRandomArrayElement(backgrounds);

            /**
             * @type {HTMLDivElement}
             */
            const quest_el = document.createElement("div");
            quest_el.setAttribute('data-nss-libs-svg-replacer-image-mask', img_src);
            quest_el.classList.add("quest-log__quest");

            let content_html = `
                <div class="quest-log__quest-name">${open_item.quest.name}</div>
                <div class="quest-log__quest-step-name">${open_item.step.name}</div>
            `;

            if (open_item.quest.is_blocked === true) {
                quest_el.classList.add("quest-log__quest--blocked");
                content_html += `<div class="quest-log__quest-blocked">${this._language.blocked}</div>`;
            }

            quest_el.innerHTML = content_html;

            if (!open_item.quest.is_blocked) {

                quest_el.addEventListener('click', () => {

                    this._quest_instance.showQuestText(
                        open_item.quest,
                        open_item.step,
                        NOT_FIRST,
                        NOT_LAST,
                        ONLY_PREVIEW
                    )
                });
            }

            quest_list_el.appendChild(quest_el);
        });

        /**
         * @type {HTMLDivElement}
         */
        const footer_el = document.createElement("div");
        footer_el.classList.add("quest-log__footer");
        bg_el.appendChild(footer_el);

        /**
         * @type {NssButton}
         * @private
         */
        this._close_btn = this._button_factory.create(this._language.close);
        this._close_btn.setGlowDanger();
        this._close_btn.setDanger();
        this._close_btn.onClick(this.hide.bind(this));
        footer_el.appendChild(this._close_btn.getWrapperEl());

        content_el.appendChild(bg_el);

        this._modal_instance = new this._modal();

        this._modal_instance
            .closeOnModal()
            .closeOnEscape()
            .closeOnBackspace()
            .setContent(content_el)
            .onClose(() => {
                this._modal_instance = null;
                this.hide();
            })
            .show();

        return this;
    }

    /**
     * @return {this}
     */
    hide() {

        if (this._modal_instance !== null) {
            this._modal_instance.hide();
            this._modal_instance = null;
        }

        const request_data = {}

        this._client.post('hide_quest_log', request_data);

        return this;
    }
}

export {QuestLog};
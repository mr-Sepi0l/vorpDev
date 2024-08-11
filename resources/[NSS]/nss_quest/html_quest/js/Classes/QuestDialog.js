class QuestDialog {

    /**
     * @type {number}
     */
    ANIM_DUR_IN_MS = 500;

    /**
     * @param {QuestItem} quest
     * @param {QuestStepItem} step
     * @param {QuestLanguage} language
     * @param {QuestConfig} config
     * @param {NssLoadingIndicator|Class} loading_indicator_class
     * @param {NssAudio} audio_player
     * @param {NssButtons} button_factory
     */
    constructor(quest, step, language, config, loading_indicator_class, audio_player, button_factory) {

        /**
         * @type {NssLoadingIndicator|Class}
         * @private
         */
        this._loading_indicator_class = loading_indicator_class;

        /**
         * @type {NssButtons}
         * @private
         */
        this._button_factory = button_factory;

        /**
         * @type {NssAudio}
         * @private
         */
        this._audio_player = audio_player;

        /**
         * @type {QuestItem}
         * @private
         */
        this._quest = quest;

        /**
         * @type {QuestConfig}
         * @private
         */
        this._config = config;

        /**
         * @type {QuestStepItem}
         * @private
         */
        this._step = step;

        /**
         * @type {QuestLanguage}
         * @private
         */
        this._language = language;

        /**
         * @type {function|null}
         * @private
         */
        this._accept_cb = null;

        /**
         * @type {function|null}
         * @private
         */
        this._decline_cb = null;

        /**
         * @type {boolean}
         * @private
         */
        this._is_first_step = false;

        /**
         * @type {boolean}
         * @private
         */
        this._is_last_step = false;

        /**
         * @type {boolean}
         * @private
         */
        this._is_only_preview = false;
    }

    /**
     * @return {QuestDialog}
     */
    setFirstStep() {
        this._is_first_step = true;
        return this;
    }

    /**
     * @return {QuestDialog}
     */
    setOnlyPreview() {
        this._is_only_preview = true;
        return this;
    }

    /**
     * @return {QuestDialog}
     */
    setLastStep() {
        this._is_last_step = true;
        return this;
    }

    /**
     * @return {string}
     * @private
     */
    _getAcceptBtnText() {

        if (this._is_last_step) {
            return this._language.complete;
        }

        if (this._is_first_step) {
            return this._language.start;
        }

        return this._language.continue;
    }

    /**
     * @return {Promise<void>}
     * @private
     */
    _statusLoading() {
        return this._loading_indicator.show();
    }

    /**
     * @return {Promise<void>}
     * @private
     */
    _statusNotLoading() {
        return this._loading_indicator.hide();
    }

    /**
     * @private
     */
    _createDom() {

        /**
         * @type {HTMLTemplateElement}
         */
        const template = document.querySelector('.quest-dialog__template');

        // noinspection JSValidateTypes
        /**
         * @type {HTMLElement}
         * @protected
         */
        this._el = template.content.querySelector('.quest-dialog').cloneNode(true);

        /**
         * @type {HTMLElement}
         * @private
         */
        this._back_el = this._el.querySelector('.quest-dialog__back');

        /**
         * @type {HTMLElement}
         * @private
         */
        this._dialog_el = this._el.querySelector('.quest-dialog__dialog');

        if (this._step.background_filename) {
            this._dialog_el.style.setProperty('--background-img', "url('../img/" + this._step.background_filename + "')");
        }

        if (typeof this._step.padding_left === 'number') {
            this._dialog_el.style.setProperty('--padding-left', `calc(var(--1rpx) * ${this._step.padding_left})`);
        }

        if (typeof this._step.padding_right === 'number') {
            this._dialog_el.style.setProperty('--padding-right', `calc(var(--1rpx) * ${this._step.padding_right})`);
        }

        if (typeof this._step.padding_top === 'number') {
            this._dialog_el.style.setProperty('--padding-top', `calc(var(--1rpx) * ${this._step.padding_top})`);
        }

        if (typeof this._step.padding_bottom === 'number') {
            this._dialog_el.style.setProperty('--padding-bottom', `calc(var(--1rpx) * ${this._step.padding_bottom})`);
        }

        if (this._step.text_color) {
            this._dialog_el.style.setProperty('--text-color', this._step.text_color);
        }

        if (this._step.title_color) {
            this._dialog_el.style.setProperty('--title-color', this._step.title_color);
        }

        if (this._step.shadow_color) {
            this._dialog_el.style.setProperty('--shadow-color', this._step.shadow_color);
        }

        /**
         * @type {HTMLElement}
         * @private
         */
        this._header_el = this._el.querySelector('.quest-dialog__dialog-header');

        /**
         * @type {HTMLElement}
         * @private
         */
        this._body_el = this._el.querySelector('.quest-dialog__dialog-content');

        // noinspection JSUnusedGlobalSymbols
        /**
         * @type {HTMLElement}
         * @private
         */
        this._footer_el = this._el.querySelector('.quest-dialog__dialog-footer');

        /**
         * @type {HTMLElement}
         * @private
         */
        this._text_el = this._el.querySelector('.quest-dialog__dialog-content-inner');

        const required_table = this._getRequiredTable();
        const rewards_table = this._getRewardsTable();
        const quest_text = this._step.quest_text.replace(/\n/g, '<br />');
        const quest_text_table = `
            <div class="quest-dialog__dialog-content-quest-headline">${this._step.name}</div>
            <div class="quest-dialog__dialog-content-quest-text">${quest_text}</div>
        `;

        this._text_el.innerHTML = quest_text_table
            + required_table
            + rewards_table;

        /**
         * @type {HTMLElement}
         * @private
         */
        this._title_el = this._el.querySelector('.quest-dialog__dialog-title');
        this._title_el.innerHTML = this._quest.name;


        if (this._is_only_preview) {

            /**
             * @type {NssButton}
             * @private
             */
            this._preview_close_btn = this._button_factory.create(this._language.close);

            this._preview_close_btn
                .setDanger()
                .setGlowDanger()
                .onClick(this._onClickPreviewClose.bind(this));

            this._el.querySelector('.quest-dialog__button-container--cancel').appendChild(this._preview_close_btn.getWrapperEl());

            this._el.querySelector('.quest-dialog__button-container--ok').remove();

            this._el.classList.add('quest-dialog--preview');

        } else {
            /**
             * @type {NssButton}
             * @private
             */
            this._accept_btn = this._button_factory.create(this._getAcceptBtnText());

            if (this._is_last_step) {
                this._accept_btn.setGold();
                this._accept_btn.setGlowGold();
            } else {
                this._accept_btn.setGlowGreen();
            }

            this._accept_btn.onClick(this._onClickAccept.bind(this));

            this._el.querySelector('.quest-dialog__button-container--ok').appendChild(this._accept_btn.getWrapperEl());

            /**
             * @type {NssButton}
             * @private
             */
            this._decline_btn = this._button_factory.create(this._language.later);
            this._decline_btn.setDanger();
            this._decline_btn.setGlowDanger();
            this._decline_btn.onClick(this._onClickDecline.bind(this));

            this._el.querySelector('.quest-dialog__button-container--cancel').appendChild(this._decline_btn.getWrapperEl());
        }

        document.body.appendChild(this._el);

        this._addShadowScrollEffect();

        this._addWindowResizeHandler();

        /**
         * @type {NssLoadingIndicator}
         * @private
         */
        this._loading_indicator = new this._loading_indicator_class(this._dialog_el);

    }

    /**
     * @private
     */
    _addWindowResizeHandler() {

        const on_window_resize = () => {

            const max_height = getComputedStyle(this._dialog_el).getPropertyValue('--max-height');

            const dialog_rect = this._dialog_el.getBoundingClientRect();
            const header_rect = this._header_el.getBoundingClientRect();
            const footer_rect = this._header_el.getBoundingClientRect();

            const outer_height = (header_rect.top - dialog_rect.top) + header_rect.height + footer_rect.height;

            // this._body_el.style.maxHeight = `calc(${max_height} - ${outer_height}px)`;
            this._text_el.style.maxHeight = `calc(${max_height} - ${outer_height}px)`;
        };

        window.setTimeout(on_window_resize, 100);

        window.addEventListener('resize', on_window_resize);
    }

    /**
     * @private
     */
    _addShadowScrollEffect() {

        const shadow_top = document.createElement('div');
        shadow_top.classList.add('quest-dialog__dialog-content-inner-shadow');
        shadow_top.classList.add('quest-dialog__dialog-content-inner-shadow--top');

        // noinspection JSCheckFunctionSignatures
        this._body_el.appendChild(shadow_top);

        const shadow_bottom = document.createElement('div');
        shadow_bottom.classList.add('quest-dialog__dialog-content-inner-shadow');
        shadow_bottom.classList.add('quest-dialog__dialog-content-inner-shadow--bottom');

        // noinspection JSCheckFunctionSignatures
        this._body_el.appendChild(shadow_bottom);

        const on_scroll = () => {

            const text_scroll_height = this._text_el.scrollHeight;
            const content_scroll_height = text_scroll_height - this._body_el.offsetHeight;
            const text_height = this._text_el.getBoundingClientRect().height;

            let top_opacity = 1;
            let bottom_opacity = 1;

            let current_scroll = this._text_el.scrollTop / content_scroll_height;

            if (current_scroll < 0) {
                current_scroll = 0;
            }

            if (current_scroll > 1) {
                current_scroll = 1;
            }

            if (text_scroll_height <= text_height || current_scroll === 0) {
                top_opacity = 0;
            }

            if (text_scroll_height <= text_height || current_scroll === 1) {
                bottom_opacity = 0;
            }

            // noinspection JSValidateTypes
            shadow_top.style.opacity = top_opacity;

            // noinspection JSValidateTypes
            shadow_bottom.style.opacity = bottom_opacity;
        };

        this._text_el.addEventListener('scroll', on_scroll);

        window.setTimeout(on_scroll, 100);
    }

    /**
     * @private
     * @param {QuestRequiredItem|QuestRewardItem} item
     * @return {string}
     */
    _addTableItem(item) {

        let label = item.label;

        if (label.length > 30) {
            label = label.substring(0, 27) + '...';
        }

        return `
            <div class="quest-dialog__dialog-item-list-item  quest-dialog__dialog-item-list-item--item">
                <img src="${item.image}" class="quest-dialog__dialog-item-list-item-img" alt="" />
                <div class="quest-dialog__dialog-item-list-item-label">
                    <div class="quest-dialog__dialog-item-list-item-label-inner">
                        ${label}
                    </div>
                </div>
                <div class="quest-dialog__dialog-item-list-item-amount  quest-dialog__dialog-item-list-item-amount--number">
                    <span class="quest-dialog__dialog-item-list-item-amount-times">&times;</span>${item.count}
                </div>
            </div>
        `;
    }

    /**
     * @private
     * @param {QuestRewardWeapon} weapon
     * @return {string}
     */
    _addTableWeapon(weapon) {

        let label = weapon.label;

        if (label.length > 30) {
            label = label.substring(0, 27) + '...';
        }

        return `
            <div class="quest-dialog__dialog-item-list-item  quest-dialog__dialog-item-list-item--weapon">
                <img src="${weapon.image}" class="quest-dialog__dialog-item-list-item-img" alt="" />
                <div class="quest-dialog__dialog-item-list-item-label">
                    <div class="quest-dialog__dialog-item-list-item-label-inner">
                        ${label}
                    </div>
                </div>
                <div class="quest-dialog__dialog-item-list-item-amount  quest-dialog__dialog-item-list-item-amount--number">
                    <span class="quest-dialog__dialog-item-list-item-amount-times">&times;</span>${weapon.amount}
                </div>
            </div>
        `;
    }

    /**
     * @private
     * @param {number} amount
     * @return {string}
     */
    _addTableMoney(amount) {

        return `
            <div class="quest-dialog__dialog-item-list-item  quest-dialog__dialog-item-list-item--money">
                <img src="${this._config.MoneyIconUrl}" class="quest-dialog__dialog-item-list-item-img" alt="" />
                <div class="quest-dialog__dialog-item-list-item-amount  quest-dialog__dialog-item-list-item-amount--money">${amount}&dollar;</div>
            </div>
        `;
    }

    /**
     * @private
     * @param {number} amount
     * @return {string}
     */
    _addTableGold(amount) {

        return `
            <div class="quest-dialog__dialog-item-list-item  quest-dialog__dialog-item-list-item--gold">
                <img src="${this._config.GoldIconUrl}" class="quest-dialog__dialog-item-list-item-img" alt="" />
                <div class="quest-dialog__dialog-item-list-item-amount  quest-dialog__dialog-item-list-item-amount--gold">${amount}</div>
            </div>
        `;
    }

    /**
     * @private
     * @param {string} title
     * @param {string} items_html
     * @param {string} type
     * @return {string}
     */
    _createTable(title, items_html, type) {
        return `
            <div class="quest-dialog__dialog-item-list  quest-dialog__dialog-item-list--${type}">
                <div class="quest-dialog__dialog-item-list-header">
                    ${title}
                </div>
                <div class="quest-dialog__dialog-item-list-body">
                    ${items_html}
                </div>
            </div>
        `;
    }

    /**
     * @return {string}
     * @private
     */
    _getRequiredTable() {

        /**
         * @type {QuestRequirements}
         */
        const requirements = this._step.requires || {}

        /**
         * @type {QuestRequiredItem[]|boolean}
         */
        const required_items = requirements.items || false;

        /**
         * @type {QuestRequiredMoney|boolean}
         */
        const required_money = requirements.money || false;

        /**
         * @type {QuestRequiredGold|boolean}
         */
        const required_gold = requirements.gold || false;

        let items_html = '';

        if (required_items) {
            required_items.forEach(item => {
                items_html += this._addTableItem(item);
            });
        }

        if (required_money) {
            items_html += this._addTableMoney(required_money.amount);
        }

        if (required_gold) {
            items_html += this._addTableGold(required_gold.amount);
        }

        if (items_html !== '') {
            items_html = this._createTable(this._language.requirements, items_html, 'requirements');
        }

        return items_html;
    }

    _getRewardsTable() {

        /**
         * @type {QuestRewards}
         */
        const rewards = this._step.rewards || {}

        /**
         * @type {QuestRewardItem[]|boolean}
         */
        const reward_items = rewards.items || false;

        /**
         * @type {QuestRewardWeapon[]|boolean}
         */
        const reward_weapons = rewards.weapons || false;

        /**
         * @type {QuestRewardMoney|boolean}
         */
        const reward_money = rewards.money || false;

        /**
         * @type {QuestRewardGold|boolean}
         */
        const reward_gold = rewards.gold || false;

        let items_html = '';

        if (reward_items) {
            reward_items.forEach(item => {
                items_html += this._addTableItem(item);
            });
        }

        if (reward_weapons) {
            reward_weapons.forEach(weapon => {
                items_html += this._addTableWeapon(weapon);
            });
        }

        if (reward_money) {
            items_html += this._addTableMoney(reward_money.amount);
        }

        if (reward_gold) {
            items_html += this._addTableGold(reward_gold.amount);
        }

        if (items_html !== '') {
            items_html = this._createTable(this._language.rewards, items_html, 'rewards');
        }

        return items_html;
    }

    /**
     * @private
     */
    _onClickAccept() {

        if (this._is_last_step) {
            this._playAudioQuestCompleted();
        }

        if (this._accept_cb) {
            this._accept_cb();
        }

        this._statusLoading();
    }

    /**
     * @private
     */
    _onClickPreviewClose() {
        this.hide().then(() => {
            this.destroy();
        })
    }

    /**
     * @private
     */
    _playAudioQuestCompleted() {
        this._audio_player.playAudio('quest_completed.mp3');
    }

    /**
     * @private
     */
    _onClickDecline() {
        if (this._decline_cb) {
            this._decline_cb();
        }
    }

    /**
     * @param {function} cb
     * @return {QuestDialog}
     */
    onAccept(cb) {
        this._accept_cb = cb;
        return this;
    }

    /**
     * @param {function} cb
     * @return {QuestDialog}
     */
    onDecline(cb) {
        this._decline_cb = cb;
        return this;
    }

    show() {

        this._setupKeyHandler();

        this._createDom();
    }

    /**
     * @private
     */
    _setupKeyHandler() {
        /**
         * @param {KeyboardEvent} event
         */
        const keyHandler = (event) => {
            if (event.key === 'Escape' || event.key === 'Backspace') {
                removeKeyHandler();
                this._onClickDecline();
            }
        };

        const removeKeyHandler = () => {
            window.removeEventListener('keydown', keyHandler);
        };

        window.addEventListener('keydown', keyHandler);
    }

    /**
     * @return {Promise<void>}
     */
    hide() {

        this._statusNotLoading();

        return new Promise((resolve) => {

            this._back_el.classList.remove('quest__anim-fade-in');
            this._dialog_el.classList.remove('quest__anim-slide-in');

            window.setTimeout(() => {

                this._back_el.classList.add('quest__anim-fade-out');
                this._dialog_el.classList.add('quest__anim-slide-out');

                window.setTimeout(() => {
                    this._el.remove();
                    resolve();
                }, this.ANIM_DUR_IN_MS);

            }, 1);
        });
    }

    disable() {
        this._accept_btn.disabled = true;
        this._decline_btn.disabled = true;
    }

    destroy() {
        this._loading_indicator.destroy();
        this._el.remove();
    }
}

export {QuestDialog};
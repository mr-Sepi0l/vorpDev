import {NssSimpleTextEditor} from "./NssSimpleTextEditor.js";

class NssSimpleTextEditorSection {

    static _uid_ctr = 0;

    static TYPE_HEADLINE_ID = 'headline';
    static TYPE_TEXT_ID = 'text';

    static CSS_REMOVE_BTN_DISABLED = 'nss-simple-text-editor__section-remove-btn--disabled';
    static CSS_ERROR = 'nss-simple-text-editor__section--error';

    /**
     * @type {NssSimpleTextEditorAlign[]}
     */
    static ALIGN_LIST = [
        {id: 'left', icon_cls: 'pb-icon__align-left', container_cls: 'nss-simple-text-editor__section--align-left'},
        {
            id: 'center',
            icon_cls: 'pb-icon__align-center',
            container_cls: 'nss-simple-text-editor__section--align-center'
        },
        {id: 'right', icon_cls: 'pb-icon__align-right', container_cls: 'nss-simple-text-editor__section--align-right'},
    ];

    /**
     * @type {NssSimpleTextEditorType[]}
     */
    static TYPE_LIST = [
        {
            id: NssSimpleTextEditorSection.TYPE_HEADLINE_ID,
            icon_cls: 'pb-icon__header',
            container_cls: 'nss-simple-text-editor__section--headline'
        },
        {
            id: NssSimpleTextEditorSection.TYPE_TEXT_ID,
            icon_cls: 'pb-icon__paragraph',
            container_cls: 'nss-simple-text-editor__section--text'
        },
    ];

    /**
     * @param {NssSimpleTextEditor} editor
     */
    constructor(editor) {

        /**
         * @type {NssSimpleTextEditor}
         * @private
         */
        this._editor = editor;

        /**
         * @type {string}
         * @private
         */
        this._id = NssSimpleTextEditorSection._createUniqueID();

        /**
         * @type {string}
         * @private
         */
        this._type = NssSimpleTextEditorSection.TYPE_TEXT_ID;

        /**
         * @type {number}
         * @private
         */
        this._current_align_index = 0;

        /**
         * @type {number}
         * @private
         */
        this._current_type_index = 0;

        /**
         * @type {boolean}
         * @private
         */
        this._was_validated = false;

        /**
         * @type {boolean}
         * @private
         */
        this._tab_creates_new_sections = false;

        this._createDom();
    }

    /**
     * @return {string}
     * @private
     */
    static _createUniqueID() {
        NssSimpleTextEditorSection._uid_ctr++;
        return 'editor-section-' + NssSimpleTextEditorSection._uid_ctr;
    }

    /**
     * @private
     */
    _createDom() {

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._el = document.createElement('div');
        this._el.classList.add('nss-simple-text-editor__section');
        this._el.classList.add('nss-simple-text-editor__section--text');

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._options_el = document.createElement('div');
        this._options_el.classList.add('nss-simple-text-editor__section-options');
        this._el.appendChild(this._options_el);

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._type_btn_el = document.createElement('button');
        this._type_btn_el.setAttribute('type', 'button');
        this._type_btn_el.setAttribute('tabindex', '-1');
        this._type_btn_el.classList.add('nss-simple-text-editor__section-type-btn');
        this._type_btn_el.classList.add('nss-simple-text-editor__btn');
        this._type_btn_el.classList.add('nss-btn');
        this._type_btn_el.classList.add('nss-btn--icon');
        this._type_btn_el.classList.add('nss-btn--very-small');
        this._type_btn_el.innerHTML = '<span class="pb-icon__paragraph"></span>';
        this._type_btn_el.addEventListener('click', this._onTypeBtn.bind(this));
        this._options_el.appendChild(this._type_btn_el);

        this.setText();

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._align_btn_el = document.createElement('button');
        this._align_btn_el.setAttribute('type', 'button');
        this._align_btn_el.setAttribute('tabindex', '-1');
        this._align_btn_el.classList.add('nss-simple-text-editor__section-align-btn');
        this._align_btn_el.classList.add('nss-simple-text-editor__btn');
        this._align_btn_el.classList.add('nss-btn');
        this._align_btn_el.classList.add('nss-btn--icon');
        this._align_btn_el.classList.add('nss-btn--very-small');
        this._align_btn_el.innerHTML = '<span class="pb-icon__align-left"></span>';
        this._align_btn_el.addEventListener('click', this._onAlignBtn.bind(this));
        this._options_el.appendChild(this._align_btn_el);

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._remove_btn_el = document.createElement('button');
        this._remove_btn_el.setAttribute('type', 'button');
        this._remove_btn_el.setAttribute('tabindex', '-1');
        this._remove_btn_el.classList.add('nss-simple-text-editor__section-remove-btn');
        this._remove_btn_el.classList.add('nss-simple-text-editor__btn');
        this._remove_btn_el.classList.add('nss-btn');
        this._remove_btn_el.classList.add('nss-btn--icon');
        this._remove_btn_el.classList.add('nss-btn--danger');
        this._remove_btn_el.classList.add('nss-btn--very-small');
        this._remove_btn_el.innerHTML = '<span class="pb-icon__trash"></span>';
        this._remove_btn_el.addEventListener('click', this._onRemoveBtn.bind(this));
        this._options_el.appendChild(this._remove_btn_el);

        /**
         * @type {HTMLDivElement}
         * @private
         */
        this._text_el = document.createElement('div');
        this._text_el.classList.add('nss-simple-text-editor__section-text');
        this._text_el.setAttribute('contenteditable', 'true');
        this._text_el.setAttribute('spellcheck', 'false');
        this._text_el.innerHTML = this._editor.getPlaceholderText();

        this._text_el.addEventListener('focus', () => {
            if (this._text_el.innerText.trim() === this._editor.getPlaceholderText()) {
                this._text_el.innerText = '';
            }
        });

        this._text_el.addEventListener('blur', () => {
            if (this._text_el.innerText.trim() === '') {
                this._text_el.innerText = this._editor.getPlaceholderText();
            }
        });

        this._text_el.addEventListener('keydown', (event) => {

            this._monitorValidationAfterError.bind(this);

            if (this._tab_creates_new_sections === true && event.key === 'Tab') {
                event.preventDefault();
                event.stopPropagation();
                this._editor.addSection(this);
                return false;
            }
        });

        this._el.appendChild(this._text_el);

        this._footer_el = document.createElement('div');
        this._footer_el.classList.add('nss-simple-text-editor__section-footer');
        this._el.appendChild(this._footer_el);

        /**
         * @type {HTMLButtonElement}
         * @private
         */
        this._add_btn_el = document.createElement('button');
        this._add_btn_el.setAttribute('type', 'button');
        this._add_btn_el.setAttribute('tabindex', '-1');
        this._add_btn_el.classList.add('nss-simple-text-editor__btn');
        this._add_btn_el.classList.add('nss-simple-text-editor__section-add-btn');
        this._add_btn_el.classList.add('nss-btn');
        this._add_btn_el.classList.add('nss-btn--icon');
        this._add_btn_el.classList.add('nss-btn--very-small');
        this._add_btn_el.innerHTML = '<span class="pb-icon__plus"></span>';
        this._add_btn_el.addEventListener('click', this._onAddBtn.bind(this));
        this._footer_el.appendChild(this._add_btn_el);
    }

    /**
     * @private
     */
    _onTypeBtn() {
        this._current_type_index++;

        if (this._current_type_index >= NssSimpleTextEditorSection.TYPE_LIST.length) {
            this._current_type_index = 0;
        }

        this._updateType();
    }

    /**
     * @private
     */
    _updateType() {
        NssSimpleTextEditorSection.TYPE_LIST.forEach((type) => {
            this._el.classList.remove(type.container_cls);
        });

        const current_type = this._getTypeByIndex();
        this._el.classList.add(current_type.container_cls);
        this._type_btn_el.innerHTML = '<span class="' + current_type.icon_cls + '"></span>';
    }

    /**
     * @param {number} [index]
     * @return {NssSimpleTextEditorType}
     * @private
     */
    _getTypeByIndex(index) {

        if (typeof index === 'undefined') {
            index = this._current_type_index;
        }

        return NssSimpleTextEditorSection.TYPE_LIST[index];
    }

    /**
     * @return {NssSimpleTextEditorType}
     */
    getType() {
        return this._getTypeByIndex();
    }

    /**
     * @param {string} id
     * @return {NssSimpleTextEditorType}
     * @private
     */
    _getTypeById(id) {

        const found_type = NssSimpleTextEditorSection.TYPE_LIST.find((type) => {
            return type.id === id;
        });

        return found_type;
    }

    /**
     * @param {string} id
     * @return {number}
     * @private
     */
    _getTypeIndexById(id) {

        let found_index = -1;

        const found_type = NssSimpleTextEditorSection.TYPE_LIST.find((type, index) => {
            const found = type.id === id;

            if (found) {
                found_index = index;
            }

            return found;
        });

        return found_index;
    }

    /**
     * @private
     */
    _onAlignBtn() {
        this._current_align_index++;

        if (this._current_align_index >= NssSimpleTextEditorSection.ALIGN_LIST.length) {
            this._current_align_index = 0;
        }

        this._updateAlign();
    }

    /**
     * @private
     */
    _updateAlign() {

        NssSimpleTextEditorSection.ALIGN_LIST.forEach((align) => {
            this._el.classList.remove(align.container_cls);
        });

        const current_align = this._getAlignByIndex();
        this._el.classList.add(current_align.container_cls);
        this._align_btn_el.innerHTML = '<span class="' + current_align.icon_cls + '"></span>';
    }

    /**
     * @param {number} [index]
     * @return {NssSimpleTextEditorAlign}
     * @private
     */
    _getAlignByIndex(index) {

        if (typeof index === 'undefined') {
            index = this._current_align_index;
        }

        return NssSimpleTextEditorSection.ALIGN_LIST[index];
    }

    /**
     * @return {NssSimpleTextEditorAlign}
     */
    getAlign() {
        return this._getAlignByIndex();
    }

    /**
     * @return {string}
     */
    getText() {

        let text = this._text_el.innerText;

        if (text.trim() === this._editor.getPlaceholderText()) {
            text = '';
        }

        return text;
    }

    /**
     * @private
     */
    _onRemoveBtn() {
        this._editor.removeSection(this);
    }

    /**
     * @private
     */
    _onAddBtn() {
        this._editor.addSection(this);
    }

    /**
     * @return {HTMLDivElement}
     */
    getEl() {
        return this._el;
    }

    /**
     * @return {string}
     */
    getId() {
        return this._id;
    }

    /**
     * @return {NssSimpleTextEditorSection}
     */
    setHeadline() {
        this._current_type_index = this._getTypeIndexById(NssSimpleTextEditorSection.TYPE_HEADLINE_ID);
        this._updateType();
        return this;
    }

    /**
     * @return {NssSimpleTextEditorSection}
     */
    setText() {
        this._current_type_index = this._getTypeIndexById(NssSimpleTextEditorSection.TYPE_TEXT_ID);
        this._updateType();
        return this;
    }

    destroy() {
        this._el.remove();
    }

    /**
     * @return {NssSimpleTextEditorSection}
     */
    enableRemoveBtn() {
        this._remove_btn_el.classList.remove(NssSimpleTextEditorSection.CSS_REMOVE_BTN_DISABLED);
        return this;
    }

    /**
     * @return {NssSimpleTextEditorSection}
     */
    disableRemoveBtn() {
        this._remove_btn_el.classList.add(NssSimpleTextEditorSection.CSS_REMOVE_BTN_DISABLED);
        return this;
    }

    /**
     * @return {NssSimpleTextEditorSection}
     */
    focus() {
        this._text_el.focus();
        return this;
    }

    /**
     * @private
     */
    _monitorValidationAfterError() {

        if (false === this._was_validated) {
            return;
        }

        this.isErrorHandlingSuccessful();
    }

    /**
     * @return {boolean}
     */
    isErrorHandlingSuccessful() {

        this._was_validated = true;

        this._el.classList.remove(NssSimpleTextEditorSection.CSS_ERROR);

        if (this.isValid()) {
            return true;
        }

        window.setTimeout(() => {
            this._el.classList.add(NssSimpleTextEditorSection.CSS_ERROR);
        }, 0);

        return false;
    }

    /**
     * @return {boolean}
     */
    isValid() {
        return this.getText().trim().length > 0;
    }

    /**
     * @return {NssSimpleTextEditorSection}
     */
    enableTabCreatesNewSections() {
        this._tab_creates_new_sections = true;
        return this;
    }

    /**
     * @return {NssSimpleTextEditorSection}
     */
    disableTabCreatesNewSections() {
        this._tab_creates_new_sections = false;
        return this;
    }
}

export {NssSimpleTextEditorSection};
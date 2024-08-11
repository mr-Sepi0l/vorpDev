import {NssSimpleTextEditorSection} from "./NssSimpleTextEditorSection.js";
import {NssUiComponent} from "../NssUiComponent.js";

/**
 * @extends {NssUiComponent}
 */
class NssSimpleTextEditor extends NssUiComponent {

    /**
     * @param {HTMLElement|Node|Element} target_el
     */
    constructor(target_el) {

        super();

        /**
         * @type {HTMLElement|Node|Element}
         * @private
         */
        this._target_el = target_el;

        /**
         * @type {NssSimpleTextEditorSection[]}
         * @private
         */
        this._sections = [];

        /**
         * @type {string}
         * @private
         */
        this._placeholder_text = 'Dein Text hier...';
    }

    /**
     * @return NssSimpleTextEditor
     */
    start() {
        this._createDom();
        return this;
    }

    /**
     * @param {string} text
     * @return NssSimpleTextEditor
     */
    setPlaceholderText(text) {
        this._placeholder_text = text;
        return this;
    }

    /**
     * @return {string}
     */
    getPlaceholderText() {
        return this._placeholder_text;
    }

    /**
     * @private
     */
    _createDom() {

        /**
         * @type {HTMLElement}
         * @private
         */
        this._container_el = document.createElement('div');
        this._target_el.appendChild(this._container_el);

        const headline_section = this.addSection();
        headline_section.setHeadline();

        const text_section = this.addSection(headline_section);
        text_section.setText();
    }

    /**
     * @param {HTMLElement} new_el
     * @param {HTMLElement} reference_el
     * @private
     */
    _insertAfter(new_el, reference_el) {
        reference_el.parentNode.insertBefore(new_el, reference_el.nextSibling);
    }

    /**
     * @param {HTMLElement} new_el
     * @param {HTMLElement} reference_el
     * @private
     */
    _insertInto(new_el, reference_el) {
        reference_el.appendChild(new_el);
    }

    /**
     * @param {NssSimpleTextEditorSection} [parent_section]
     * @return {NssSimpleTextEditorSection}
     */
    addSection(parent_section) {

        const new_section = new NssSimpleTextEditorSection(this);
        const new_section_el = new_section.getEl();
        let insert_at_index = this._sections.length;

        if (typeof parent_section === "undefined") {
            this._insertInto(new_section_el, this._container_el);
        } else {
            this._insertAfter(new_section_el, parent_section.getEl());

            insert_at_index = this._sections.findIndex((section) => {
                return section.getId() === parent_section.getId();
            });

            if (insert_at_index === -1) {
                insert_at_index = this._sections.length;
            } else {
                insert_at_index++;
            }
        }

        this._sections.splice(insert_at_index, 0, new_section);

        this._handleRemoveButtons();

        new_section.focus();

        return new_section;
    }

    /**
     * @param {NssSimpleTextEditorSection} section
     */
    removeSection(section) {
        this._sections = this._sections.filter((s) => section.getId() !== s.getId());
        this._handleRemoveButtons();
        section.destroy();
    }

    /**
     * @private
     */
    _handleRemoveButtons() {

        this._sections.forEach((section, index) => {
            section.getEl().setAttribute('tabindex', index);
            section.enableRemoveBtn();
            section.disableTabCreatesNewSections();
        });

        if (this._sections.length === 1) {
            this._sections[0].disableRemoveBtn();
        }

        const last_section = this._sections[this._sections.length - 1];
        last_section.enableTabCreatesNewSections();
    }

    /**
     * @return {NssSimpleTextEditorSection[]}
     */
    getSectionsComputed() {

        /**
         * @type {NssSimpleTextEditorSection[]}
         */
        const sections = [];

        this._sections.forEach((/**NssSimpleTextEditorSection*/section_instance) => {

            /**
             * @type {NssSimpleTextEditorSection}
             */
            const section = {
                type: section_instance.getType().id,
                text: section_instance.getText(),
                align: section_instance.getAlign().id,
            };

            sections.push(section);
        });

        return sections;
    }

    /**
     * @return {boolean}
     */
    isErrorHandlingSuccessful() {

        let is_valid = true;

        this._sections.forEach((/**NssSimpleTextEditorSection*/section_instance) => {
            const is_section_invalid = section_instance.isErrorHandlingSuccessful() === false;

            if (is_section_invalid) {
                is_valid = false;
            }
        });

        return is_valid;
    }

    static getComponentName() {
        return "NssSimpleTextEditor";
    }

    static getStyleFilenames() {
        return ['NssSimpleTextEditor.css'];
    }
}

export {NssSimpleTextEditor};
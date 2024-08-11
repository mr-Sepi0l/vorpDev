import {NssButton} from "./NssButton.js";
import {NssUiComponent} from "../NssUiComponent.js";

/**
 * @extends {NssUiComponent}
 */
class NssButtons extends NssUiComponent {

    constructor() {
        super();
    }

    /**
     * @param {string} label
     * @return {NssButton}
     */
    create(label) {
        const btn = new NssButton();
        btn.setLabel(label);
        return btn;
    }

    /**
     * @inheritDoc
     */
    static getComponentName() {
        return "NssButtons";
    }

    /**
     * @inheritDoc
     */
    static getStyleFilenames() {
        return ['NssButtons.css'];
    }
}

export {NssButtons};
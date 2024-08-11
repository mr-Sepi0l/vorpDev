import {NssResponsive} from "./NssResponsive/NssResponsive.js";
import {NssUiComponentInterface} from "./NssUiComponentInterface.js";
import {NssHelper} from "./NssHelper/NssHelper.js";

/**
 * @implements {NssUiComponentInterface}
 */
class NssUiComponent extends NssUiComponentInterface{

    constructor() {

        super();

        this._initializeResponsive();
    }

    /**
     * @protected
     */
    _initializeResponsive() {
        document.body._responsive = document.body._responsive || new NssResponsive();
    }

    /**
     * @return {NssHelper}
     */
    getHelper() {
        return NssHelper;
    }
}

export {NssUiComponent}
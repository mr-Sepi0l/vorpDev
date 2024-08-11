import {NssHelper} from "./NssHelper/NssHelper.js";

/**
 * @interface
 */
class NssUiComponentInterface {

    constructor() {
        this.constructor.loadStyles();
    }

    /**
     * @return {string[]}
     */
    static getStyleFilenames() {
        console.error('NssUiInterface.getStyleFilenames() not implemented');
        return [];
    }

    /**
     * @return {string}
     */
    static getComponentName() {
        console.error('NssUiInterface.getComponentName() not implemented');
        return '';
    }

    /**
     * @private
     */
    static _ensureStyleLoadedRegister() {

        if (typeof window._nss_ui_style_files === 'undefined') {

            /**
             * @type {Object.<string|boolean>}
             */
            window._nss_ui_style_files = {};
        }
    }

    /**
     * @param {string} file_path
     * @return {boolean}
     * @private
     */
    static _isStyleLoaded(file_path) {
        NssUiComponentInterface._ensureStyleLoadedRegister();
        return window._nss_ui_style_files[file_path] || false;
    }

    /**
     * @param {string} file_path
     * @private
     */
    static _setStyleLoaded(file_path) {
        NssUiComponentInterface._ensureStyleLoadedRegister();
        window._nss_ui_style_files[file_path] = true;
    }

    static loadStyles() {

        /**
         * @type {string[]}
         */
        const style_filenames = this.getStyleFilenames() || [];
        const component_name = this.getComponentName();

        style_filenames.forEach(async (style_filename) => {

            const file_path = `./${component_name}/${style_filename}`;

            if (NssUiComponentInterface._isStyleLoaded[file_path]) {
                return;
            }

            NssUiComponentInterface._setStyleLoaded(file_path);

            const cssModule = await import(file_path, {
                assert: {type: 'css'}
            });

            document.adoptedStyleSheets.push(cssModule.default);
        });
    }

    /**
     * @return {NssHelper}
     */
    getHelper() {
        return NssHelper;
    }
}

export {NssUiComponentInterface}
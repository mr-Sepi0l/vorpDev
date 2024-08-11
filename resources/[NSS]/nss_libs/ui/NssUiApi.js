class NssUiApi {

    static NssButtons = 'NssButtons';
    static NssConfirm = 'NssConfirm';
    static NssResponsive = 'NssResponsive';
    static NssSimpleTextEditor = 'NssSimpleTextEditor';
    static NssSvgReplacer = 'NssSvgReplacer';
    static NssTextBox = 'NssTextBox';
    static NssTip = 'NssTip';
    static NssPadLock = 'NssPadLock';
    static NssClient = 'NssClient';
    static NssModal = 'NssModal';
    static NssAudio = 'NssAudio';
    static NssLoadingIndicator = 'NssLoadingIndicator';

    /**
     * @param {string} resource_name
     */
    constructor(resource_name) {

        /**
         * @type {string}
         * @private
         */
        this._resource_name = resource_name;
    }

    /**
     * @param {string} component_name
     * @return {Promise<NssUiComponentInterface>}
     * @private
     */
    async _loadComponents(component_name) {

        const obj = await import(`./${component_name}/${component_name}.js`);

        /**
         * @type {NssUiComponentInterface}
         */
        const component = obj[component_name];

        component.loadStyles();

        return component;
    }

    /**
     * @param {string[]} component_names
     * @return {Promise<NssUiComponents>}
     */
    load(component_names) {

        return new Promise((resolve) => {

            let promises = [];

            /**
             * @type {NssUiComponents}
             */
            let components = {};

            component_names.forEach((component_name) => {

                const promise = this._loadComponents(component_name);

                promise.then((component) => {
                    window[component_name] = component;
                    components[component_name] = component;
                });

                promises.push(promise);
            });

            Promise.all(promises).then(() => {
                resolve(components);
            });
        });
    }
}

export {NssUiApi};
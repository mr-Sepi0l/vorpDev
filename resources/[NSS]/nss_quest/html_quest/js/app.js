import {Quest} from "./Classes/Quest.js";
import {NssUiApi} from "nui://nss_libs/ui/NssUiApi.js";

const RESOURCE_NAME = 'nss_quest';

/**
 * @type {NssUiApi}
 */
const nss_ui_api = new NssUiApi(RESOURCE_NAME);

const component_names = [
    NssUiApi.NssResponsive,
    NssUiApi.NssButtons, /* ensure styles are loaded */
    NssUiApi.NssConfirm,
    NssUiApi.NssClient,
    NssUiApi.NssLoadingIndicator,
    NssUiApi.NssAudio,
    NssUiApi.NssModal,
    NssUiApi.NssSvgReplacer,
];

nss_ui_api.load(component_names).then((components) => {

    /**
     * @type {NssResponsive}
     */
    const responsive = new components.NssResponsive();

    /**
     * @type {NssHelper}
     */
    const helper = responsive.getHelper();

    /**
     * @type {NssClient}
     */
    const nss_client = new components.NssClient(RESOURCE_NAME);

    /**
     * @type {NssAudio}
     */
    const audio_player = new components.NssAudio('nui://nss_quest/html_quest/sounds/', 0.25);

    /**
     * @type {NssButtons}
     */
    const button_factory = new components.NssButtons();

    /**
     * @type {NssModal}
     */
    const nss_modal = components.NssModal;

    /**
     * @type {NssSvgReplacer}
     */
    const nss_svg_replace = new components.NssSvgReplacer();

    const quest = new Quest(
        nss_client,
        components.NssConfirm,
        components.NssLoadingIndicator,
        audio_player,
        button_factory,
        nss_modal,
        helper
    );
});

/**
 * @typedef {Object} QuestItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {QuestStepItem[]} steps
 * @property {number} max_solves
 * @property {boolean} [is_blocked]
 */

/**
 * @typedef {Object} QuestStepItem
 * @property {string} id
 * @property {string} name
 * @property {string} description
 * @property {string} quest_text
 * @property {string} btn_text
 * @property {QuestStepLocation} location
 * @property {QuestRequirements} requires
 * @property {QuestRewards} rewards
 * @property {string} [background_filename]
 * @property {number} [padding_left]
 * @property {number} [padding_right]
 * @property {number} [padding_top]
 * @property {number} [padding_bottom]
 * @property {string} [title_color]
 * @property {string} [text_color]
 * @property {string} [shadow_color]
 */

/**
 * @typedef {Object} QuestRequiredItem
 * @property {string} name
 * @property {number} count
 * @property {boolean} [remove]
 * @property {string} label
 * @property {string} [desc]
 * @property {string} [image]
 */

/**
 * @typedef {Object} QuestRewardItem
 * @property {string} name
 * @property {number} count
 * @property {string} label
 * @property {string} [desc]
 * @property {string} [image]
 */

/**
 * @typedef {Object} QuestRewardWeapon
 * @property {string} name
 * @property {number} amount
 * @property {string} label
 * @property {string} [desc]
 * @property {string} [serial]
 * @property {number} [ammo]
 * @property {string} [image]
 */

/**
 * @typedef {Object} QuestRequiredMoney
 * @property {number} amount
 * @property {boolean} [remove]
 */

/**
 * @typedef {Object} QuestRequiredGold
 * @property {number} amount
 * @property {boolean} [remove]
 */

/**
 * @typedef {Object} QuestRewardMoney
 * @property {number} amount
 */

/**
 * @typedef {Object} QuestRewardGold
 * @property {number} amount
 */

/**
 * @typedef {Object} QuestRewards
 * @property {QuestRewardItem[]} [items]
 * @property {QuestRewardWeapon[]} [weapons]
 * @property {QuestRewardMoney} [money]
 * @property {QuestRewardGold} [gold]
 */

/**
 * @typedef {Object} QuestRequirements
 * @property {QuestRequiredItem[]} [items]
 * @property {QuestRequiredMoney} [money]
 * @property {QuestRequiredGold} [gold]
 * @property completed_quests string[]|nil
 */


/**
 * @typedef {Object} QuestStepLocation
 * @property {{number,number,number}} coords
 * @property {number} radius
 */

/**
 * @typedef {Object} QuestMessageResponse
 * @property {string} type
 * @property {string} [msg]
 * @property {QuestConfig} [config]
 * @property {string} [resource_name]
 * @property {QuestItem} [quest]
 * @property {QuestStepItem} [step]
 * @property {number} [current_pos]
 * @property {number} [total_steps]
 * @property {boolean} [is_first_step]
 * @property {boolean} [is_last_step]
 * @property {string} [money_image_url]
 * @property {string} [gold_image_url]
 * @property {OpenQuests} [open_quests]
 */

/**
 * @typedef {Object} QuestConfig
 * @property {QuestLanguage} [Language]
 * @property {string} [MoneyIconUrl]
 * @property {string} [GoldIconUrl]
 */

/**
 * @typedef {Object.<string,string|number>} QuestLanguage
 * @property {string} enter_quest
 * @property {string} accept
 * @property {string} decline
 * @property {boolean} [error]
 * @property {string} continue
 * @property {string} complete
 * @property {string} ok
 * @property {string} rewards
 * @property {string} requirements
 * @property {string} later
 * @property {string} start
 * @property {string} blocked
 */

/**
 * @typedef {Object} OpenQuest
 * @property {QuestItem} quest (lite)
 * @property {QuestStepItem} step (lite)
 * @property {string} quest_step_id
 */

/**
 * @typedef {OpenQuest[]} OpenQuests
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssClient/NssClient.js").NssClient} NssClient
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssConfirm/NssConfirm.js").NssConfirm} NssConfirm
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssLoadingIndicator/NssLoadingIndicator.js").NssLoadingIndicator} NssLoadingIndicator
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssAudio/NssAudio.js").NssAudio} NssAudio
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssButtons/NssButtons.js").NssButtons} NssButtons
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssButtons/NssButton.js").NssButton} NssButton
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssModal/NssModal.js").NssModal} NssModal
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssResponsive/NssResponsive.js").NssResponsive} NssResponsive
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssHelper/NssHelper.js").NssHelper} NssHelper
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssSvgReplacer/NssSvgReplacer.js").NssSvgReplacer} NssSvgReplacer
 */

/**
 * @typedef {import("../../../../[nss]/nss_libs/ui/NssUiApi.js").NssUiApi} NssUiApi
 */
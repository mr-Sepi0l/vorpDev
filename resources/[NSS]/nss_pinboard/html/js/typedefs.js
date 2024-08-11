/**
 * @typedef {Object} PinBoardPosterItem
 * @property {number} id
 * @property {string} type
 * @property {PinBoardTextPoster|PinBoardImagePoster} content
 * @property {number} creator_vorp_char_id
 * @property {string} location
 * @property {number} created_at
 */

/**
 * @typedef {Object.<string,string>} PinBoardLanguage
 * @property {string} [error]
 */

/**
 * @typedef {Object} PinBoardPostEveryWherePermissions
 * @property {Object.<string,boolean>} [Groups]
 * @property {Object.<string,boolean>} [Names]
 */

/**
 * @typedef {Object} PinBoardConfig
 * @property {string} [language]
 * @property {boolean} [UseCustomTips]
 * @property {Object.<string,string|number|boolean>} [DiscordWebhook]
 * @property {PinBoardBoard[]} [Posters]
 * @property {Object.<string,string|number|boolean>} [GroupRemovePermissions]
 * @property {Object.<string,string|number|boolean>} [JobRemovePermissions]
 * @property {PinBoardPostEveryWherePermissions} [PostEverywhereAtOncePermissions]
 * @property {number} [NotificationDurationInMs]
 * @property {boolean} [PreventCreateTextPosters]
 * @property {boolean} [PreventCreateImagePosters]
 * @property {string[]} [ImageServerBlacklist]
 */

/**
 * @typedef {string} PinBoardJobName
 */

/**
 * @typedef {number} PinBoardJobGrade
 */

/**
 * @typedef {Object<PinBoardJobName,PinBoardJobGrade>} PinBoardBoardJobRestrictions
 */

/**
 * @typedef {Object} PinBoardBoard
 * @property {string} city
 * @property {number[]} coords
 * @property {PinBoardBoardJobRestrictions} [restrict_create_by_jobs]
 * @property {boolean} [prevent_image_posters]
 * @property {boolean} [prevent_text_posters]
 * @property {boolean} [pinning_service_available]
 * @property {number} [pinning_service_cost]
 * @property {string[]} [blocked_urls]
 */

/**
 * @typedef {Object} PinBoardMessageResponse
 * @property {boolean} [success]
 * @property {boolean} [error]
 * @property {string} [error_message]
 * @property {boolean} [timeout]
 * @property {boolean} [no_city_found]
 * @property {string} type
 * @property {boolean} [remove_allowed]
 * @property {boolean} [status]
 * @property {PinBoardPosterItem[]} [table_for_json]
 * @property {number|string} [charidentifier]
 * @property {string} [resource_name]
 * @property {boolean} [is_night]
 * @property {PinBoardLanguage} [language]
 * @property {PinBoardConfig} [config]
 * @property {NssPinboardCharDetails} char_details
 * @property {PinBoardBoard} [pinboard_cfg]
 */

/**
 * @typedef {function(poster_details:PosterDetails)} PinBoardOnPosterRemovedCallback
 */

/**
 * @typedef {function(poster_details:PosterDetails)} PinBoardOnPosterDetailsClosedCallback
 */

/**
 * @typedef {Object} PinBoardPosterBackground
 * @property {number} id
 * @property {string} poster_cls
 * @property {string} container_cls
 */

/**
 * @typedef {Object} PinBoardPosterSection
 * @property {string} text
 * @property {string} align
 * @property {string} type
 */

/**
 * @typedef {Object} PinBoardTextPoster
 * @property {number} paper
 * @property {PinBoardPosterSection[]} sections
 * @property {boolean} everywhere
 * @property {boolean} pinning_service
 */

/**
 * @typedef {Object} PinBoardImagePoster
 * @property {string} image_url
 * @property {boolean} everywhere
 */

/**
 * @callback PinBoardOnShowCallback
 * @param {PinBoardLanguage} language
 * @param {PinBoardConfig} config
 * @param {boolean} is_night
 * @param {NssPinboardCharDetails} char_details
 * @param {PinBoardBoard} pinboard_cfg
 */

/**
 * @typedef {Object} NssPinboardCharDetails
 * @property {number} char_id
 * @property {string} char_name
 * @property {string} group
 * @property {string} job
 * @property {string} job_grade
 * @property {{post_everywhere_at_once:boolean}} permissions
 * @property {boolean} is_admin
 * @property {number} money
 */
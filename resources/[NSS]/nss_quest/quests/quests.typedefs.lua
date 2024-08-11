---@alias NssQuestId string
---@alias NssQuestStepId string
---@alias NssQuestWeaponImageUrl string
---@alias NssQuestWeaponName string
---@alias NssQuestWeaponImageList table<NssQuestWeaponName, NssQuestWeaponImageUrl>
---@alias NssQuestJobAndGradeList table<string, number>

---@class NssQuestClientQuestTimeWindowDays
---@field monday boolean|nil
---@field tuesday boolean|nil
---@field wednesday boolean|nil
---@field thursday boolean|nil
---@field friday boolean|nil
---@field saturday boolean|nil
---@field sunday boolean|nil

---@class NssQuestClientQuestTimeWindow
---@field start_hour number
---@field end_hour number
---@field start_minute number
---@field end_minute number
---@field days NssQuestClientQuestTimeWindowDays

---@class NssQuestItem
---@field name string
---@field count number
---@field remove boolean|nil
---@field label string|nil Optional, will be set dynamically
---@field desc string|nil Optional, will be set dynamically
---@field image string|nil Optional, will be set dynamically

---@class NssQuestWeapon
---@field name string
---@field amount number
---@field serial string|nil
---@field label string|nil
---@field desc string|nil
---@field image string|nil Optional, will be set dynamically

---@class NssQuestMoney
---@field amount number
---@field remove boolean|nil

---@class NssQuestGold
---@field amount number
---@field remove boolean|nil

---@class NssQuestStepRewards
---@field items NssQuestItem[]|nil
---@field weapons NssQuestWeapon[]|nil
---@field gold NssQuestGold[]|nil
---@field money NssQuestMoney|nil

---@class NssQuestStepRequirements
---@field items NssQuestItem[]|nil
---@field money NssQuestMoney|nil
---@field completed_quests string[]|nil

---@class NssQuestStepLocation
---@field coords NssQuestCoords
---@field radius number

---@class NssQuestColor
---@field r number
---@field g number
---@field b number

---@class NssQuestStepMarker
---@field type number
---@field coords NssQuestCoords
---@field color NssQuestColor
---@field radius number

---@class NssQuestRadiusBlip
---@field color string
---@field radius number

---@class NssQuestBlip
---@field icon string
---@field color string
---@field title string

---@class NssQuestStep
---@field id NssQuestStepId
---@field name string
---@field description string
---@field location NssQuestStepLocation
---@field marker NssQuestStepMarker
---@field requires NssQuestStepRequirements
---@field rewards NssQuestStepRewards
---@field btn_text string|nil
---@field quest_text string|nil
---@field background_filename string|nil
---@field padding_left number|nil
---@field padding_right number|nil
---@field padding_top number|nil
---@field padding_bottom number|nil
---@field title_color string|nil
---@field text_color string|nil
---@field shadow_color string|nil
---@field callback function|nil
---@field radius_blip NssQuestRadiusBlip|nil
---@field blip NssQuestBlip|nil

---@class NssQuest
---@field id NssQuestId
---@field name string
---@field description string
---@field steps NssQuestStep[]
---@field max_solves number
---@field restart_delay_in_seconds number|nil
---@field show_previous_step_in_quest_log boolean|nil
---@field restricted_to_jobs NssQuestJobAndGradeList|nil
---@field blacklisted_jobs NssQuestJobAndGradeList|nil
---@field in_game_time_windows NssQuestClientQuestTimeWindow[]|nil

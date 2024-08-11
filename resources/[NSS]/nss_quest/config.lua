---@type NssQuestLanguage
local EN = {
    enter_quest = 'Start quest',
    accept = 'Accept',
    later = 'Later',
    decline = 'Decline',
    continue = "Continue",
    complete = "Complete",
    start = "Start",
    ok = "OK",
    quest_not_found = "Quest not found.",
    step_not_found = "Quest step not found.",
    not_enough_items = "You do not have the required items.",
    not_enough_money = "You do not have the required money.",
    not_enough_gold = "You do not have the required gold.", -- New since 1.3.0
    not_completed_quests = "You have not completed the required pre-quests.",
    cannot_carry_items = "You cannot carry the rewards.",
    rewards = "Rewards",
    requirements = "Requirements",
    unknown_item = "Unknown item",
    money = "Dollar",
    discord_title_quest_completed = "Quest completed",
    discord_title_quest_started = "Quest started",
    discord_title_quest_progress = "Quest progress",
    delay_not_complete = "You have to wait until you can go on.", -- New since 1.1.0
    close = "Close", -- New since 1.2.0
    quest_log = "Quest log", -- New since 1.2.0
    quest_log_received_title = "Quest log received", -- New since 1.2.0
    quest_log_received_message = "You will find the quest log in your inventory.", -- New since 1.2.0
    quest_log_removed_title = "All quests done", -- New since 1.2.0
    quest_log_removed_message = "The quest log was removed from your inventory.", -- New since 1.2.0
    quest_is_not_in_time_window_title = "Too late...", -- New since 1.6.0
    quest_is_not_in_time_window_message = "Try again later.", -- New since 1.6.0
    blocked = "This quest is only available to jobs, job grades or user groups that you once held.", -- New since 1.6.2
}

---@type NssQuestLanguage
local DE = {
    enter_quest = 'Starte Quest',
    accept = 'Akzeptieren',
    later = 'Später',
    decline = 'Ablehnen',
    continue = "Weiter",
    complete = "Abschließen",
    start = "Start",
    ok = "OK",
    quest_not_found = "Quest nicht gefunden.",
    step_not_found = "Questschritt nicht gefunden.",
    not_enough_items = "Du hast nicht alle benötigten Gegenstände.",
    not_enough_money = "Du hast nicht das benötigte Geld.",
    not_enough_gold = "Du hast nicht das benötigte Gold.", -- New since 1.3.0
    not_completed_quests = "Du hast nicht den notwendigen Vorquest absolviert.",
    cannot_carry_items = "Die Belohnungen passen nicht in Deine Tasche.",
    rewards = "Belohnungen",
    requirements = "Anforderungen",
    unknown_item = "Unbekannter Gegenstand",
    money = "Dollar",
    discord_title_quest_completed = "Quest abgeschlossen",
    discord_title_quest_started = "Quest gestartet",
    discord_title_quest_progress = "Quest Fortschritt",
    delay_not_complete = "Du musst noch etwas warten, bevor Du weitermachen kannst.", -- New since 1.1.0
    close = "Schließen", -- New since 1.2.0
    quest_log = "Questlog", -- New since 1.2.0
    quest_log_received_title = "Questlog erhalten", -- New since 1.2.0
    quest_log_received_message = "Du findest das Questlog im Inventar.", -- New since 1.2.0
    quest_log_removed_title = "Alle Quests erledigt", -- New since 1.2.0
    quest_log_removed_message = "Das Questlog wurde aus Deinem Inventar entfernt.", -- New since 1.2.0
    quest_is_not_in_time_window_title = "Zu spät...", -- New since 1.6.0
    quest_is_not_in_time_window_message = "Versuche es später noch einmal.", -- New since 1.6.0
    blocked = "Diese Quest ist nur für Jobs, Job Ränge oder Nutzergruppen verfügbar, die Du früher einmal inne hattest.", -- New since 1.6.2
}

---@type NssQuestLanguage
local FR = {
    enter_quest = 'Commencer le contrat',
    accept = 'Accepter',
    later = 'Plus tard',
    decline = 'Décliner',
    continue = "Continuer",
    complete = "Compléter",
    start = "Commencer",
    ok = "OK",
    quest_not_found = "Contrat introubable.",
    step_not_found = "Etape du contrat introuvable.",
    not_enough_items = "Vous n'avez pas les objets requis.",
    not_enough_money = "Vous n'avez pas assez d'argent.",
    not_enough_gold = "VOus n'avez pas assez de dolares.", -- New since 1.3.0
    not_completed_quests = "VOus n'avez remplis de contrat pré-requis.",
    cannot_carry_items = "Vous n'avez plus assez de place",
    rewards = "Récompenses",
    requirements = "Prérequis",
    unknown_item = "Objet inconnu",
    money = "Dollar",
    discord_title_quest_completed = "Contrat complété",
    discord_title_quest_started = "Contrat commencé",
    discord_title_quest_progress = "Progression du contrat",
    delay_not_complete = "Vous devez ttendre avant de continuer.", -- New since 1.1.0
    close = "Fermer", -- New since 1.2.0
    quest_log = "Classeur de contrat", -- New since 1.2.0
    quest_log_received_title = "Classeur de contrat recu", -- New since 1.2.0
    quest_log_received_message = "Vous trouverez le classeur de contrat dans votre inventaire.", -- New since 1.2.0
    quest_log_removed_title = "Tous les contrats sont terminés", -- New since 1.2.0
    quest_log_removed_message = "Le classeur de contrat a été retiré de votre inventaire", -- New since 1.2.0
    quest_is_not_in_time_window_title = "Trop tard...", -- New since 1.6.0
    quest_is_not_in_time_window_message = "Réesayer plus tard.", -- New since 1.6.0
    blocked = "Ce contract est reservé à certains métier ou grade que vous ne possédez plus", -- New since 1.6.2
}

---@type NssQuestConfig
Config = {}

Config.NameOfAdminGroup = "superadmin"

-- See https://github.com/mja00/redm-shit/blob/master/nuiweaponspawner/config.lua for key hashes
Config.OpenKey = 0xD9D0E1C0 -- Spacebar

Config.UnknownItemImageUrl = "nui://nss_quest/html_quest/img/item_unknown.png"
Config.DefaultMoneyIconUrl = "nui://nss_quest/html_quest/img/item_money.png"
Config.DefaultGoldIconUrl = "nui://nss_quest/html_quest/img/item_gold.png" -- New since 1.3.0

-- Quest log item must exist in Vorp Inventory Database and should not registered as usable item from other resources
Config.QuestLogItemName = "questlog" -- Set to nil if you dont want to use a quest log item that opens the quest log. New since 1.6.3
Config.CheckInventoryAfterCharSelectedDelayInSeconds = 10 -- New since 1.2.1
Config.OpenQuestLogCommand = nil -- Set to nil if you dont want to use a command that opens the quest log. New since 1.6.3

-- Notify look and feel
-- See https://github.com/femga/rdr3_discoveries/tree/f729ba03f75a591ce5c841642dc873345242f612/useful_info_from_rpfs/textures for available textures
-- See https://github.com/femga/rdr3_discoveries/tree/7149acf64a4784afa4582afdd1b0009a137aed50/useful_info_from_rpfs/colours for available colors
Config.NotifyQuestLogReceivedDictionary = 'INVENTORY_ITEMS' -- New since 1.2.0
Config.NotifyQuestLogReceivedTexture = 'document_wild_man_journal' -- New since 1.2.0
Config.NotifyQuestLogReceivedColor = 'COLOR_BRONZE' -- New since 1.2.0

Config.NotifyQuestLogRemovedDictionary = 'INVENTORY_ITEMS' -- New since 1.2.0
Config.NotifyQuestLogRemovedTexture = 'document_wild_man_journal' -- New since 1.2.0
Config.NotifyQuestLogRemovedColor = 'COLOR_BRONZE' -- New since 1.2.0

---@type NssQuest[]
Config.Quests = { QuestDemo }

Config.Language = FR

Config.DiscordWebhook = {
    active = true,
    webhook_url = "YOUR_WEBHOOK_URL",
    avatar_url = "YOUR_AVATAR_URL",
    server_icon_url = "YOUR_SERVER_ICON_URL",
    quest_completed_color_hex = "#00c500",
    quest_started_color_hex = "#0021c5",
    quest_progress_color_hex = "#00b5c5",
}

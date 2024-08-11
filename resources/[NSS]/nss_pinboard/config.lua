---@type NssPinboardConfig
Config = {}

-- See folder languages for available locales
Config.language = "fr"

Config.DiscordWebhook = {
    active = true,
    webhook_url = "YOUR_WEBHOOK_URL", -- If set, this webhook will be used for all pinboard actions and ignores anonymous setting.
    webhook_url_new = "YOUR_WEBHOOK_URL_FOR_NEW_ITEMS", -- If you want new and removed items in one discord channel set this to the same as webhook_url_remove
    webhook_url_removed = "YOUR_WEBHOOK_URL_FOR_REMOVED_ITEMS",
    anonymous_new = false,
    anonymous_remover = false,
    avatar_url = "YOUR_AVATAR_URL", -- Required if webhook is used.
    server_icon_url = "YOUR_SERVER_ICON_URL", -- Required if webhook is used.
    new_text_poster_color_hex = "#00c500",
    new_image_poster_color_hex = "#00c500",
    remove_text_poster_color_hex = "#990000",
    remove_image_poster_color_hex = "#990000",
    system_user_alias = "NssPinboard",
}

-- Optional: If you want to block images from specific servers.
-- E.g. Discord images have an expiration time (sine end of 2023) and are not usefully for a bulletin board.
-- New since 1.3.1
Config.ImageServerBlacklist = {
    --"cdn.discordapp.com",
    --"www.example.com",
}

-- If true the bulletin board will be hidden on combat or damage, set to false or nil to disable
-- Note: If a player writes a long notice and the board will be closed on combat or damage than the notice will be lost.
Config.HideOnCombatOrDamage = true -- New since 1.3.0

-- "newest_first" or "latest_first" (default)
Config.NoticeOrder = "latest_first"

-- 1000 = 1 second
Config.NotificationDurationInMs = 4000

-- Recommended radius is 1.0
Config.OpenPromptRadius = 1.0

-- If not set then no blips will be shown on map
Config.BlipHash = 1735233562

-- If not set then the command will be disabled
Config.ConsoleRemoveCommand = "clear_board"

-- Set to 0 if no automatic expiration is desired
Config.AutomaticExpirationAfterDays = 0

-- If true the bulletin board tips are used instead of the vorp ones.
-- The bulletin tips currently are better because they are appearing in the top of all instead behind the bulletin board like vorp.
Config.UseCustomTips = true

-- See https://github.com/mja00/redm-shit/blob/master/nuiweaponspawner/config.lua for key hashes
Config.OpenKey = 0x760A9C6F -- G

-- Below some examples. All options are combinable.
Config.Posters = {

    -- Example with blip
    {
        city = "Valentine", -- Required: Unique (!!!) name of the board
        group = "Public", -- Required: Name of board group (used for "post at all boards" option with same group)
        coords = { -269.07, 764.85, 117.65 }, -- Required: Coordinates of the board (x, y, z). Ensure that the boards are at least 10 metres away from each other.
    },
    {
        city = "Saint Denis",
        group = "Public",
        coords = { 2514.29, -1320.60, 48.53 },
    },
    {
        city = "Rhodes",
        group = "Public",
        coords = { 1272.67, -1281.89, 75.35 },
    },
    {
        city = "Blackwater",
        group = "Public",
        coords = { -831.70, -1345.21, 43.67 },
    },
    {
        city = "Strawberry",
        group = "Public",
        coords = { -1828.18, -409.57, 161.19 },
    },
    {
        city = "Annesburg",
        group = "Public",
        coords = { 2956.32, 1361.37, 44.84 },
    },
    {
        city = "Armadillo",
        group = "Public",
        coords = { -3712.34, -2568.21, -13.65 },
    },
    {
        city = "Tumbeleweed",
        group = "Public",
        coords = { -5506.21, -2915.06, -2.41 },
    },
    {
        city = "Van Horn",
        group = "Public",
        coords = { 2955.46, 530.62, 44.68 },
    },
    {
        city = "Taverne Redwood",
        group = "Public",
        coords = { -2731.290771, -2932.563477, 66.131836 },
        hide_blip = true,
    },
}

-- Defines which user group is admin group. If you do not want an admin group, set this to 'i-want-no-admin-group'.
-- Important: Admins can do everything (removing posts, post everywhere, see all job boards, etc.)
Config.NameOfAdminGroup = 'superadmin'

-- true = group can remove notes from the bulletin board
-- Note: Admins can always remove notes
Config.GroupRemovePermissions = {
    --["support"] = true
}

-- true = all grades of the job can remove notes from the bulletin board
-- number = only job grade equal or higher can remove notes from the bulletin board
-- Note: Admins have all permissions.
Config.JobRemovePermissions = {
    --["Sheriff"] = 1
}

-- true = group/character name can add notes to all bulletin boards at same time.
-- Note: Overwrites Config.NotePiningGroupServices.
-- Note: Admins can always post notes everywhere
Config.PostEverywhereAtOncePermissions = {}

Config.PostEverywhereAtOncePermissions.Groups = {
    --["support"] = true
}

Config.PostEverywhereAtOncePermissions.Names = {
    --["Jules Brown"] = true
}

-- Globally disable creating text posters (can be overwritten for each pinboard config via `prevent_text_posters`)
-- Admins can always create text posters
Config.PreventCreateTextPosters = false

-- Globally disable creating image posters (can be overwritten for each pinboard config via `prevent_image_posters`)
-- Admins can always create image posters
Config.PreventCreateImagePosters = false

-- Allow users to pin notes to all boards of a group for a fee, set to nil to disable
-- Note: Admins can post notes everywhere for free
Config.NotePiningGroupServices = {

    -- Example for a group with a cost of 0.5
    {
        group = "Public", -- Required: Name of board group (used for "post at all boards" option with same group)
        cost = 0.5, -- Required: Cost for pinning a note to all boards of this group
    }
}

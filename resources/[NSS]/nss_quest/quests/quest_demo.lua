---@type NssQuest
QuestDemo = {
    id = "halloween", -- only letters and numbers, no spaces or other special characters!
    name = "Creepy Creatures",
    description = "Just a test quest",
    max_solves = 3,
    restart_delay_in_seconds = 0, -- optional, 0 = no delay
    show_previous_step_in_quest_log = false, -- optional, default is false, new since 1.2.1

    restricted_to_jobs = {
        ["hunter"] = 1, -- Job "hunter" of minimum grade 1 or higher is allowed to use this quest.
        ["farmer"] = 2, -- Job "farmer" of minimum grade 2 or higher is allowed to use this quest.
    }, -- optional, default is nil, new since 1.4.0

    blacklisted_jobs = {
        ["driver"] = 1, -- Job "driver" of minimum grade 1 or higher is not allowed to use this quest.
        ["cook"] = 3, -- Job "cook" of minimum grade 3 or higher is not allowed to use this quest.
        ["tamer"] = 0, -- Job "tamer" of all grades is not allowed to use this quest.
    }, -- optional, default is nil, new since 1.5.0

    in_game_time_windows = {
        {
            days = {
                monday = true,
                tuesday = true,
                thursday = true,
                saturday = true,
                sunday = true,
            }, -- optional, default is nil what means all days
            start_hour = 6,
            start_minute = 0,
            end_hour = 18,
            end_minute = 0,
        }, -- 06:00am - 06:00pm / 06:00 - 18:00

        {
            days = {
                monday = true,
            }, -- optional, default is nil what means all days
            start_hour = 12,
            start_minute = 0,
            end_hour = 0,
            end_minute = 0,
        }, -- 12:00am - 00:00pm / 12:00 - 00:00
    }, -- optional, default is nil, new since 1.6.0

    steps = {
        {
            id = "start", -- only letters and numbers, no spaces or other special characters!
            name = "Strange footsteps...",
            btn_text = "Strange footsteps...",
            quest_text = "You see some strange footsteps on the floor. You think it might be some wolf footsteps but they are very large.\n\n"
                    .. "Go and find some coal and bring it back to the current place.",

            -- somewhere in Blackwater
            location = {
                coords = { x = -858.72, y = -1340.31, z = 44.43 },
                radius = 2.0,
            },

            -- Optional: Leave it out or set it to `nil` if no radius blip is to be displayed.
            radius_blip = {
                color = 'BLIP_MODIFIER_PICKUP_WEAPON_RARE', -- See https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_modifiers for blip colors.
                radius = 200.0, -- Radius in meters
            },

            -- Optional: Leave it out or set it to `nil` if no blip is to be displayed.
            blip = {
                color = 'BLIP_MODIFIER_PICKUP_WEAPON_RARE', -- See https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_modifiers for blip colors.
                title = "Strange footsteps",
                icon = "blip_ambient_king", -- See https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips_mp or https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips for blip icons.
            },

            -- Optional: Leave it out or set it to `nil` if no marker is to be displayed.
            marker = {
                coords = { x = -858.72, y = -1340.31, z = 43.43 },
                radius = 10.0,
                type = 0x94FDAE17, -- See https://github.com/femga/rdr3_discoveries/blob/master/graphics/markers/marker_types.lua for marker types
                color = { r = 102, g = 0, b = 255 }, -- Values between 0 and 255
            },
        },

        {
            id = "middle", -- only letters and numbers, no spaces or other special characters!
            name = "More strange footsteps...",
            btn_text = "Mark the footsteps...",
            quest_text = "You use the coal to mark the footsteps with a magical symbol. This symbol prevents the people for bad wolfes.\n\n"
                    .. "Go and find some agave and bring it back to the current place.",

            location = {
                coords = { x = -858.28, y = -1334.57, z = 44.4 },
                radius = 2.0
            }, -- somewhere in Blackwater

            requires = {
                items = {
                    { name = "coal", count = 1, remove = true, label = "Crazy shit coal" },
                },

                -- New since 1.3.0
                gold = {
                    amount = 1,
                },
            },
        },

        {
            id = "end", -- only letters and numbers, no spaces or other special characters!
            name = "Banning the curse",
            btn_text = "Clear the air...",
            quest_text = "<strong>Congratulations!</strong> You have cleared the air with the help of the agave. The curse is gone and the people can live in peace again.\n\n",

            location = {
                coords = { x = -868.34, y = -1326.33, z = 43.29 },
                radius = 2.0
            }, -- somewhere in Blackwater

            requires = {
                items = {
                    { name = "agave", count = 1, remove = true },
                },
            },

            rewards = {

                items = {
                    { name = "coal", count = 2 },
                    { name = "agave", count = 2 },
                },

                money = {
                    amount = 10,
                },

                -- New since 1.3.0
                gold = {
                    amount = 10,
                },

                -- New since 1.3.0
                weapons = {
                    {
                        name = "WEAPON_REVOLVER_CATTLEMAN", -- IMPORTANT: The name is case sensitive for image names!
                        label = "My lucky revolver", -- Optional: If not set, the label from the weapon will be used.
                        desc = "A revolver from a quest.", -- Optional: If not set, the description from the weapon will be used.
                        serial = "1234567890", -- Optional: If not set, a random serial will be generated. Ensure unique serials!
                        amount = 1,
                    },
                },
            },

            ---@param _source number
            ---@param step NssQuestStep
            ---@param char NssQuestCharacter
            callback = function(_source, step, char)
                print("wooohooo")
            end
        },
    }
}
Horse = {}

----------------------------------------------------------------------------------------
----------------------------------- * HORSE ITEMS *-------------------------------------
-- animationtype
-- [ "food" , "stimulant",  "brush" ] -- each type has its own anmimation

Horse.Consumables = {

    consumable_haycube = {
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 50,
        addstamina            = 50,
        addgooldstaminaInner  = 100,
        addgooldstaminaOutter = 100,
        addgoldhealthInner    = 100,
        addgoldhealthOutter   = 100,
        animationtype         = "food",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        TimesUsed             = 1,                       -- this item can have many uses for example a brush
        effects               = {
            stopEffect = false,                          -- to stop effect add duration in miliseconds
            addEffect = false,                           -- effect name
            effectName = "",                             -- effect name
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        },
        addexp                = 7,     -- syn horse experience
        WaitTime              = 60000, -- 1 minute untill it can be add xp again so folks dont spam this
    },
    -- brush will clean the horse coat
    horsebrush = {
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 10,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        animationtype         = "brush",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        TimesUsed             = 3,                       -- this item can have many uses for example a brush
        effects               = {
            stopEffect = false,                          -- to stop effect add duration in miliseconds
            addEffect = false,                           -- effect name
            effectName = "",                             -- effect name
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        },
        addexp                = 7,     -- syn horse experience
        WaitTime              = 60000, -- 1 minute untill it can be add xp again so folks dont spam this
    },
    stim = {
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addgooldstaminaInner  = 100,
        addgooldstaminaOutter = 100,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        animationtype         = "stimulant",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        TimesUsed             = 1,                       -- this item can have many uses for example a brush
        effects               = {
            stopEffect = false,                          -- to stop effect add duration in miliseconds
            addEffect = false,                           -- effect name
            effectName = "",                             -- effect name
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        },
        addexp                = 7,     -- syn horse experience
        WaitTime              = 60000, -- 1 minute untill it can be add xp again so folks dont spam this
    },


}

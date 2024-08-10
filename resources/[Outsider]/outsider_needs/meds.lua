Meds = {}

---------------------------------------------------------------------------------------
----------------------------------- * MEDICAL ITEMS *----------------------------------
-- types of animation

--[ "syringe" "pill" "potion", "bandage" ] -- each type has its own anmimation

Meds.Consumables = {

    syringe = {

        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 0,
        addthirst             = 0,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 20,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        animationtype         = "syringe",                 -- with different animation
        description           = "Provided by Jack&Jill",   -- provide a custom description for this item
        model                 = "mp007_p_mp_syringe01x_1", -- model name
        TimesUsed             = 1,                         -- how many times can item be used you can create packs of items for example
        amountToCool          = 0,                         -- how much to cool down the player
        cooldown              = 0,                         -- how long to wait before using the item again
        amountToWarm          = 5,                         -- how much to warm up the player
        warmup                = 30,                        -- duration seconds
        requiredItem          = false,                     -- required item to use this item can be table requiredItem = {"itemname"}
        removeRequiredItem    = false,                     -- should it remove the required item after use ?
        removeStress          = 0,
        removeAddiction       = 0,
        effects               = {
            stopEffect = false, -- to stop effect add duration in miliseconds or leave false
            addEffect = false,  -- effect name
            effectName = "",    -- effect name
        },
        sounds                = {
            addSound = false, -- if enabled it will play the sound bellow sound when using the item
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        }
    },
    bandage = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 0,
        addthirst             = 0,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 20,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        animationtype         = "bandage",               -- with different animation
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        model                 = "p_cs_bandage01x",       -- model name
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 5,
        warmup                = 30,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        removeStress          = 0,
        removeAddiction       = 0,
        effects               = {
            stopEffect = false, -- to stop effect add duration in miliseconds
            addEffect = false,  -- effect name
            effectName = "",    -- effect name
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        }
    },
    herbalremedy = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 0,
        addthirst             = 0,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 20,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        animationtype         = "potion",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        model                 = "s_rc_poisonedwater01x", -- model name
        --  make player dizzy when using this item
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 5,
        warmup                = 30,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        removeStress          = 0,
        removeAddiction       = 0,
        effects               = {
            stopEffect = false, -- to stop effect add duration in miliseconds
            addEffect = false,  -- effect name
            effectName = "",    -- effect name
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        }
    },
    antibiotics = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 0,
        addthirst             = 0,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 20,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        animationtype         = "pill",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        model                 = "s_rc_poisonedwater01x", -- model name
        --  make player dizzy when using this item
        TimesUsed             = 10,                      -- this counts as if it s a box of 10 pills
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 5,
        warmup                = 30,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        removeStress          = 0,
        removeAddiction       = 50,
        effects               = {
            stopEffect = false, -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "",
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        }
    },

}

Smokes = {}

-----------------------------------------------------------------------------------------
----------------------------------- * SMOKES ITEMS *-------------------------------------
-- animationtype
-- [ "cigarette" , "cigar", "pipe", "chewingtobacco","peacepipe" ] -- each type has its own anmimation

Smokes.Consumables = {

    cigarette = {
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
        animationtype         = "cigarette",
        description           = "",    -- provide a custom description for this item
        TimesUsed             = 10,
        requiredItem          = false, -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addAddiction          = 10,    -- max is 100
        removeStress          = 0,
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
    cigar = {
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
        animationtype         = "cigar",
        description           = "",    -- provide a custom description for this item
        TimesUsed             = 1,
        requiredItem          = false, -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addAddiction          = 2,     -- max is 100
        removeStress          = 0,
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
    pipe = {
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
        animationtype         = "pipe",
        description           = "Jack&Jill Cigarette pack", -- provide a custom description for this item
        TimesUsed             = 1,
        requiredItem          = false,                      -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false,                      -- should it remove the required item after use ?
        addAddiction          = 50,                         -- max is 100
        removeStress          = 0,
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
    chewtobaco = {
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
        animationtype         = "chewingtobacco",
        description           = "",    -- provide a custom description for this item
        TimesUsed             = 10,
        requiredItem          = false, -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addAddiction          = 10,    -- max is 100
        removeStress          = 0,
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

    peacepipe = {
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
        animationtype         = "peacepipe",
        description           = "",    -- provide a custom description for this item
        TimesUsed             = 1,
        requiredItem          = false, -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addAddiction          = 2,     -- max is 100
        removeStress          = 0,
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

}

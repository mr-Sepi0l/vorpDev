Drinks = {}

----------------------------------------------------------------------------------------
----------------------------------- * DRINK ITEMS *-------------------------------------
-- types of animation
-- [  "mug" "flask" "bottle" "potion" "fastdrink", "champagne" ] -- each type has its own anmimation


Drinks.Consumables = {

    --ITEM NAME--
    water             = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 10,
        addhunger             = 0,
        addthirst             = 10,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 20,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "drink",
        animationtype         = "champagne",
        description           = "", -- provide a custom description for this item
        model                 = "s_champagne_gold",
        Drunk                 = true,
        DrunkEffect           = "MP_Downed",
        UseDrunkEffect        = false,
        DrunkDuration         = 20,   -- in seconds  20 seconds player will be drunk? the more you drink the more will add 2 drinks will be 40 seconds
        Drunkness             = 0.20, -- 0,20 slight drunk 0.50 medium 1.0 very drunk
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 5,
        warmup                = 30,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,
        removeAddiction       = 0,
        removeStress          = 0,
        effects               = {
            stopEffect = false,             -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "PlayerOverpower", -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up", --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        }
    },
    consumable_coffee = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 10,
        addhunger             = 0,
        addthirst             = 10,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 20,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "drink",
        animationtype         = "mug",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        model                 = "p_mugCoffee01x",
        Drunk                 = false,
        DrunkEffect           = "MP_Downed",
        UseDrunkEffect        = false,
        DrunkDuration         = 0,
        Drunkness             = 0.20, -- 0,20 slight drunk 0.50 medium 1.0 very drunk
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 5,
        warmup                = 30,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,
        removeAddiction       = 0,
        removeStress          = 0,
        effects               = {
            stopEffect = false,             -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "PlayerOverpower", -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up", --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        }
    },

    --[[  water                   = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 100,
        addhunger             = 0,
        addthirst             = 50,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "drink",
        animationtype         = "fastdrink",
        description           = "Provided by Jack Jill", -- provide a custom description for this item
        model                 = "s_inv_moonshine01x",
        Drunk                 = false,
        DrunkEffect           = "MP_Downed",
        UseDrunkEffect        = false,
        DrunkDuration         = 0,
        TimesUsed             = 3,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 5,
        warmup                = 30,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,     -- max is 100
        removeAddiction       = 0,
        removeStress          = 50,
        effects               = {
            stopEffect = false, -- to stop effect add duration in miliseconds
            addEffect = false,  -- effect name
            effectName = "",    -- effect name
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",
            soundRef = "Consumption_Sounds"
        },
    }, ]]
    antipoison              = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 50, -- heal this will add to outter or inner depending of players health
        addstamina            = 0,
        addhunger             = 0,
        addthirst             = 5,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 50,
        Type                  = "drink",
        animationtype         = "potion",                -- this type usefull for healing  or gold cores
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        model                 = "s_rc_poisonedwater01x", -- not all models will be positioned correctly
        Drunk                 = false,
        DrunkEffect           = "MP_Downed",             -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = false,
        Drunkness             = 0.20,                    -- 0,20 slight drunk 0.50 medium 1.0 very drunk
        DrunkDuration         = 0,
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 0,
        warmup                = 0,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,
        removeAddiction       = 0,
        removeStress          = 0,
        effects               = {
            stopEffect = false,             -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "PlayerOverpower", -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up", --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        }
    },
    unique_ayahuasca_diablo = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 0,
        addthirst             = 40,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 50,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "drink",
        animationtype         = "bottle",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        model                 = "p_bottlebeer01a",       -- in here you ca nadd diverese models not all work
        Drunk                 = true,
        DrunkEffect           = "MP_Downed",             -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = true,
        Drunkness             = 0.20,                    -- 0,20 slight drunk 0.50 medium 1.0 very drunk
        DrunkDuration         = 60,                      -- seconds
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 3,
        warmup                = 60,    -- seconds
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,     -- max is 100
        removeAddiction       = 0,
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
    vodka                   = {
        removethirst          = 0,
        removehunger          = 5, -- remove hunger when drinking alcohol?
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 0,
        addthirst             = 20,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "drink",
        animationtype         = "flask",
        description           = "Provided by Jack&Jill", -- provide a custom description for this item
        model                 = "",                      -- flask no need model already has builtin animation
        Drunk                 = true,
        DrunkEffect           = "MP_Downed",             -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = true,
        Drunkness             = 0.60,                    -- 0,20 slight drunk 0.50 medium 1.0 very drunk
        DrunkDuration         = 20,                      --seconds
        TimesUsed             = 3,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 5,
        warmup                = 30,
        requiredItem          = false,
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,     -- max is 100
        removeAddiction       = 0,
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

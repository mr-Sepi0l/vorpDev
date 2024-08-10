Eats = {}

---------------------------------------------------------------------------------------
----------------------------------- * FOOD ITEMS *-------------------------------------
-- types of animation
--  [ "hand" "sandwich" "bowl" "canned" "berry" ] each type has its own anmimation
--  if you add gold core  they already have sounds and effects, same for health remove and stamina.
-- gold options are in duration

Eats.Consumables = {


    mashapple = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 10,
        addstamina            = 0,
        addhunger             = 15,
        addthirst             = 0,
        addgooldstaminaInner  = 0,                   -- duration
        addgooldstaminaOutter = 0,                   -- duration
        addgoldhealthInner    = 0,                   -- duration
        addgoldhealthOutter   = 0,                   -- duration
        Type                  = "eat",
        animationtype         = "sandwich",          -- check the top to see more animations
        description           = "",                  -- provide a custom description for this item
        model                 = "s_bit_bread06",     -- not all models will be positioned correctly
        Drunk                 = false,               -- if you want to get drunk from this item
        DrunkEffect           = "MP_Downed",         -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = false,               -- if you want to use the drunk effect or set false
        Drunkness             = 0.0,                 -- drunkness starting level  0.20 is light drunk the more they drink the more drunk they get or set to 1.0 max drunk effect
        DrunkDuration         = 0,                   -- in seconds -- how long the drunk effect will last
        TimesUsed             = 1,                   -- how many times can this item be used
        amountToCool          = 0,                   -- a number to cool the player down
        cooldown              = 0,                   -- duration it should last to cool down in seconds
        amountToWarm          = 0,                   -- a number to warm the player up for cold weathers  or hot food
        warmup                = 0,                   -- duration it should last to warm up in seconds
        requiredItem          = false,               -- does it require an extra item to use this ? like a spoon ? its a table {"itemname", "itemname2"} or just "itemname"
        removeRequiredItem    = false,               -- should it remove the required item after use ?
        addStress             = 0,                   -- should this item add stress to player ? max is 100
        addAddiction          = 0,                   --  should this item add addiction to player ? max is 100
        removeAddiction       = 0,                   -- should this item remove addiction to player ? max is 100
        removeStress          = 0,                   -- should this item remove stress to player ? max is 100
        effects               = {
            stopEffect = false,                      -- to stop effect add duration in miliseconds or leave false if the effect stops by it self
            addEffect = false,
            effectName = "PlayerOverpower",          -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",     --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        },
    },
    apple = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 8,
        addthirst             = 8,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "eat",
        animationtype         = "hand",               -- types for eat [ hand sandwich bowl canned berry ]
        description           = "",                   -- provide a custom description for this item
        model                 = "s_bit_apple01x",     -- not all models will be positioned correctly
        Drunk                 = false,
        DrunkEffect           = "MP_Downed",          -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = false,
        Drunkness             = 0.0,
        DrunkDuration         = 0,
        TimesUsed             = 1,
        amountToCool          = 100,
        cooldown              = 60,
        amountToWarm          = 0,
        warmup                = 0,
        requiredItem          = false,
        removeRequiredItem    = false,     -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,
        removeAddiction       = 0,
        removeStress          = 0,
        effects               = {
            stopEffect = false,                 -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "PlayerOverpower",     -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",     --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        },
        -- give item back NEW FEATURE
        giveItemBack          = true,     -- should it give the item back after use ? like a bowl or spoon
        itemsToGive           = {
            appleseeds = 2,               -- item name and ammount
        }

    },
    consumable_fruitsalad = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 20,
        addstamina            = 0,
        addhunger             = 30,
        addthirst             = 0,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "eat",
        animationtype         = "canned",                -- types for eat [ hand sandwich bowl canned berry ]
        description           = "",                      -- provide a custom description for this item
        model                 = "s_canpineapple01x",     -- not all models will be positioned correctly
        Drunk                 = false,
        DrunkEffect           = "MP_Downed",             -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = false,
        Drunkness             = 0.0,
        DrunkDuration         = 0,
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 0,
        warmup                = 0,
        requiredItem          = false,
        removeRequiredItem    = false,     -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,
        removeAddiction       = 0,
        removeStress          = 0,
        effects               = {
            stopEffect = false,                 -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "PlayerOverpower",     -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",     --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        }
    },
    knotmeat = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 0,
        addstamina            = 0,
        addhunger             = 50,
        addthirst             = 0,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "eat",
        animationtype         = "bowl",
        description           = "",              -- provide a custom description for this item
        model                 = "",              -- bowl do not need object
        Drunk                 = false,
        DrunkEffect           = "MP_Downed",     -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = false,
        Drunkness             = 0.0,
        DrunkDuration         = 0,
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 10,        -- can be used as spicy food
        warmup                = 0,         -- how long should the hot last
        requiredItem          = false,     -- you can require a spoon in order to eat from a bowl leave false if you dont want
        removeRequiredItem    = false,     -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,
        removeAddiction       = 0,
        removeStress          = 0,
        effects               = {
            stopEffect = false,                 -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "PlayerOverpower",     -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",     --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        }
    },
    consumable_chocolate = {
        removethirst          = 0,
        removehunger          = 0,
        removestamina         = 0,
        removehealth          = 0,
        addhealth             = 10,
        addstamina            = 0,
        addhunger             = 8,
        addthirst             = 0,
        addgooldstaminaInner  = 0,
        addgooldstaminaOutter = 0,
        addgoldhealthInner    = 0,
        addgoldhealthOutter   = 0,
        Type                  = "eat",
        animationtype         = "berry",
        description           = "",                        -- provide a custom description for this item
        model                 = "s_inv_raspberry01bx",     -- berries no need for model
        Drunk                 = false,
        DrunkEffect           = "MP_Downed",               -- play a light effect only when you too drunk it will increase
        UseDrunkEffect        = false,
        Drunkness             = 0.0,
        DrunkDuration         = 0,
        TimesUsed             = 1,
        amountToCool          = 0,
        cooldown              = 0,
        amountToWarm          = 0,
        warmup                = 0,
        requiredItem          = false,
        removeRequiredItem    = false,     -- should it remove the required item after use ?
        addStress             = 0,
        addAddiction          = 0,
        removeAddiction       = 0,
        removeStress          = 0,
        effects               = {
            stopEffect = false,                 -- to stop effect add duration in miliseconds
            addEffect = false,
            effectName = "PlayerOverpower",     -- effect name example this one will do goldcore effect you can find more in rdr3 discoveries github
        },
        sounds                = {
            addSound = false,
            soundName = "Core_Fill_Up",     --  you can find more in rdr3 discoveries github
            soundRef = "Consumption_Sounds"
        }
    },

}

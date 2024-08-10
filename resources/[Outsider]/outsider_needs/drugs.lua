Drugs = {}
----------------------------------------------------------------------------------------
----------------------------------- * DRUGS ITEMS *-------------------------------------
-- animationtype
--[ "inject" , "peyote", "smoke" ] -- each type has its own anmimation
-- effects are already set for each aniamtion

Drugs.Consumables = {

    opium = { -- item name
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
        animationtype         = "inject",
        description           = "",    -- provide a custom description for this item
        TimesUsed             = 1,
        requiredItem          = false, -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addAddiction          = 0,     -- max is 100
        removeStress          = 0,

    },

    peyote = {
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
        animationtype         = "peyote",
        description           = "",    -- provide a custom description for this item
        TimesUsed             = 1,
        requiredItem          = false, -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addAddiction          = 30,    -- max is 100
        removeStress          = 0,

    },

    hemp = {
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
        animationtype         = "smoke",
        description           = "",    -- provide a custom description for this item
        TimesUsed             = 1,
        requiredItem          = false, -- like matches or a lighter {"itemname",add more}
        removeRequiredItem    = false, -- should it remove the required item after use ?
        addAddiction          = 10,    -- max is 100
        removeStress          = 0,

    },

}

-- here you can create your own custom animations for items follow the items.lua explanation
-- event name must be same as in your items.lua custom functrion
---@param value table is the values of the item you used
RegisterNetEvent('outsider:needs:CustomFunction', function(value)
    local stressRemove = value.removeStress
    local addThirst = value.addThirst
    -- etc , the values here is what you set for your items in items.lua



    -- get functions you can use them anywhere in this file
    local currentHunger = GetCurrentHunger()
    local currentThirst = GetCurrentThirst()
    local currentStress = GetCurrentStress()
    local currentAddiction = GetCurrentAddiction()
    local currentStressLevel = GetCurrentStressLevel()
    local currentAddictionLevel = GetCurrentAddictionLevel()
     local BodyTemp = GetCurrentBodyTemp()
    -- print(BodyTemp.cool, BodyTemp.hot)
    -- set functions
    -- RemoveThirst(value)
    -- RemoveHunger(value)
    --  RemoveStress(value)
    --  RemoveAddiction(value)
    --  AddStress(value)
    --  AddAddiction(value)
    --  AddThirst(value)
    -- AddHunger(value)
    --SetBodyTemp({ cool = 0, hot = 0 }) -- this is incremental only add or remove wat you want if you add 4 and cool is 10 then it will be 14
end)

-- IF THIS IS ENABLED YOU NEED TO ADD YOUR OWN LOGIC IF YOU KNOW WHAT YOU ARE DOING.
-- EXAMPLE
--[[
CreateThread(function()
    while Config.Stress.usestress do -- you must put it to true in config.lua
        Wait(1000)                   -- every second

        local currentStress = GetCurrentStress()
        print(currentStress) -- print current stress
        if currentStress >= 100 then
            -- add effects ? add animation ? add sound ? add something
        elseif currentStress <= 50 then

        elseif currentStress <= 25 then

        end
    end
end)
]]

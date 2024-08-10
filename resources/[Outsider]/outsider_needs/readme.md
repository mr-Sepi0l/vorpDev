## Instalation

- ensure the script in your resources.cfg or server.cfg
- make sure is below vorp inventory and core

## Developers

#### SETTERS 

- CLIENT

```lua
-- data only define what you want
local data = {
    AddThirst = 10,
    AddHunger = 10,
    AddStress = 10,
    AddAddiction = 10,
    RemoveThirst = 10,
    RemoveHunger = 10,
    RemoveStress = 10,
    RemoveAddiction = 10,
    SetBodyTemp = { cool = 10, hot = 10 }
}
```

```lua
-- from client use export
exports.outsider_needs:SetData(data)
```

- SERVER

```lua
-- from server use callback
Core.Callback.TriggerAwait("outsider_needs:SetData",source,data)
```

#### GETTERS

- CLIENT 

```lua
-- use export from client
local result = exports.outsider_needs:GetData()
print(json.encode(result,{ident = true}))
```

- SERVER

```lua
--- from server use callback
 local data = Core.Callback.TriggerAwait("Outsider_Needs:GetData", source)
 print(json.encode(data {ident = true}))
```


### custom client file within this script 

- you have this functions available client side

```lua
-- GETTERS

local currentHunger = GetCurrentHunger()
local currentThirst = GetCurrentThirst()
local currentStress = GetCurrentStress()
local currentAddiction = GetCurrentAddiction()
local currentStressLevel = GetCurrentStressLevel()
local currentAddictionLevel = GetCurrentAddictionLevel()
local BodyTemp = GetCurrentBodyTemp()
print(BodyTemp.cool, BodyTemp.hot)


    --SETTERS
RemoveThirst(value)
RemoveHunger(value)
RemoveStress(value)
RemoveAddiction(value)
AddStress(value)
AddAddiction(value)
AddThirst(value)
AddHunger(value)
SetBodyTemp({ cool = 0, hot = 0 }) -- this is incremental only add or remove wat you want if you add 4 and cool is 10 then it will be 14
```

### EXAMPLES 

- EXTRA

```lua

-------- give item back after use --------
-- add this to each item if you want an item to give back another item after use like eating an apple can get appleseeds

giveItemBack          = true, -- should it give the item back after use ?
itemsToGive           = {
   appleseeds = 1,            -- item name and ammount
}
-- just put in the item config
```
- CUSTOM ITEMS

```lua
------ custom items ------
-- add this to any item, if this is enabled then it wont do any animations or effects or add any value to needs, you must do that your self.
-- this is for developers only
-- this is server side only

    -- define this in the item config
    customFunction = function(source, value)
       -- value is the values you set for the item like addhealth = 10  etc
       -- source is the player source to go to

       -- must trigger to the custom_client.lua that exsts in this script
       TriggerClientEvent('outsider:needs:CustomFunction',source, value) -- to a client side file
    end

    --CLIENT
    RegisterNetEvent('outsider:needs:CustomFunction',function( value)
      -- play your animation here and add your values look in custom client for functions available
      AddThirst(value) -- example

    end)
 
 ```
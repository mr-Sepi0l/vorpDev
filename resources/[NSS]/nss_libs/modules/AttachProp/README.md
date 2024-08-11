# nss_libs - AttachProp

This module let you de-/attach props to an entity (player). If the player drops the attached props will be deleted.

## How to use

### client.lua

Listen clients from the server.

```lua
-- Gets the attach-prop api.
---@type NssLibsAttachPropClientApi
attach_prop_api = exports.nss_libs:getAttachPropClientApi(GetCurrentResourceName())

-- You can clear all attached props before you attach new ones, see the following methods:
attach_prop_api.detachOnlyAllKnown() -- Detaches all known props (attached via this api before, not awaitable).
attach_prop_api.detachOnlyAllScenario() -- Detaches all possible scenario props.
attach_prop_api.detachAll() -- Detaches all props known and possible scenario props.

-- If you want to await the detach process is finished on all affected clients then you can use the following methods:
attach_prop_api.awaitAttachOnlyAllScenario()
attach_prop_api.awaitAttachAll()  
-- This is useful if you want to ensure the detach process is finished before you attach the new prop.
-- The timeout is currently 250 milliseconds so if the process is not finished after this time the promise will be rejected.

-- Gather data to create a prop.
local prop_model_name = 'p_axe02x'
local pos = { x = 0.12, y = -0.5, z = -0.3 }
local rot = { x = 62.0, y = 0, z = 180.0 }
local bone_id = 6286 -- See https://github.com/femga/rdr3_discoveries/tree/master/boneNames for available bones (consider male/female!)

-- Create the prop (not visible at this state!)
local prop = attach_prop_api.create(
        prop_model_name, 
        pos.x, pos.y, pos.z, 
        rot.x, rot.y, rot.z, 
        bone_id
)

-- Example to check if the prop is attached.
Citizen.CreateThread(function()
    
    while true do

        if prop.isAttached() then
            print('Prop is attached!')
        else
            print('Prop is not attached!')
        end
        
        Citizen.Wait(1000)
    end
end)

-- Attach the prop to the player (visible now!)
prop.attach()

-- Wait for demonstration purpose.
Citizen.Wait(5000)

-- Detach the prop from the player (not visible now!)
prop.detach()
```

## Things to know

- If a resource stops the owned props will be deleted automatically.
- If the nss_libs stops all props created with this module will be deleted automatically.
- If the player drops the props will be deleted automatically (on all clients).
- If the player dies the previously attached props will be deleted automatically (on all clients).
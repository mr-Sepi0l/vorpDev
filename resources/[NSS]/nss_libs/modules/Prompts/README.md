# nss_libs - Prompts

Create easy to use prompts for your REDM resource.

## Example

__Notes__

- The order of created prompts is the order of showing them (top to bottom).
- If you show multiple groups at the same time then pages/tabs are created automatically.
- If you use multiple keys per prompt then hold/hold complete modes are not supported.
- Consider how many pages/tabs are able to shown at the same time by the client.
- Consider how many prompts per page/tab are able to shown at the same time by the client.
- If your resource stops or restarts all groups and prompts are automatically destroyed.
- Per default prompt groups are not shown during the player is dead. You can change this with `showOnDeath()`.

```lua
------------------------------------------------------------------------------
-- Step 1: Get Prompts API
------------------------------------------------------------------------------

---@type NssLibsPromptsApi
local prompts_api = exports.nss_libs:getPromptsApi(GetCurrentResourceName())

------------------------------------------------------------------------------
-- Step 2: Create a group (page/tab) of prompts
------------------------------------------------------------------------------

---@type NssLibsPromptsGroupApi
local group = prompts_api.createGroup('GROUP_LABEL')

------------------------------------------------------------------------------
-- Step 3A: Create Prompt with one key
------------------------------------------------------------------------------

local SPACEBAR = 0xD9D0E1C0

---@type NssLibsPromptsPromptApi
local prompt_spacebar = group.addJustPressedPrompt('PROMPT_LABEL', SPACEBAR, function()
    print('Spacebar just pressed')
    -- DO YOUR STUFF HERE
end)

------------------------------------------------------------------------------
-- Step 3B: Create Prompt with multiple keys
------------------------------------------------------------------------------

local KEY_LEFT = 0xA65EBAB4
local KEY_RIGHT = 0xDEB34313

---@type NssLibsPromptsPromptApi
local prompt_left_right = group.addJustPressedPrompt('PROMPT_LABEL', KEY_LEFT, function()
    print('Left just pressed')
    -- DO YOUR STUFF HERE
end)

prompt_left_right:addKey(KEY_RIGHT, function()
    print('Right just pressed')
    -- DO YOUR STUFF HERE
end)

------------------------------------------------------------------------------
-- Step 3C: Create Prompt with on-press and on-release callbacks
------------------------------------------------------------------------------

-- This example works only with addJustPressedPrompt, addPressedPrompt,
-- addStandardHoldPrompt, addStandardizedHoldPrompt and only safe for single key prompts.

local KEY_DOWN = 0x05CA7C52

local on_press = function()
    print('Down key pressed')
    -- DO YOUR STUFF HERE
end

local on_release = function()
    print('Down key released')
    -- DO YOUR STUFF HERE
end

---@type NssLibsPromptsPromptApi
local prompt_down = group.addJustPressedPrompt('PROMPT_LABEL', KEY_DOWN, on_press, on_release)

------------------------------------------------------------------------------
-- Step 4: Show the group ;)
------------------------------------------------------------------------------
group.show()
```

-------------------------------------------------------------------------------

## Methods

### `exports.nss_libs:getPromptsApi(resource_name)`

Returns a prompts API `NssLibsPromptsApi` for the given resource.

- `resource_name` - The name of the resource that wants to use the API.

### `NssLibsPromptsApi`

#### `.createGroup(label)`

Returns a group API `NssLibsPromptsGroupApi`.

- `label` - The label of the group.

#### `.setLinkChunkModeNearest()`

Affects only `NssLibsPromptsGroupApi.linkToCoords`.

Sets the reaction mode for chunk grid linked prompt groups to `nearest`. Only the nearest result will be shown.

Returns `NssLibsPromptsApi`.

#### `.setLinkChunkModeAll()`

Affects only `NssLibsPromptsGroupApi.linkToCoords`.

Sets the reaction mode for chunk grid linked prompt groups to `all`. All results will be shown.

This is the default mode.

Returns `NssLibsPromptsApi`.

#### `colors` (_table_)

Table of color functions. Each function has an optional `str` attribute. If `str` is not given only the color code will
be returned.

- `colors.Red(str)`
- `colors.Yellow(str)`
- `colors.Orange(str)`
- `colors.Grey(str)`
- `colors.White(str)`
- `colors.LightGrey(str)`
- `colors.Black(str)`
- `colors.Pink(str)`
- `colors.Blue(str)`
- `colors.Purple(str)`
- `colors.LightBlue(str)`
- `colors.Yellow(str)`
- `colors.LightPink(str)`
- `colors.Green(str)`
- `colors.DarkBlue(str)`
- `colors.LightRedIsh(str)`

-------------------------------------------------------------------------------

### `NssLibsPromptsGroupApi`

#### `.addJustPressedPrompt(label, key, callback, release_callback)`

Returns a prompt API `NssLibsPromptsPromptApi`. Calls the callback if the key is just pressed.

- `label` - The label of the prompt.
- `key` - The key of the prompt (see [key names and hashes] or [named keys](#named-keys))
- `callback` - The callback of the prompt.
- `release_callback` (_optional_) - Change the behaviour: If set then the `callback` will be fired if key is pressed
  like an _on press event_ and `release_callback` is fired if key is released.

#### `.addJustReleasedPrompt(label, key, callback)`

Like `addJustPressedPrompt` but executes the callback if the key is just released.

#### `.addPressedPrompt(label, key, callback, release_callback)`

Like `addJustPressedPrompt` but executes the callback if the key is pressed.

#### `.addReleasedPrompt(label, key, callback)`

Like `addJustPressedPrompt` but executes the callback if the key is released.

#### `.addStandardHoldPrompt(label, key, callback, release_callback)`

Like `addJustPressedPrompt` but executes the callback repeatedly while the button has been pressed since the start
pressing if no `release_callback` is set.

If the `release_callback` is set then the `callback` will be fired only once after the button indicator is filled (like
a press event with delay to prevent press by mistake). If you want this behaviour and do not want to use
the `release_callback` for actions then use an empty function for `release_callback`, see example:

```lua
---------------------------------------------------------------------------------------------
-- Delayed press event example
---------------------------------------------------------------------------------------------

local SPACEBAR = 0xD9D0E1C0

local callback = function()
    print('Spacebar pressed after delay')
    -- DO YOUR STUFF HERE
end

local release_callback = function()
    -- Do nothing
end

---@type NssLibsPromptsPromptApi
local prompt_spacebar = group.addStandardHoldPrompt('PROMPT_LABEL', SPACEBAR, callback, release_callback)
```

**Important** If you use multiple keys per prompt then "hold"/"hold complete" modes are not supported.

#### `.addStandardizedHoldPrompt(label, key, callback, release_callback)`

Like `addJustPressedPrompt` but executes the callback if the key is standardized hold.

**Important** If you use multiple keys per prompt then "hold"/"hold complete" modes are not supported.

#### `.setLabel(label)`

Sets the label of the group.

- `label` - The label of the group.

#### `.show()`

Shows the group.

If multiple groups are shown at the same time then pages/tabs are created automatically.

#### `.hide()`

Hides the group.

#### `.destroy()`

Destroys the group and all it's prompts. This group is never usable again.

#### `.showOnDeath()`

Shows the group during the player is dead, too.

#### `.linkToCoords(x, y, z, radius)`

Add logic to show/hide prompt group if player reaches radius of given coords.

- `x` (_number_) - The x coordinate of the coords.
- `y` (_number_) - The y coordinate of the coords.
- `z` (_number_) - The z coordinate of the coords.
- `radius` (_number_) - The radius of the coords.

Returns `NssLibsPromptsLinkerGroupToCoordsApi`.

```lua
------------------------------------------------------------------------------
-- Step 1-3: Get API and create group and prompt
------------------------------------------------------------------------------
---@type NssLibsPromptsApi
local prompts_api = exports.nss_libs:getPromptsApi(GetCurrentResourceName())

---@type NssLibsPromptsGroupApi
local group = prompts_api.createGroup('GROUP_LABEL')

local SPACEBAR = 0xD9D0E1C0

---@type NssLibsPromptsPromptApi
local prompt_spacebar = group.addJustPressedPrompt('PROMPT_LABEL', SPACEBAR, function()
    print('Spacebar just pressed')
    -- DO YOUR STUFF HERE
end)

------------------------------------------------------------------------------
-- Step 4: Link to coords
------------------------------------------------------------------------------
local x = 0.0
local y = 0.0
local z = 0.0
local radius = 2.0

---@type NssLibsPromptsLinkerGroupToCoordsApi
local linker_api = group.linkToCoords(x, y, z, radius)

------------------------------------------------------------------------------
-- Step 5: Activate link
------------------------------------------------------------------------------
linker_api.activate()
```

#### `.linkToEntity(entity_id, radius, inject_entity_id_cb)`

Add logic to show/hide prompt group if player reaches radius of given entity.

- `entity_id` (_number_) - The entity id of the entity.
- `radius` (_number_) - The radius of the coords.
- `inject_entity_id_cb` (_function_, _optional_) - A callback that injects/returns the entity id each time the script
  checks the distance.

Returns `NssLibsPromptsLinkerGroupToCoordsApi`.

```lua
------------------------------------------------------------------------------
-- Step 1-3: Get API and create group and prompt
------------------------------------------------------------------------------
---@type NssLibsPromptsApi
local prompts_api = exports.nss_libs:getPromptsApi(GetCurrentResourceName())

---@type NssLibsPromptsGroupApi
local group = prompts_api.createGroup('GROUP_LABEL')

local SPACEBAR = 0xD9D0E1C0

---@type NssLibsPromptsPromptApi
local prompt_spacebar = group.addJustPressedPrompt('PROMPT_LABEL', SPACEBAR, function()
    print('Spacebar just pressed')
    -- DO YOUR STUFF HERE
end)

------------------------------------------------------------------------------
-- Step 4: Link to entity
------------------------------------------------------------------------------
local entity_id = 12 -- Example entity
local radius = 2.0

-- Optional callback
-- Sometimes entity ids changes because entity was out of sight, so this callback injects the current entity id.
local inject_entity_id_cb = function()
    -- You can inject the entity id here
    return 14 -- Example of changed entity id 
end

---@type NssLibsPromptsLinkerGroupToCoordsApi
local linker_api = group.linkToEntity(entity_id, radius, inject_entity_id_cb)

------------------------------------------------------------------------------
-- Step 5: Activate link
------------------------------------------------------------------------------
linker_api.activate()
```

#### `.linkToEntityModels(model_names_or_hashes, radius)`

Add logic to show/hide prompt group if player reaches radius of given entity.

- `model_names_or_hashes` (_number|string|table<string|number>_) - The model name(s) or hash(es) of the entity/entities.
- `radius` (_number_) - The radius of the coords.

Returns `NssLibsPromptsLinkerGroupToCoordsApi`.

```lua
------------------------------------------------------------------------------
-- Step 1-3: Get API and create group and prompt
------------------------------------------------------------------------------
---@type NssLibsPromptsApi
local prompts_api = exports.nss_libs:getPromptsApi(GetCurrentResourceName())

---@type NssLibsPromptsGroupApi
local group = prompts_api.createGroup('GROUP_LABEL')

local SPACEBAR = 0xD9D0E1C0

---@type NssLibsPromptsPromptApi
local prompt_spacebar = group.addJustPressedPrompt('PROMPT_LABEL', SPACEBAR, function()
    print('Spacebar just pressed')
    -- DO YOUR STUFF HERE
end)

------------------------------------------------------------------------------
-- Step 4: Link to entity models
------------------------------------------------------------------------------
local entity_herbs_model_hashes = { 477619010, 85102137, -1707502213 } -- Some bushes
local radius = 2.0

---@type NssLibsPromptsLinkerGroupToCoordsApi
local linker_api = group.linkToEntityModels(entity_herbs_model_hashes, radius)

------------------------------------------------------------------------------
-- Step 5: Activate link
------------------------------------------------------------------------------
linker_api.activate()
```

#### `.linkToPlayer(player_server_id, radius)` (_not working currently_)

Add logic to show/hide prompt group if player reaches radius of given player.

- `player_server_id` (_number_) - The server id of the player.
- `radius` (_number_) - The radius of the coords.

Returns `NssLibsPromptsLinkerGroupToCoordsApi`.

#### `.disable()` / `.enable()`

Disables/enables all prompts of the group.

Returns `NssLibsPromptsGroupApi`.

#### `.allowOnMount()` / `.forbidOnMount()`

Allows/forbids all prompts of the group to be shown while player is mounted.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.allowInWater()` / `.forbidInWater()`

Allows/forbids all prompts of the group to be shown while player is in water.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.allowInVehicle()` / `.forbidInVehicle()`

Allows/forbids all prompts of the group to be shown while player is in vehicle.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.allowOnFloor()` / `.forbidOnFloor()`

Allows/forbids all prompts of the group to be shown while player is on floor.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.allowInAir()` / `.forbidInAir()`

Allows/forbids all prompts of the group to be shown while player is in air.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.allowDuringDeath()` / `.forbidDuringDeath()`

Allows/forbids all prompts of the group to be shown while player is dead.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.allowDuringMovement()` / `.forbidDuringMovement()`

Allows/forbids all prompts of the group to be shown while player is moving.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.setMovementDetectionSensitivity(sensitivity_in_meters)`

- New since version 0.29.0
- `sensitivity_in_meters` (_float_) - The sensitivity in meters for movement measuring. Default is `0.005`.

> Note: The sensitivity is measured in all axis (x, y, z). So if the player stands in water or floats in the water then
> it is possible that a movement is detected if the player goes up and down by the waves of the water. In this case set
> the sensitivity to a higher value.

> Note: This affects __all__ current and future prompts of the group.

Returns `NssLibsPromptsGroupApi`.

```lua
group.forbidDuringMovement() -- Enables the prompts only on stand still
group.setMovementDetectionSensitivity(0.5) -- Set the movement sensitivity to 0.5 meters. If the player moves more than 0.5 meters in any direction then the prompts are disabled.
```

#### `.allowDuringHogtied()` / `.forbidDuringHogtied()`

Allows/forbids all prompts of the group to be shown while player is hogtied.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.setAllPromptsToStandardRestrictionsOnFoot()`

Set standard restrictions for all prompts of the group while player is on foot.

> Note: This affects only existing prompts during the call. If you add new prompts after the call then the new prompts
> are not affected by this call.

Returns `NssLibsPromptsGroupApi`.

#### `.showOnMovement()` / `.hideOnMovement()`

- New since version 0.30.0

Show (default) / hides the group if it is usually visible and the player moves.

> Note: This affects __all__ current and future prompts of the group.

Returns `NssLibsPromptsGroupApi`.

#### `.isHideOnMovement()`

- New since version 0.30.0

Returns `true` if the group should be hidden if it is usually visible but the player moves.

-------------------------------------------------------------------------------

### `NssLibsPromptsPromptApi`

#### `.addKey(key, callback, release_callback)`

Adds additional key to the prompt.

- `key` - The key of the prompt (see [key names and hashes] or [named keys](#named-keys))
- `callback` - The callback of the prompt.
- `release_callback` (_optional_) - Change the behaviour: If set then the `callback` will be fired if key is pressed
  line an _on press event_ and `release_callback` is fired if key is released. Works only for specific prompt types,
  see `NssLibsPromptsGroupApi` for more information.

**Important** If you use multiple keys per prompt then hold/hold complete modes are not supported.

Returns `NssLibsPromptsPromptApi`.

#### `.setLabel(label)`

Sets the label of the prompt.

- `label` - The label of the prompt.

Returns `NssLibsPromptsPromptApi`.

#### `.enable()`

Enables the prompt. This is the default state.

Returns `NssLibsPromptsPromptApi`.

#### `.disable()`

Disables the prompt.

Returns `NssLibsPromptsPromptApi`.

#### `.show()`

Shows the prompt. This is the default state.

Returns `NssLibsPromptsPromptApi`.

#### `.hide()`

Hides the prompt.

Returns `NssLibsPromptsPromptApi`.

#### `.destroy()`

Destroys the prompt. This prompt is never usable again.

#### `.allowOnMount()` / `.forbidOnMount()`

Allows/forbids the prompt to be shown while player is mounted.

Returns `NssLibsPromptsPromptApi`.

#### `.allowInWater()` / `.forbidInWater()`

Allows/forbids the prompt to be shown while player is in water.

Returns `NssLibsPromptsPromptApi`.

#### `.allowInVehicle()` / `.forbidInVehicle()`

Allows/forbids the prompt to be shown while player is in vehicle.

Returns `NssLibsPromptsPromptApi`.

#### `.allowOnFloor()` / `.forbidOnFloor()`

Allows/forbids the prompt to be shown while player is on floor.

Returns `NssLibsPromptsPromptApi`.

#### `.allowInAir()` / `.forbidInAir()`

Allows/forbids the prompt to be shown while player is in air.

Returns `NssLibsPromptsPromptApi`.

#### `.allowDuringDeath()` / `.forbidDuringDeath()`

Allows/forbids the prompt to be shown while player is dead.

Returns `NssLibsPromptsPromptApi`.

#### `.allowDuringMovement()` / `.forbidDuringMovement()`

Allows/forbids the prompt to be shown while player is moving.

Returns `NssLibsPromptsPromptApi`.

#### `.allowDuringHogtied()` / `.forbidDuringHogtied()`

Allows/forbids the prompt to be shown while player is hogtied.

Returns `NssLibsPromptsPromptApi`.

-------------------------------------------------------------------------------

### `NssLibsPromptsLinkerGroupToCoordsApi`

#### `.activate()`

Activates the linker.

Returns `NssLibsPromptsLinkerGroupToCoordsApi`.

#### `.deactivate()`

Deactivates the linker. This is the default state.

Returns `NssLibsPromptsLinkerGroupToCoordsApi`.

#### `.isActive()`

Returns `true` if the linker is active.

#### `.destroy()`

Destroy (removes) the link between group and coords.

-------------------------------------------------------------------------------

## Named keys

Instead of key hashes you can use key names since version `v0.26.1` of `nss_libs`. The following key names are
available:

- All alphabetical characters except ~~`K`~~, ~~`N`~~, ~~`T`~~, ~~`Y`~~, ~~`Ü`~~, ~~`Ö`~~, ~~`Ä`~~, and ~~`ß`~~
- `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`
- `RIGHTBRACKET`, `LEFTBRACKET`
- `MOUSE1`, `MOUSE2`, `MOUSE3`, `MWUP`
- `CTRL`, `TAB`, `SHIFT`, `LALT`
- `SPACEBAR`, `ENTER`, `BACKSPACE`, `DEL`
- `PGUP`, `PGDN`
- `F1`, `F4`, `F6`
- `DOWN`, `UP`, `LEFT`, `RIGHT`

Note: Sometimes keys not working as expected. This is a limitation of the game. In other cases the keys are used by
other resources.

-------------------------------------------------------------------------------

## Dev notes

- `UiPromptHasHoldModeCompleted` is currently tricky. It fires during the hold mode is fulfilled. But this is not so
  good if we have to check if the hold mode is fulfilled and when it was released after hold. So two callbacks, one
  for "hold started" and one for "hold stopped", are good.

-------------------------------------------------------------------------------

[key names and hashes]: https://github.com/mja00/redm-shit/blob/master/nuiweaponspawner/config.lua
# nss_libs - NPC

Easy to create Non-Player-Character (NPC) for your REDM resource.

## Example

```lua
------------------------------------------------------------------------------
-- Step 1: Get API
------------------------------------------------------------------------------

---@type NssLibsNpcApi
local npc_api = exports.nss_libs:getNpcApi(GetCurrentResourceName())

------------------------------------------------------------------------------
-- Step 2: Create NPC object
------------------------------------------------------------------------------

local model_name = 'S_M_M_NBXRIVERBOATDEALERS_01'
local outfit = 0 -- nil/false = random outfit
local x = 0
local y = 0
local z = 0
local heading = 180

---@type NssLibsNpcEntityApi
local npc = npc_api.create(model_name, x, y, z, heading, outfit)

------------------------------------------------------------------------------
-- Step 3: Configure NPC object
------------------------------------------------------------------------------

npc.setScale(1)
   .setScenario('WORLD_HUMAN_WRITE_NOTEBOOK')
   .setWeapon('weapon_shotgun_semiauto')
   .addAnimation(
        'amb_camp@prop_camp_butcher@resting@rabbit@male_a@idle_a',
        'idle_c',
        10000, -- delay/duration until next animation
        true, -- looping
        1, -- times to play
        npc.ANIMATE_ONLY_UPPER_BODY) -- animate only upper body
   .addAnimation(
        'amb_camp@prop_camp_butcher@resting@rabbit@male_a@idle_a',
        'idle_b',
        3000, -- delay/duration until next animation
        false, -- no looping
        3, -- play 3 times with a delay of 3000ms
        npc.ANIMATE_FULL_BODY) -- animate full body
   .addTimeWindow(8, 0, 12, 0) -- visible from 8:00 to 12:00 in-game-time
   .addTimeWindow(14, 0, 20, 0) -- visible from 14:00 to 20:00 in-game-time

------------------------------------------------------------------------------
-- Step 4: Show NPC
------------------------------------------------------------------------------

-- With performance mode to prevent too much entities
local spawn_radius = 20 -- in meters
npc.startRangeCheck(spawn_radius)

-- Without performance mode
npc.show()
```

-------------------------------------------------------------------------------

## Methods

### `exports.nss_libs:getNpcApi(resource_name)`

Returns the NPC api `NssLibsNpcApi` for the given resource.

- `resource_name` _(string)_ - The name of the resource that wants to use the API.

-------------------------------------------------------------------------------

### `NssLibsNpcApi`

#### `.create(model, x, y, z, heading, outfit)`

Returns a NPC entity api `NssLibsNpcEntityApi`.

- `model` _(string)_ - The model of the NPC entity.
- `x` _(number)_ - The x position of the NPC entity.
- `y` _(number)_ - The y position of the NPC entity.
- `z` _(number)_ - The z position of the NPC entity.
- `heading` _(number)_ - The heading of the NPC entity.
- `outfit` _(optional, number)_ - The outfit of the NPC entity. If nil or false, a random outfit will be used.

-------------------------------------------------------------------------------

### `NssLibsNpcEntityApi`

#### `.getEntity()`

Returns the NPC entity or nil if the entity is not created.

#### `.destroy()`

Removes the NPC entity and all related distance checks.

#### `.show()`

Shows the NPC entity.

Returns `NssLibsNpcEntityApi`.

#### `.hide()`

Hides the NPC entity.

Returns `NssLibsNpcEntityApi`.

#### `.setCoords(x, y, z, heading)`

Sets the coordinates of the NPC entity.

- `x` _(number)_ - The x position of the NPC entity.
- `y` _(number)_ - The y position of the NPC entity.
- `z` _(number)_ - The z position of the NPC entity.
- `heading` _(number)_ - The heading of the NPC entity.

Returns `NssLibsNpcEntityApi`.

#### `.setModel(model, outfit)`

Sets the model of the NPC entity.

- `model` _(string)_ - The model of the NPC entity.
- `outfit` _(optional, number)_ - The outfit of the NPC entity. If nil or false, a random outfit will be used.

See [model documentation] for a list of models.

Returns `NssLibsNpcEntityApi`.

#### `.setOutfit(outfit)`

Sets the outfit of the NPC entity.

- `outfit` _(number/nil)_ - The outfit of the NPC entity. If nil or false, a random outfit will be used.

Returns `NssLibsNpcEntityApi`.

#### `.setSpawnRadius(radius)`

Sets the spawn radius of the NPC entity.

- `radius` _(number)_ - The spawn radius of the NPC entity.

Returns `NssLibsNpcEntityApi`.

#### `.setScale(scale)`

Sets the scale of the NPC entity.

- `scale` _(float)_ - The scale of the NPC entity.

Returns `NssLibsNpcEntityApi`.

#### `.setScenario(scenario)`

Sets the scenario of the NPC entity.

- `scenario` _(string)_ - The scenario of the NPC entity.

See [scenario documentation] for a list of scenarios.

Returns `NssLibsNpcEntityApi`.

#### `.setWeapon(weapon)`

Sets the weapon of the NPC entity.

- `weapon` _(string)_ - The weapon of the NPC entity.

See [weapons documentation] for a list of weapons.

Returns `NssLibsNpcEntityApi`.

#### `.resetAnimations()`

Resets the animations of the NPC entity.

Returns `NssLibsNpcEntityApi`.

#### `.addAnimation(anim_dict, anim_name, delay_in_ms, only_upper_body)`

Sets the animation of the NPC entity.

- `anim_dict` _(string)_ - The animation dictionary of the NPC entity.
- `anim_name` _(string)_ - The animation name of the NPC entity.
- `delay_in_ms` _(number)_ - The delay until next animation.
- `loop` _(boolean)_ - If true, the animation will be looped.
- `times` _(number)_ - The number of times the animation will be played.
- `only_upper_body` _(boolean)_ - If true, only the upper body will be animated.

See the following links for a list of animations:

- [mega dict animations]
- [ingame animations]

Returns `NssLibsNpcEntityApi`.

#### `.addTimeWindow(start_hour, start_minute, end_hour, end_minute)`

Adds a time window to the NPC entity. If the time is in the given time window, the NPC entity will be shown.

- `start_hour` _(number)_ - The start hour of the time window.
- `start_minute` _(number)_ - The start minute of the time window.
- `end_hour` _(number)_ - The end hour of the time window.
- `end_minute` _(number)_ - The end minute of the time window.

Returns `NssLibsNpcEntityApi`.

#### `.startRangeCheck(radius)`

Starts a range check for the NPC entity. If the player enters the given radius, the NPC entity will be shown. If the
player leaves the given radius, the NPC entity will be hidden.

- `radius` _(optional, number)_ - The radius in meters. If not set default radius will be used.

Returns `NssLibsNpcEntityApi`.

#### `.update()`

Updates the NPC entity (destroys and recreate it).

Returns `NssLibsNpcEntityApi`.

#### `.hasTimeWindows()`

Returns `true` if the NPC entity has at least one time window.

#### `.isInTimeWindow()`

Returns `true` if the NPC entity is in a time window or has no time windows.

#### `.onShow(callback)`

Sets the callback function which will be called when the NPC entity is shown.

- `callback` _(function)_ - The callback function.

Returns `NssLibsNpcEntityApi`.

#### `.onHide(callback)`

Sets the callback function which will be called when the NPC entity is hidden.

- `callback` _(function)_ - The callback function.

Returns `NssLibsNpcEntityApi`.

#### `.onEnterTimeWindow(callback)`

Sets the callback function which will be called when the NPC entity enters a time window.

- `callback` _(function)_ - The callback function.

Returns `NssLibsNpcEntityApi`.

#### `.onLeaveTimeWindow(callback)`

Sets the callback function which will be called when the NPC entity leaves a time window.

- `callback` _(function)_ - The callback function.

Returns `NssLibsNpcEntityApi`.

#### `.disablePlaceOnGround()`

Disables the place on ground feature of the NPC entity.

Useful if your NPC stuck in the ground after spawning (most case in custom buildings).

Returns `NssLibsNpcEntityApi`.

#### `.enablePlaceOnGround()`

Enables the place on ground feature of the NPC entity.

This is the default behavior.

Returns `NssLibsNpcEntityApi`.

-------------------------------------------------------------------------------

[model documentation]: https://github.com/femga/rdr3_discoveries/blob/f729ba03f75a591ce5c841642dc873345242f612/peds/peds_list.lua

[mega dict animations]: https://raw.githubusercontent.com/femga/rdr3_discoveries/b7c5ab68b4f3be78bc353b961a64baf77b327b26/animations/megadictanims/megadictanims.lua

[ingame animations]: https://raw.githubusercontent.com/femga/rdr3_discoveries/b7c5ab68b4f3be78bc353b961a64baf77b327b26/animations/ingameanims/ingameanims_list.lua

[weapons documentation]: https://github.com/femga/rdr3_discoveries/blob/f729ba03f75a591ce5c841642dc873345242f612/weapons/weapons.lua

[scenario documentation]: https://github.com/femga/rdr3_discoveries/blob/b7c5ab68b4f3be78bc353b961a64baf77b327b26/animations/scenarios/scenario_types_with_conditional_anims.lua
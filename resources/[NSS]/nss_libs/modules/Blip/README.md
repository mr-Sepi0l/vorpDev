# nss_libs - Blip

Easy to create blips for your REDM resource.

## Example

```lua
------------------------------------------------------------------------------
-- Step 1: Get API
------------------------------------------------------------------------------

---@type NssLibsBlipsApi
local blip_api = exports.nss_libs:getBlipsApi(GetCurrentResourceName())

------------------------------------------------------------------------------
-- Step 2: Create blip object and show it
------------------------------------------------------------------------------

-- Create blip at coords
local icon = 'blip_ambient_vip'
local title = 'Treasure'
local color_hash = 0x1DD3A06B
local x = -760.56
local y = -1251.08
local z = 43.41

---@type NssLibsBlipApi
local coords_blip = blip_api.createAtCoords(x, y, z, icon, title, color_hash)

coords_blip.setMedium()
coords_blip.addModifier('BLIP_MODIFIER_MP_SUPPLIES_OUTLINE_COLOR_2') -- Adds red outline
coords_blip.show()

-- Create blip at entity
local entity = GetPlayerPed(-1)
local color_name = 'BLIP_MODIFIER_MP_COLOR_4' -- names working, too

---@type NssLibsBlipApi
local entity_blip = blip_api.createAttachedToEntity(entity, icon, title, color_name)
entity_blip.setSmall()
entity_blip.show()

------------------------------------------------------------------------------
-- Optional: Dynamic changes
------------------------------------------------------------------------------

entity_blip.setColor(0x6F85C3CE) -- blip will be reassembled with new color.

------------------------------------------------------------------------------
-- Step 3: Hide blip
------------------------------------------------------------------------------

-- If you want to remove the blip completely, use destroy() instead of hide().
coords_blip.hide()
entity_blip.hide()
```

-------------------------------------------------------------------------------

## Methods

### `exports.nss_libs:getBlipsApi(resource_name)`

Returns the NPC api `NssLibsBlipsApi` for the given resource.

- `resource_name` _(string)_ - The name of the resource that wants to use the API.

-------------------------------------------------------------------------------

### `NssLibsBlipsApi`

#### `create(icon, title, color)`

- `icon` _(number|string)_ - The icon of the blip entity. See [multiplayer blip textures]
  or [single player blip textures] for a list of available icons.
- `title` _(optional, string)_ - The title of the blip entity.
- `color` _(number|string)_ - The color of the blip entity. See [blip colors and modifiers] for a list of available
  colors.

Returns a blip entity api `NssLibsBlipApi`.

#### `createAtCoords(x, y, z, icon, color, title)`

- `x` _(number)_ - The x position of the blip.
- `y` _(number)_ - The y position of the blip.
- `z` _(number)_ - The z position of the blip.
- See `create` for the other parameters.

Returns a blip entity api `NssLibsBlipApi`.

#### `createAttachedToEntity(entity, icon, color, title)`

- `entity` _(number)_ - The entity handle of the blip.
- See `create` for the other parameters.

Returns a blip entity api `NssLibsBlipApi`.

#### `createRadiusAtCoords(x, y, z, range, color)`

- `x` _(number)_ - The x position of the blip.
- `y` _(number)_ - The y position of the blip.
- `z` _(number)_ - The z position of the blip.
- `range` _(number)_ - The range in meters (radius) of the blip.
- See `create` for the other parameters.

Note: Radius blips has no icon or title.

Returns a blip entity api `NssLibsBlipApi`.

-------------------------------------------------------------------------------

### `NssLibsBlipApi`

#### `destroy()`

Removes the blip completely.

#### `show()`

Shows the blip.

Returns `NssLibsBlipApi`.

#### `hide()`

Hides the blip.

Returns `NssLibsBlipApi`.

#### `setCoords(x, y, z)`

Sets the coordinates of the blip.

Resets the entity of the blip if set before.

- `x` _(number)_ - The x position of the blip.
- `y` _(number)_ - The y position of the blip.
- `z` _(number)_ - The z position of the blip.

Returns `NssLibsBlipApi`.

#### `setEntity(entity)`

Attach the blip to an entity.

Resets the coordinates of the blip if set before.

- `entity` _(number)_ - The entity handle of the blip.

Returns `NssLibsBlipApi`.

#### `setRadius(x, y, z, range)`

Sets the coordinates and the range (size) of the blip.

Resets the entity of the blip if set before.

- `x` _(number)_ - The x position of the blip.
- `y` _(number)_ - The y position of the blip.
- `z` _(number)_ - The z position of the blip.
- `range` _(number)_ - The range in meters (radius) of the blip.

Returns `NssLibsBlipApi`.

#### `setColor(color)`

Sets the color of the blip.

- `color` _(number|string)_ - The color of the blip entity. See [blip colors and modifiers] for a list of available
  colors.

Returns `NssLibsBlipApi`.

#### `setTitle(title)`

Sets the title of the blip.

- `title` _(string)_ - The title of the blip entity. If empty no title will be shown.

Returns `NssLibsBlipApi`.

#### `setIcon(icon)`

Sets the icon of the blip.

- `icon` _(number|string)_ - The icon of the blip entity. See [multiplayer blip textures]
  or [single player blip textures] for a list of available icons.

Returns `NssLibsBlipApi`.

#### `setSmall()`

Sets the size of the blip to small.

Returns `NssLibsBlipApi`.

#### `setMedium()`

Sets the size of the blip to medium.

Returns `NssLibsBlipApi`.

#### `setBig()`

Sets the size of the blip to large.

Returns `NssLibsBlipApi`.

#### `isVisible()`

Returns `true` if the blip is visible, otherwise `false`.

#### `addModifier(modifier)`

Adds a modifier to the blip.

- `modifier` _(number|string)_ - The modifier of the blip entity. See [blip colors and modifiers] for a list of
  available
  modifiers.

Returns `NssLibsBlipApi`.

-------------------------------------------------------------------------------

## Todos

- [ ] Remove blip if entity is dead, offline or removed.

[multiplayer blip textures]: https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips_mp

[single player blip textures]: https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/textures/blips

[blip colors and modifiers]: https://github.com/femga/rdr3_discoveries/tree/master/useful_info_from_rpfs/blip_modifiers
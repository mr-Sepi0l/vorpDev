# nss_libs - EntityInRange

The (nearest) _entity-in-range_ interface helps you to easily create event based listeners to check what is the nearest
entity to the player.

**Simple example**

```lua
---@type EntityInRangeApi
local EntityInRangeApi = exports.nss_libs:getEntityInRangeApi(GetCurrentResourceName())

-- For more vegetation texture names see https://github.com/OpenIV-Team/RAGE-StringsDatabase/tree/fc6bcdfdda9d79afb4571c35bc4db730b42dc0f4/RDR2/ArchiveItems/hd_0/hd/levels/rdr3/props/vegetation
local tree_texture_names = {
    "p_tree_birch_03",
    "p_tree_birch_03b",
    "p_tree_birch_03_lg",
    "p_tree_birch_03_md",
    "p_tree_birch_03_md_a"
}

---@type EntityInRangeListener
local listener

---@param nearest_entity EntityInRangeData
---@param listener_id number
local on_reach_tree = function(nearest_entity, listener_id)
    print('Reached tree', nearest_entity.entity, listener_id)
end

---@param nearest_entity EntityInRangeData
---@param listener_id number
local on_leave_tree = function(nearest_entity, listener_id)

    print('Left tree', nearest_entity.entity, listener_id)

    -- If declared lister variable is not available you can get listener by given listener_id from event like the
    -- following example:
    local event_listener = EntityInRangeApi.getListenerById(listener_id)

    -- Example for one time only: We remove the listener after tree was left
    event_listener.remove()
end

listener = EntityInRangeApi.create(tree_texture_names, on_reach_tree, on_leave_tree)
```

---

## Public interface methods

### `create(texture_names, on_reach_callback, on_leave_callback):EntityInRangeListener`

Creates a listener that calls the `on_reach_callback` if the player reaches the **nearest** entity of
given `texture_names` and vice versa calls the `on_leave_callback` if the player lefts it.

Note: The created listener is initially active (on).

Returns an instance of `EntityInRangeListener`.

- `texture_names` _table_ Array of texture names.
- `on_reach_callback` _function_ Callback for "on-reach".
    - Arguments:
        - `nearest_entity` _EntityInRangeData_ Object with entity details.
        - `listener_id` _number_ ID of listener object.
- `on_leave_callback` _function_, _optional_ Callback for "on-left".
    - Same arguments as `on_reach_callback`.
- `custom_range` _number_, _optional_ Custom range for the listener. Default see
  `Config.EntityInRange.DEFAULT_SEARCH_RADIUS` in [config.lua](/config.lua). Be careful with this value, because
  it can have a big impact on performance.

### `getListenerById(listener_id):EntityInRangeListener`

Returns the listener object (`EntityInRangeListener`) matching the given listener ID otherwise `nil`.

- `listener_id` _number_ ID of a listener.

### `getEntitiesNearby(x, y, z, radius, model_name_or_hash, entity_type, filter_func):EntityInRangeData[]|nil`

Returns the nearest entity (data object `EntityInRangeData`) of given `texture_name` or `nil` if no entity was found.

- `x` _number_ X position.
- `y` _number_ Y position.
- `z` _number_ Z position.
- `radius` _number_, Range in meters to search for.
- `texture_name` _string|number|table<string|number>_, _optional_ Texture name(s) or hash(es)
- `entity_type` _number_, _optional_ Entity type. Default `ENTITY_TYPE_OBJECT`
- `filter_func` _function_, _optional_ Optional filter function to filter the found entities.
    - Arguments:
        - `entity` _number_
        - `model_hash` _number_
    - Returns:
        - _boolean_: `true` if the entity should be included in the result otherwise `false`.

Example:

```lua
---@type EntityInRangeApi
local EntityInRangeApi = exports.nss_libs:getEntityInRangeApi(GetCurrentResourceName())

local x = 0
local y = 0
local z = 0

-- See https://github.com/femga/rdr3_discoveries/blob/f729ba03f75a591ce5c841642dc873345242f612/peds/peds_list.lua for ped list ...
local texture_names = { "a_c_alligator_01", "a_c_alligator_02" }
local radius = 10.0 -- 10 meters
local entity_type = EntityInRangeApi.ENTITY_TYPE_PLAYER -- Only peds

---@type EntityInRangeApiCustomFilterFunction
local filter_func = function(entity, model_hash)
    
    -- You can filter what you want, e.g. if the entity is a real player or not, or if it is a animal or not, etc.
    if GetPedType(entity) ~= 4 then
        return false
    end
    
    return true
end

---@type EntityInRangeData[]|nil
local found_entities = EntityInRangeApi.getEntitiesNearby(x, y, z, radius, texture_names, entity_type, filter_func)

if found_entities then
    print('Found entities: ' .. tostring(json.encode(found_entities)))
else
    print('No entity found')
end 
```

### `getNearestObjectEntity(x, y, z, texture_name, range, entity_type):EntityInRangeData|nil`

Returns the nearest entity (data object `EntityInRangeData`) of given `texture_name` or `nil` if no entity was found. 

- `x` _number_ X position.
- `y` _number_ Y position.
- `z` _number_ Z position.
- `texture_name` _string|number_ Texture name or hash
- `range` _number_, _optional_ Range to search for. Default see `Config.EntityInRange.DEFAULT_SEARCH_RADIUS` in
  [config.lua](/config.lua). Be careful with this value, because it can have a big impact on performance.
- `entity_type` _number_, _optional_ Entity type. Default `ENTITY_TYPE_OBJECT`

Example:

```lua
---@type EntityInRangeApi
local EntityInRangeApi = exports.nss_libs:getEntityInRangeApi(GetCurrentResourceName())

local x = 0
local y = 0
local z = 0
local texture_name = "p_tree_birch_03"
local range

---@type EntityInRangeData|nil
local found_entity = EntityInRangeApi.getNearestObjectEntity(x, y, z, texture_name, range)

if found_entity then
    print('Found nearest entity: ' .. tostring(json.encode(found_entity)))
else
    print('No entity found')
end 
```

### `ENTITY_TYPE_OBJECT` _number, static_

Entity type for objects.

### `ENTITY_TYPE_PLAYER` _number, static_

Entity type for players.

### `ENTITY_TYPE_VEHICLE` _number, static_

Entity type for vehicles.

---

## Public methods of `EntityInRangeListener`

### `remove():EntityInRangeListener`

Removes the listener from the main _entity-in-range_ checking loop and returns itself.

### `off():EntityInRangeListener`

Alias for `remove()`.

### `on():EntityInRangeListener`

Insert the listener back to the main _entity-in_range_ checking loop and returns itself.

---

## Development notes

### Open todos

- [ ] Use cache for static entities in "chunks". The chunk must have a buffer of max range used. Then the
  cache could re-checked every 10 seconds or so. The cache would reduce the cost of performance.
- [x] Enable other types as object (e.g. vehicles, peds, etc.) and players as well.
- [ ] Enable custom delay.

### Known issues

- If a related resource is restarted and the player stand inside a range the Entity In Range trys to call the
  on-leave callback, but the resource is not available anymore. This results in an error.
- Item sets have a maximum of entities they can handle. All entities above this maximum can not be found. This
  is a REDM/RDR2 issue.

### Performance issues with classes/functions as callback arguments

Due to REDM restrictions (due to behavior currently unknown to us) on passing values between exported and
non-exported script modules no classes or functions (callbacks) are passed as arguments into events. In this interface
only the ID of the listener object is passed instead of the listener object itself. You can then get the listener object
via the listener ID if required. This saves a lot of performance.
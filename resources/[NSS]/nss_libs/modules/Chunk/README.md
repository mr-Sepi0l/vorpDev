# nss_libs - Chunk

The _chunk_ interface helps you to create you own chunk based systems with high performance.

Important: If you are looking for a ready to use "get the nearest point in range" system, please use the `PointInRange`
module.

**Example: consider all entered locations**

- If the player steps into that location the `on_enter` callback is called.
- If the player leaves that location the `on_leave` callback is called.
- If there are more than one location at the same coordinates (or overlapping radius) all callbacks of the related
  locations are called (see `chunk_api.setModeAllEntered()`).

```lua
---@type NssLibsChunksApi
local chunks_api = exports.nss_libs:getChunksApi(GetCurrentResourceName())

---@type NssLibsChunkApi
local chunk_api = chunks_api.create()

chunk_api.setModeAllEntered()

local a_on_enter = function(chunk_item_id)
    print('Entered radius A', chunk_item_id)
    -- Do something
end

local a_on_leave = function(chunk_item_id)
    print('Left radius A', chunk_item_id)
    -- Do something
end

local a_x = 0
local a_y = 0
local a_z = 0
local a_radius = 10

chunk_api.add(a_x, a_y, a_z, a_radius, a_on_enter, a_on_leave)

local b_on_enter = function(chunk_item_id)
    print('Entered radius B', chunk_item_id)
    -- Do something
end

local b_on_leave = function(chunk_item_id)
    print('Left radius V', chunk_item_id)
    -- Do something
end

local b_x = 2
local b_y = 2
local b_z = 0
local b_radius = 10

chunk_api.add(b_x, b_y, b_z, b_radius, b_on_enter, b_on_leave)
```

**Example: Only nearest location**

- Like the example before but only that location nearest to the player will be called (
  see `chunk_api.setModeOnlyEnteredNearest()`).

```lua
---@type NssLibsChunksApi
local chunks_api = exports.nss_libs:getChunksApi(GetCurrentResourceName())

---@type NssLibsChunkApi
local chunk_api = chunks_api.create()

chunk_api.setModeOnlyEnteredNearest()

local a_on_enter = function(chunk_item_id)
    print('Entered radius A', chunk_item_id)
    -- Do something
end

local a_on_leave = function(chunk_item_id)
    print('Left radius A', chunk_item_id)
    -- Do something
end

local a_x = 0
local a_y = 0
local a_z = 0
local a_radius = 10

chunk_api.add(a_x, a_y, a_z, a_radius, a_on_enter, a_on_leave)

local b_on_enter = function(chunk_item_id)
    print('Entered radius B', chunk_item_id)
    -- Do something
end

local b_on_leave = function(chunk_item_id)
    print('Left radius V', chunk_item_id)
    -- Do something
end

local b_x = 2
local b_y = 2
local b_z = 0
local b_radius = 10

chunk_api.add(b_x, b_y, b_z, b_radius, b_on_enter, b_on_leave)
```

---

## Public interface methods (`NssLibsChunksApi`)

### `.create()`

Creates a chunk grid and return its api `NssLibsChunkApi`.

Note: Be careful with grids, the more grids there are, the more performance it will need.

### `.clear()`

Clear all chunk grids of the resource.

Returns `NssLibsChunksApi`.

---

## Public methods of `NssLibsChunkApi`

### `.setSize(size_in_meters)`

Sets the grid size in meters.

- `size_in_meters` (_number_) - The size of the grid in meters. The default is 5.

Returns `NssLibsChunkApi`.

### `.setMonitoringInterval(interval_in_ms)`

Sets the monitoring interval in milliseconds.

- `interval_in_ms` (_number_) - The interval in milliseconds. The default is `1000`. `0` means each frame.

Returns `NssLibsChunkApi`.

### `.setModeAllEntered()`

All locations entered by the player will be called. E.g. you have two locations near besides to each other all
locations will be called if the player steps into both location radius.

Returns `NssLibsChunkApi`.

### `.setModeOnlyEnteredNearest()`

Only the location nearest to the player will be called. E.g. you have two locations near besides to each other the
nearest one will be called if the player steps into both location radius.

Returns `NssLibsChunkApi`.

### `.add(x, y, z, radius, on_enter_cb, on_leave_cb)`

Adds a location to the chunk grid.

- `x` (_number_) - The x coordinate of the location.
- `y` (_number_) - The y coordinate of the location.
- `z` (_number_) - The z coordinate of the location.
- `radius` (_number_) - The radius of the location.
- `on_enter_cb` (_function(`location_id` string)_) - The callback function which is called if the player steps into the
  location.
- `on_leave_cb` (_function(`location_id` string)_) - The callback function which is called if the player steps out of
  the location or on nearest mode if another location is nearer.

Returns `NssLibsChunkItemApi`.

### `.remove(location_id)`

Removes a location from the chunk grid.

- `location_id` (_string_) - The location id which was returned by the `add` method.

Returns `NssLibsChunkApi`.

### `.reset()`

Clears (removes) all locations from the chunk grid.

Returns `NssLibsChunkApi`.

---

## Public methods of `NssLibsChunkItemApi`

### `.getId()`

Returns the location id.

### `.remove()`

Remove the location from the chunk grid.

Returns nothing.

---

## Dev notes

- Currently, nothing ;)
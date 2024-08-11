# nss_libs - PointInRange

__Important:__ Do not use this module if your radius is higher than 10m because this results in a massive count of
chunks and the more chunks exists the more performance and memory usage is needed. Example: A radius of 100m results in
40x40x40 chunks, so 68000 chunks. This is too much for the PointInRange API. Use the Chunk module instead.

## Example

```lua
---@type NssLibsPointInRangeApi
local pir_api = exports.nss_libs:getPointInRangeApi(GetCurrentResourceName())

---@type NssLibsPointInRangeListenerApi
local pir_listener
local radius = 10.0
local x, y, z = 0.0, 0.0, 0.0

local on_enter = function()

    -- Do something when player enters the radius
    print("Entered the location")

    -- Ensure the player can only enter once for all time ;)
    if pir_listener then
        pir_listener.remove()
    end
end

local on_leave = function()

    -- Do something when player leaves the radius
    print("Left the location")
end

-- Ignore the nearest check
pir_listener = pir_api.add(x, y, z, radius, on_enter, on_leave, pir_api.IGNORE_NEAREST_CHECK)

-- Nearest point wins (excluding points that ignore the nearest check)
pir_listener = pir_api.add(x, y, z, radius, on_enter, on_leave)
```

--------------------------------------------------------------

## TODO

- [ ] Add docu for all functions
- [ ] The `Chunk` module can replace this API or the API uses the `Chunk` module in future.
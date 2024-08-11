# nss_libs - Client Helper

Client helper contains all methods of inherited [Shared helper](../share/README.md).

---

## Import client helper

{% code title="client.lua" %}
```lua
---@type NssLibsClientHelper
CLIENT_HELPER = exports.nss_libs:getClientHelper(GetCurrentResourceName())
```
{% endcode %}

---

## Methods

### `getUniqueId()`

**Returns** a unique id as `string`.

```lua
local unique_id = CLIENT_HELPER:getUniqueId()
print(unique_id)
```

---

### `getCurrentTimestamp()`

**Returns** the current timestamp from posix time in seconds.

```lua
local timestamp = CLIENT_HELPER:getCurrentTimestamp()
print(timestamp) -- 1631533200
```

---

### `getCurrentMsTimestamp()`

**Returns** the current timestamp from posix time in milliseconds.

```lua
local timestamp = CLIENT_HELPER:getCurrentMsTimestamp()
print(timestamp) -- 1631533200000
```

---

### `getCurrentServerTimestamp()`

This method is synchronous and will block the client thread until the server responds.

Asks the server for the current timestamp and returns it.

{% hint style="info" %}
__Important:__ Use with care as often you call this method, as often the server will be asked for the current timestamp.
{% endhint %}

**Returns** the current server timestamp in seconds.

```lua
local timestamp = CLIENT_HELPER:getCurrentServerTimestamp()
print(timestamp) -- 1631533200
```

---

### `getAllActivePlayerIds()`

**Returns** a list of all active player ids [`NssLibsClientHelperPlayerIdItem[]`](#nsslibsclienthelperplayeriditem).

```lua
local player_ids = CLIENT_HELPER:getAllActivePlayerIds()

for _, player_id in ipairs(player_ids) do
    print(player_id.client, player_id.server)
end
```

---

### `getPlayersInRadius(ped, radius)`

- `ped` (_number_ or _nil_) - The ped id to get the players in radius from. If `nil` the player ped will be used.
- `radius` (_number_ or _nil_) - The radius in meters (floated values are allowed). If `nil` the default radius
  of `100.0` meters will be used.

**Returns** a list of all player ids in the
radius [`NssLibsClientHelperPlayerIdItem[]`](#nsslibsclienthelperplayeriditem) or `nil` if no player is in the
radius.

```lua
local player_ids = CLIENT_HELPER:getPlayersInRadius(PlayerPedId(), 100.0)

for _, player_id in ipairs(player_ids) do
    print(player_id.client, player_id.server)
end
```

---

### `getPlayerClientIdsInRadius(ped, radius)`

- `ped` (_number_ or _nil_) - The ped id to get the players in radius from. If `nil` the player ped will be used.
- `radius` (_number_ or _nil_) - The radius in meters (floated values are allowed). If `nil` the default radius
  of `100.0` meters will be used.

**Returns** a list of all player client ids in the radius `number[]` or `nil` if no player is in the radius.

```lua
local client_player_ids = CLIENT_HELPER:getPlayerClientIdsInRadius(PlayerPedId(), 100.0)

for _, client_player_id in ipairs(client_player_ids) do
    print(client_player_id)
end
```

---

### `getPlayerServerIdsInRadius(ped, radius)`

- `ped` (_number_ or _nil_) - The ped id to get the players in radius from. If `nil` the player ped will be used.
- `radius` (_number_ or _nil_) - The radius in meters (floated values are allowed). If `nil` the default radius
  of `100.0` meters will be used.
- `ignore_dead` (_boolean_, _optional_) - If `true` dead players will be ignored. Default is `false`.

**Returns** a list of all player server ids in the radius `number[]` or `nil` if no player is in the radius.

```lua
local server_player_ids = CLIENT_HELPER:getPlayerServerIdsInRadius(PlayerPedId(), 100.0, true)

for _, server_player_id in ipairs(server_player_ids) do
    print(server_player_id)
end
```

---

### `getNearestPlayersInRadius(ped, radius)`

- `ped` (_number_ or _nil_) - The ped id to get the players in radius from. If `nil` the player ped will be used.
- `radius` (_number_ or _nil_) - The radius in meters (floated values are allowed). If `nil` the default radius
  of `100.0` meters will be used.

**Returns** the nearest player in the radius `NssLibsClientHelperPlayerIdItem` or `nil` if no player is in the radius.

```lua
local server_player_ids = CLIENT_HELPER:getNearestPlayersInRadius(PlayerPedId(), 100.0)

if server_player_ids then
    print(server_player_ids.client, server_player_ids.server)
end
```

---

### `getInGameDate(format)`

- `format` (_string_, _optional_) - The format of the date string. Available placeholders are D (day), M (month), Y (
  year). Default see `Config.DefaultDateFormat`.

**Returns** the current in-game date as `string`.

```lua
local in_game_date = CLIENT_HELPER:getInGameDate('Y-M-D')
print(in_game_date) -- 1886-09-13
```

---

### `hasPlayers()`

**Returns** `true` if there are active players (including current active player) otherwise `false`.

```lua
local has_players = CLIENT_HELPER:hasPlayers()

if has_players then
    print('There are active players')
else
    print('There are no active players')
end
```

---

### `dateToTimestamp(date_str, format)`

- `date_str` (_string_) - The date string to convert.
- `format` (_string_, _optional_) - The format of the date string. Available placeholders are D (day), M (month), Y (
  year). Default see `Config.DefaultDateFormat`.

**Returns** the timestamp derived from the date string in seconds as `number` (integer).

```lua
local date_string = '2021-12-24'
local format = 'Y-M-D'

local timestamp = CLIENT_HELPER:dateToTimestamp(date_string, format)
print(timestamp)
```

---

### `getInGameDateTimestamp(format)`

- `format` (_string_, _optional_) - The format of the date string. Available placeholders are D (day), M (month), Y (
  year). Default see `Config.DefaultDateFormat`.

**Returns** the current in-game date as timestamp in seconds as `number` (integer).

```lua
local in_game_date_timestamp = CLIENT_HELPER:getInGameDateTimestamp('Y-M-D') -- Example in game date 1896-09-13
print(in_game_date_timestamp) -- 1631533200
```

---

### `getClientPlayerIdFromServer(server_player_id)`

This is a shorthand.

- `server_player_id` (_number_) - The server id of the player.

**Returns** the client id of the player as `number`.

```lua
local server_player_id = 1
local client_player_id = CLIENT_HELPER:getClientPlayerIdFromServer(server_player_id)
print(client_player_id)
```

---

### `getServerPlayerId()`

This is a shorthand.

**Returns** the server id of the current player as `number`.

```lua
local server_player_id = CLIENT_HELPER:getServerPlayerId()
print(server_player_id)
```

---

### `timeout(callback, interval_in_ms)`

This method is asynchronous and will not block the client thread.

- `callback` (_function_) - The function to call after the interval.
- `interval_in_ms` (_number_) - The interval in milliseconds.

**Returns** a `function` to clear the timeout.

```lua
-- Example: Timeout with 1000ms interval
CLIENT_HELPER:timeout(function()
    print('Timeout')
end, 1000)

-- Output after 1000ms: Timeout
```

```lua
-- Example: Timeout with clear timeout
local clear_timeout = CLIENT_HELPER:timeout(function()
    print('Timeout')
end, 1000)

clear_timeout() -- Clear the timeout

-- Output after 1000ms: (nothing)
```

---

### `addEventHandler(event_name, callback, resource_name)`

{% hint style="info" %}
__Important:__ If the related resource is stopped, the event will be removed automatically.
{% endhint %}

- `event_name` (_string_) - The name of the event.
- `callback` (_function_) - The function to call when the event is triggered.
  - If the callback returns `false` other additional callbacks registered after this callback will not be called.
- `resource_name` (_string_) - The name of the resource that is listening to the event.
- `on_destroy_callback` (_function_, _optional_) - Called before the event handler is destroyed. If the callback
  returns `false` the event handler will not be destroyed.

**Returns** a [`NssLibsSharedHelperEventHandlerApi`](../share/README.md#NssLibsSharedHelperEventHandlerApi) instance.

{% code lineNumbers="true" %}
```lua
local event_name = 'your_event_name'
local resource_name = GetCurrentResourceName()

local callback = function(...)
    print('Event ' .. tostring(event_name) .. ' for ' .. tostring(resource_name) .. 'is triggered:', ...)
end

---@type NssLibsSharedHelperEventHandlerApi
local event_handler_item = CLIENT_HELPER:addEventHandler(event_name, callback, resource_name)

TriggerEvent('your_event_name', 'Hello World')
-- Output: "Event your_event_name for your_resource_name is triggered: Hello World"

event_handler_item:disable()
TriggerEvent('your_event_name', 'Hello World 2')
-- Output: No output because the event handler is disabled

event_handler_item:destroy()
TriggerEvent('your_event_name', 'Hello World 3')
-- Output: No output because the event handler is destroyed
```
{% endcode %}

---

### `waitUntilLoadingsScreenEnds()`

This method is synchronous and will block the client thread until the loading screen ends.

**Returns** nothing.

```lua
CLIENT_HELPER:waitUntilLoadingsScreenEnds()
print('Loading screen ends')
-- Continue here with the code after the loading screen ends
```

---

### `playAnimation(ped, dict, name, flag)`

Plays the given animation on given ped.

__Important:__ This method is asynchronous and will not block the client thread.

- `ped` (_number_) - The player ped id.
- `dict` (_string_) - The animation dictionary.
- `name` (_string_) - The animation name.
- `flag` (_number_, _optional_) - The flag of the animation. Default is `0`.

**Returns** nothing.

```lua
local ped = PlayerPedId()
local anim_dict = 'amb_misc@world_human_wash_face_bucket@table@female_a@idle_d'
local anim_name = 'idle_j'
local anim_flag = 0

CLIENT_HELPER:playAnimation(ped, anim_dict, anim_name, anim_flag)
```

---

### `requestAnimDict(dict)`

Requests the given animation dictionary.

- `dict` (_string_) - The animation dictionary.

**Returns** `true` if the animation dict is requested successfully otherwise `false`.

```lua
local anim_dict = 'amb_misc@world_human_wash_face_bucket@table@female_a@idle_d'

if not CLIENT_HELPER:requestAnimDict(anim_dict) then
  print('Failed to request animation dict')
else
  print('Animation dict requested successfully')
end
```

---

## Objects

### `NssLibsClientHelperPlayerIdItem`

- `client` (_number_) - The client id of the player.
- `server` (_number_) - The server id of the player.
- `players`(_NssLibsClientHelperPlayerIdItem[]_) - The list of players in radius.
- `nearest_player` (_NssLibsClientHelperPlayerIdItem|nil_) - The nearest player in radius.

---

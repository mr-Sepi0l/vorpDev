# nss_libs - Server Helper

Server helper contains all methods of inherited [Shared helper](../share/README.md).

---

## Import server helper

{% code title="server.lua" %}

```lua
---@type NssLibsServerHelper
SERVER_HELPER = exports.nss_libs:getServerHelper(GetCurrentResourceName())
```

{% endcode %}

---

## Methods

### `getUniqueId()`

**Returns** a unique id as `string`.

```lua
local unique_id = SERVER_HELPER:getUniqueId()
print(unique_id)
```

---

### `doUntilTimeout()`

This call is synchronous and will block the server thread until the timeout is reached.

- `callback` (_function_) - The function to call repeatedly until the timeout is reached.
- `timeout_in_ms` (_integer_) - The timeout in milliseconds. `0` for infinite.
- `tick_in_ms` (_integer_) - The tick (or duration) of the loop in milliseconds. `0` each frame.

**Returns** the optional return value of the `callback` if not `nil` or `false`. Otherwise `nil`.

```lua
-- Executes the callback every 100ms until 1000ms are reached.
local callback = function()
    print('Hello')
end

local timeout_in_ms = 1000
local tick_in_ms = 100

SERVER_HELPER:doUntilTimeout(callback, timeout_in_ms, tick_in_ms)
```

```lua
-- Executes the callback every frame until 1000ms are reached.
local callback = function()
    print('Hello')
end

local timeout_in_ms = 1000
local tick_in_ms = 0

SERVER_HELPER:doUntilTimeout(callback, timeout_in_ms, tick_in_ms)
```

```lua
-- Executes the callback until the timeout has reached or the callback returns not `nil` or `false` 
-- (in this case the callback returns a message if the random number is 1).
local callback = function()
    print('Do the lottery...')

    -- Generate a random number between 0 and 1
    local random = math.random(0, 1)

    if random == 1 then
        return 'You win the lottery ;)'
    end
end

local timeout_in_ms = 1000
local tick_in_ms = 100

local result = SERVER_HELPER:doUntilTimeout(callback, timeout_in_ms, tick_in_ms)

print(result)
```

---

### `waitUntilStarted()`

This call is synchronous and will block the server thread until the timeout is reached.

- `resource_name` (_string_) - The name of the resource that has to be started.
- `timeout_in_ms` (_integer_) - The timeout in milliseconds. `0` for infinite.
- `tick_in_ms` (_integer_) - The tick (or duration) of the loop in milliseconds. `0` each frame.

**Returns** `true` if the resource is started otherwise `false` if the timeout is reached.

```lua
local resource_name = 'your_resource_name'
local timeout_in_ms = 1000
local tick_in_ms = 100

local is_started = SERVER_HELPER:waitUntilStarted(resource_name, timeout_in_ms, tick_in_ms)

if is_started then
    print('Resource is started')
else
    print('Resource is not started until timeout is reached :(')
end
```

---

### `waitUntilFirstStarted()`

This call is synchronous and will block the server thread until the timeout is reached.

- `resource_names` (_table<string>_) - The names of the resources that one of them has to be started first.
- `timeout_in_ms` (_integer_) - The timeout in milliseconds. `0` for infinite.
- `tick_in_ms` (_integer_) - The tick (or duration) of the loop in milliseconds. `0` each frame.

**Returns** the name of the resource that is started first otherwise `false` if the timeout is reached.

```lua
local resource_names = { 'your_resource_name', 'your_other_resource_name' }
local timeout_in_ms = 1000
local tick_in_ms = 100

local first_started_resource = SERVER_HELPER:waitUntilFirstStarted(resource_names, timeout_in_ms, tick_in_ms)

if first_started_resource then
    print('Resource is started first:', first_started_resource)
else
    print('No resource is started until timeout is reached :(')
end
```

---

### `createWrapperFinder()`

For internal use only.

{% hint style="info" %}
__Note:__ This method is very complex and is used to find the correct wrapper/bridge for a framework like VORP or REDEM.
But this solution is to complex and will be removed in the future.
{% endhint %}

**Returns** a new `NssLibsWrapperFinder` instance.

---

### `getCurrentTimestamp()`

**Returns** the current timestamp derived from the system time of the server host in seconds as `number` (integer).

```lua
local timestamp = SERVER_HELPER:getCurrentTimestamp()
print(timestamp)
```

---

### `getInGameDate()`

- `format` (_string_, _optional_) - The format of the date string. Available placeholders are D (day), M (month), Y (
  year). Default see `Config.DefaultDateFormat`.

**Returns** the current in-game date as formatted `string` or `nil`of no player is currently in-game.

```lua
local in_game_date = SERVER_HELPER:getInGameDate('Y-M-D')
print(in_game_date)
```

---

### `getAllActivePlayerIds()`

**Returns** a table with all active player ids `integer[]`.

```lua
local player_ids = SERVER_HELPER:getAllActivePlayerIds()
print('Active player ids:', json.encode(player_ids))
```

---

### `eachActivePlayer()`

- `each_callback` (_function(BREAK_EACH_LOOP, server_player_id)_) - The function to call for each active player.
    - `BREAK_EACH_LOOP` (_boolean_) - Constant: Return this value to break the loop.
    - `server_player_id` (_integer_) - The server player id.

**Returns** nothing.

```lua
-- Example shows the first 5 found player ids.
local player_counter = 0

local each_callback = function(BREAK_EACH_LOOP, server_player_id)

    player_counter = player_counter + 1

    if player_counter > 5 then
        return BREAK_EACH_LOOP
    end

    print('Player id (below 5):', server_player_id)
end

SERVER_HELPER:eachActivePlayer(each_callback)
```

```lua
-- Example walks through all found player ids.
local each_callback = function(_, server_player_id)
    print('Player id:', server_player_id)
end

SERVER_HELPER:eachActivePlayer(each_callback)
```

---

### `hasPlayers()`

**Returns** `true` if there are active players otherwise `false`.

```lua
local has_players = SERVER_HELPER:hasPlayers()

if has_players then
    print('There are active players')
else
    print('There are no active players')
end
```

---

### `dateToTimestamp()`

- `date_string` (_string_) - The date string to convert.
- `format` (_string_, _optional_) - The format of the date string. Available placeholders are D (day), M (month), Y (
  year). Default see `Config.DefaultDateFormat`.

**Returns** the timestamp derived from the date string in seconds as `number` (integer).

```lua
local date_string = '2021-12-24'
local format = 'Y-M-D'

local timestamp = SERVER_HELPER:dateToTimestamp(date_string, format)
print(timestamp)
```

---

### `getInGameDateTimestamp()`

- `format` (_string_, _optional_) - The format of the date string. Available placeholders are D (day), M (month), Y (
  year). Default see `Config.DefaultDateFormat`.

**Returns** the current in-game date as timestamp in seconds as `number` (integer) or `nil` if no player is currently
in-game.

```lua
local in_game_date_timestamp = SERVER_HELPER:getInGameDateTimestamp('Y-M-D')
print(in_game_date_timestamp)
```

---

### `addEventHandler()`

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
local event_handler_item = SERVER_HELPER:addEventHandler(event_name, callback, resource_name)

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

### `requireFiles()`

- `resource_name` (_string_) - The name or filepath of the resource that requires the files.
- `filenames` (_string_ | _string[]_) - The name of the file or a list of file names to require.
- `additional_error_message` (_string_, _optional_) - Additional error message which replaces the default error message.
- `silent` (_boolean_, _optional_) - If `true` no error message will be printed by this method itself.

**Returns** `true` if all files are required otherwise `false`.

```lua
local resource_name = GetCurrentResourceName()
local filenames = { 'your_file_name.txt', 'folder/your_other_file_name.txt' }

local all_files_found = SERVER_HELPER:requireFiles(resource_name, filenames)

if all_files_found then
    print('All required files found :)')
else
    print('Not all required files could be found :(')
end
```

---

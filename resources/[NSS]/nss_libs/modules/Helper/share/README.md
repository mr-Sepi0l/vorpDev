# nss_libs - Shared Helper

The methods of the shared helper are available for and inherited to both client and server side.

* [Client helper](../client/README.md)
* [Server helper](../server/README.md)

In the following you will find the methods of the shared helper used for example on the server side via
imported `SERVER_HELPER` variable.

---

## Methods

### `copyThisTo()`

{% hint style="info" %}
__Note:__ This method is used to copy the methods of the shared helper to another table (e.g. a class like client helper
or server helper).
{% endhint %}

- `table` (_table_) - The table to copy the methods of the shared helper to.
- `unique_id_prefix` (_string_, _optional_) - The unique id prefix to use for the table.

**Returns** nothing.

```lua
local my_table = {}
SERVER_HELPER:copyThisTo(my_table, 'my_table')
local uid = my_table:getUniqueId()
print(uid)
```

---

### `getHashKey()`

- `name_or_hash` (_string_ or _number_) - The name get the hash key from. If a hash is given it will be returned as is.

**Returns** the hash key as `number`.

```lua
local hash = SERVER_HELPER:getHashKey('prop_beach_lotion_01')
print(hash)
```

---

### `hasTableEntries()`

- `obj` (_table_ or _any_) - The value to check if it is a table and has entries.

**Returns** `true` if the value is a table and has entries. Otherwise `false`.

```lua
-- Example for simple table.
local has_entries = SERVER_HELPER:hasTableEntries({ 1, 2, 3 })
print(has_entries) -- true
```

```lua
-- Example for empty table.
local has_entries = SERVER_HELPER:hasTableEntries({})
print(has_entries) -- false
```

```lua
-- Example for string.
local has_entries = SERVER_HELPER:hasTableEntries('Hello')
print(has_entries) -- false
```

```lua
-- Example for table with associated entries.
local has_entries = SERVER_HELPER:hasTableEntries({ a = 1, b = 2, c = 3 })
print(has_entries) -- true
```

```lua
-- Example for nil.
local has_entries = SERVER_HELPER:hasTableEntries(nil)
print(has_entries) -- false
```

---

### `toFloat()`

- `value` (_number_) - The value to convert to float.

**Returns** the floated value as `number`.

```lua
local float = SERVER_HELPER:toFloat(1)
print(float) -- 1.0
```

---

### `toInt()`

- `value` (_number_) - The value to convert to integer.

**Returns** the integer value as `number`.

```lua
local int = SERVER_HELPER:toInt(1.7)
print(int) -- 1
```

---

### `round()`

- `num` (_number_) - The number to round.
- `decimals` (_number_) - The number of decimals to round.

**Returns** the rounded number as `number`.

```lua
local rounded = SERVER_HELPER:round(1.2345, 2)
print(rounded) -- 1.23
```

---

### `getDecimalCount()`

- `num` (_number_) - The number to get the decimal count from.

**Returns** the decimal count as `number`.

```lua
local decimal_count = SERVER_HELPER:getDecimalCount(1.2345)
print(decimal_count) -- 4
```

---

### `inlineError()`

- `message` (_string_) - The error message.
- `traceback` (_string_, _optional_) - The traceback string.

**Returns** nothing.

```lua
-- Simple example
SERVER_HELPER:inlineError('This is an error message')
```

```lua
-- Example with custom traceback.
SERVER_HELPER:inlineError('This is an error message', 'Line 12 in file server.lua')
```

---

### `inlineWarning()`

- `message` (_string_) - The warning message.
- `traceback` (_string_, _optional_) - The traceback string.

**Returns** nothing.

```lua
-- Simple example
SERVER_HELPER:inlineWarning('This is a warning message')
```

```lua
-- Example with custom traceback.
SERVER_HELPER:inlineWarning('This is a warning message', 'Line 12 in file server.lua')
```

---

### `getEmptyFunction()`

This method is useful if you have to use an empty function as a default value.

**Returns** an empty function.

```lua
local empty_function = SERVER_HELPER:getEmptyFunction()

empty_function() -- Does nothing
```

---

### `strTrim()`

- `str` (_string_ or _number_) - The string to trim.

**Returns** the trimmed string as `string`.

```lua
local trimmed = SERVER_HELPER:strTrim('  Hello  ')
print(trimmed) -- 'Hello'
```

---

### `strSplit()`

- `str` (_string_) - The string to split.
- `separator` (_string_, _optional_) - The separator to split the string. Default is ` ` (space).
- `max_times` (_number_, _optional_) - The maximum times to split the string. Default is `-1` (infinite).

**Returns** a table with the split strings (`table<string>`).

```lua
local parts = SERVER_HELPER:strSplit('Hello,World', ',')
print(json.encode(parts)) -- {'Hello', 'World'}
```

```lua
local parts = SERVER_HELPER:strSplit('Hello,World', ',', 1)
print(json.encode(parts)) -- {'Hello'}
```

---

### `isSteamWebApiKeyAvailable()`

Checks the convar steam_webApiKey` if it is available.
See [convar documentation](https://docs.fivem.net/docs/scripting-reference/convars/) for more information.

**Returns** `true` if the Steam Web API key is available. Otherwise `false`.

```lua
local is_available = SERVER_HELPER:isSteamWebApiKeyAvailable()
print(is_available)
```

---

### `getKeysFromTable()`

- `tbl` (_table_) - The table to get the keys from.

**Returns** a table with the keys of the given table (`table<string|number>`).

```lua
local keys = SERVER_HELPER:getKeysFromTable({ a = 1, b = 2, c = 3 })
print(json.encode(keys)) -- {'a', 'b', 'c'}
```

---

### `cleanFunctions()`

In case you want use `json.encode` on an object that contains functions you can use this method to clean the functions.

- `obj` (_any_) - The object to clean the functions from.

**Returns** the cleaned object.

```lua
local obj = {
    a = 1,
    b = function()
        -- Some things...
    end,
    c = 3
}

local cleaned = SERVER_HELPER:cleanFunctions(obj)

print(json.encode(cleaned)) -- {a:1, c:3}
```

---

### `getDayMonthYearFromString()`

- `str` (_string_) - The date string.
- `format` (_string_, _optional_) - The format of the date string. Available placeholders are D (day), M (month), Y (
  year). Default see `Config.DefaultDateFormat`.

**Returns** the date object [NssLibsSharedHelperDateObject](#nsslibssharedhelperdateobject).

```lua
local date = SERVER_HELPER:getDayMonthYearFromString('01.02.2021', 'D.M.Y')
print(date.day, date.month, date.year) -- 1, 2, 2021
```

---

### `escapeMagicChars()`

Escape the magic characters from a string which should be used as find pattern in `string:gsub`.

- `str` (_string_) - The string to escape the magic characters from.

**Returns** the escaped `string`.

```lua
local search_pattern = SERVER_HELPER:escapeMagicChars('%Hello 42 Worlds%')

local escaped_find_pattern = SERVER_HELPER:escapeMagicChars('%Hello')
print(escaped_find_pattern) -- '%%Hello'

local result = search_pattern:gsub(escaped_find_pattern, "%Bye")
print(result) -- '%Bye 42 Worlds%'
```

---

### `debouncedClock()`

In contrast to `debounced()`, the `cb` is called at least every `delay_in_ms` value if the function is called
continuously at shorter intervals than the `delay_in_ms` value. The delay is therefore not reset with every call.

- `delay_in_ms` (_number_) - The delay in milliseconds.
- `cb` (_function_) - The callback function.

**Returns** the debounced `function`.

```lua
-- Example for simple delay (debounced) function.
local debounced = SERVER_HELPER:debouncedClock(1000, function()
    print('Debounced function called')
end)

debounced()
Citizen.Wait(1500)

-- Output: Debounced function called after 1000ms. Because 1000ms is the maximum delay.
```

```lua
-- Example for continuous clocked (will be called every 1000ms) debounced function.
local debounced = SERVER_HELPER:debouncedClock(1000, function()
    print('Debounced function called')
end)

-- Call the debounced function continuously.
Citizen.CreateThread(function()
    while true do
        debounced()
        Citizen.Wait(750)
    end
end)

-- Output: Each 1000ms the debounced function will be called. Because 1000ms is the maximum delay.
```

---

### `debounced()`

This is useful if you want to debounce a function. E.g. if you want to call a function only once after multiple calls in
a short time.

- `delay_in_ms` (_number_) - The delay in milliseconds.
- `cb` (_function_) - The callback function.

**Returns** the debounced `function`.

```lua
-- Example for simple delay (debounced) function.
local debounced = SERVER_HELPER:debounced(1000, function()
    print('Debounced function called')
end)

debounced()
Citizen.Wait(1500)

-- Output: Debounced function called after 1000ms. Because 1000ms is the maximum delay.
```

```lua
-- Example for continuous (will be called every 1000ms) debounced function.
local debounced = SERVER_HELPER:debounced(1000, function()
    print('Debounced function called')
end)

-- Call the debounced function continuously.
Citizen.CreateThread(function()
    while true do
        debounced()
        Citizen.Wait(750)
    end
end)

-- Output: There is no output until the while loop ends because every time the debounced function is called the delay 
-- is reset.
```

---

### `isFloat()`

- `value` (_any_) - The value to check if it is a float.

**Returns** `true` if the value is a float. Otherwise `false`.

```lua
local is_float = SERVER_HELPER:isFloat(1.7)
print(is_float) -- true
```

```lua
local is_float = SERVER_HELPER:isFloat(1)
print(is_float) -- false
```

```lua
local is_float = SERVER_HELPER:isFloat('Hello')
print(is_float) -- false
```

---

### `isFunction()`

- `value` (_any_) - The value to check if it is a function.

**Returns** `true` if the value is a function. Otherwise `false`.

```lua
local is_function = SERVER_HELPER:isFunction(function()
end)
print(is_function) -- true
```

```lua
local is_function = SERVER_HELPER:isFunction(1)
print(is_function) -- false
```

```lua
local is_function = SERVER_HELPER:isFunction('Hello')
print(is_function) -- false
```

---

### `isTable()`

- `value` (_any_) - The value to check if it is a table.

**Returns** `true` if the value is a table. Otherwise `false`.

```lua
local is_table = SERVER_HELPER:isTable({ a = 1, b = 2, c = 3 })
print(is_table) -- true
```

```lua
local is_table = SERVER_HELPER:isTable({ 1, 2, 3 })
print(is_table) -- true
```

```lua
local is_table = SERVER_HELPER:isTable(1)
print(is_table) -- false
```

```lua
local is_table = SERVER_HELPER:isTable('Hello')
print(is_table) -- false
```

---

### `isTableArray()`

This method uses a cache to prevent multiple checks of the same table with high cost of performance.

- `value` (_any_) - The value to check if it is a table array.
- `prevent_cache` (_boolean_, _optional_) - If `true` the cache will be prevented.

**Returns** `true` if the value is a table array. Otherwise `false`.

```lua
local is_table_array = SERVER_HELPER:isTableArray({ 1, 2, 3 })
print(is_table_array) -- true
```

```lua
local is_table_array = SERVER_HELPER:isTableArray({ a = 1, b = 2, c = 3 })
print(is_table_array) -- false
```

```lua
local is_table_array = SERVER_HELPER:isTableArray(1)
print(is_table_array) -- false
```

```lua
local is_table_array = SERVER_HELPER:isTableArray('Hello')
print(is_table_array) -- false
```

---

### `createThreadSafeMonitor()`

Creates a new thread with a while loop that is **thread safe**. It can be started multiple times - but it will be
started
only once if it was already started. This is important if different sources triggers the monitor to start or stop.

- `interval_in_ms` (_number_) - The interval of the loop in milliseconds.
- `cb_function` (_function_) - The callback function.
  See [NssLibsSharedHelperMonitorCallback](#nsslibssharedhelpermonitorcallback).
    - The `cb_function` has no arguments and no return value.

**Returns** the monitor `NssLibsSharedHelperMonitor`. See [NssLibsSharedHelperMonitor](#nsslibssharedhelpermonitor) for
more information.

```lua
-- Example for simple monitor which is called every 1000ms.
local monitor = SERVER_HELPER:createThreadSafeMonitor(1000, function()
    print('Monitor called')
end)

monitor:start()

-- Output: Monitor called every 1000ms.
```

---

### `unixTimestampToDate()`

- `unix_timestamp` (_number_) - The unix timestamp to convert to date.

**Returns** the date as `year`, `month`, `day`, `hour`, `minute`, `second` as `number`.

```lua
local year, month, day, hour, minute, second = SERVER_HELPER:unixTimestampToDate(1612137600)
print(year, month, day, hour, minute, second) -- 2021, 2, 1, 0, 0, 0
```

---

### `dateToUnixTimestamp()`

- `year` (_number_) - The year.
- `month` (_number_) - The month.
- `day` (_number_) - The day.
- `hour` (_number_) - The hour.
- `minute` (_number_) - The minute.
- `second` (_number_) - The second.

**Returns** the unix timestamp as `number`.

```lua
local timestamp = SERVER_HELPER:dateToUnixTimestamp(2021, 2, 1, 0, 0, 0)
print(timestamp) -- 1612137600
```

---

### `padWithZeros()`

- `number` (_number_) - The number to pad with zeros.
- `length` (_number_) - The length of the number.

**Returns** the padded number as `string`.

```lua
local padded = SERVER_HELPER:padWithZeros(42, 5)
print(padded) -- '00042'
```

---

### `createResourceEventName()`

This is useful if you have to create event names dynamically in the same way as the server and client does.

This method is for internal use primary.

- `resource_name` (_string_) - The resource name.
- `event_name` (_string_) - The event name.

**Returns** the resource event name as `string`.

```lua
-- Server side
local resource_name = GetCurrentResourceName() -- e.g. 'my_resource'
local resource_event_name = SERVER_HELPER:createResourceEventName(resource_name, 'my_event')

print(resource_event_name) -- 'my_resource:my_event'

TriggerClientEvent(resource_event_name, -1, 'Hello')
```

```lua
-- Client side
local resource_name = GetCurrentResourceName() -- e.g. 'my_resource'
local resource_event_name = CLIENT_HELPER:createResourceEventName(resource_name, 'my_event')

print(resource_event_name) -- 'my_resource:my_event'

RegisterServerEvent(resource_event_name)
AddEventHandler(resource_event_name, function(message)
    print(message) -- 'Hello'
end)
```

---

### `isTableEqual()`

- `table1` (_table_) - The first table to compare.
- `table2` (_table_) - The second table to compare.
- `deep` (_boolean_, _optional_) - If true the nested tables will be compared too. Default is `false`.

**Returns** `true` if the tables are equal. Otherwise `false`.

```lua
local is_equal = SERVER_HELPER:isFlatTableEqual({ a = 1, b = 2, c = 3 }, { a = 1, b = 2, c = 3 })
print(is_equal) -- true
```

```lua
local is_equal = SERVER_HELPER:isFlatTableEqual({ a = 1, b = 2, c = 3 }, { a = 1, b = 2, c = 4 })
print(is_equal) -- false
```

```lua
local is_equal = SERVER_HELPER:isFlatTableEqual({ a = 1, b = 2, c = 3 }, { a = 1, b = 2 })
print(is_equal) -- false
```

```lua
local is_equal = SERVER_HELPER:isFlatTableEqual({ a = 1, b = { x = 1 }, c = 3 }, { a = 1, b = { x = 1 }, c = 3, d = 4 })
print(is_equal) -- false
```

```lua
local is_equal = SERVER_HELPER:isFlatTableEqual({ a = 1, b = { x = 1 }, c = 3 }, { a = 1, b = { x = 1 }, c = 3 })
print(is_equal) -- true
```

---

### `createCallbackApi()`

Creates a simple callback handler.

- `callback` (_function_) - The callback which will be handled by the callback api.
- `resource_name` (_function_) - The owning resource of the callback.

If the resource of the given `resource_name` is stopped the callback will be disabled/destroyed automatically.

**Returns** [NssLibsSharedHelperCallbackHandlerCbApi](#nsslibssharedhelpercallbackhandlercbapi).

```lua
local callback = function(a, b, c)
    print(a, b, c)
end

---@type NssLibsSharedHelperCallbackHandlerCbApi
local callback_api = SERVER_HELPER:createCallbackApi(callback, GetCurrentResourceName())

callback_api:call(1, 2, 3)
-- Output: 1, 2, 3

callback_api:disable()

callback_api:call(1, 2, 3)
-- Output nothing because the callback is disabled
```

---

## Objects

### `NssLibsSharedHelperDateObject`

- `day` (_number_) - The day of the date.
- `month` (_number_) - The month of the date.
- `year` (_number_) - The year of the date.

---

### `NssLibsSharedHelperMonitorCallback`

Has no parameters and no return value.

---

### `NssLibsSharedHelperMonitor`

Api for the monitor.

---

#### `isRunning()`

**Returns** `true` if the monitor is running. Otherwise `false`.

---

#### `start()`

Starts the monitor (if not already started).

**Returns** the monitor `NssLibsSharedHelperMonitor`.

---

#### `stop()`

Stops the monitor (if not already stopped).

**Returns** the monitor `NssLibsSharedHelperMonitor`.

---

### `NssLibsSharedHelperEventHandlerApi`

The following methods uses the following base structure for the examples:

```lua
local event_name = 'your_event_name'
local resource_name = GetCurrentResourceName()

local callback = function(...)
    print('Event ' .. tostring(event_name) .. ' for ' .. tostring(resource_name) .. 'is triggered:', ...)
end

local event_handler_api = SERVER_HELPER:addEventHandler(event_name, callback, resource_name)
```

---

#### `getResourceName()`

New since version 0.35.0

**Returns** the resource name of the event handler api as `string`.

```lua
print(event_handler_api:getResourceName())
-- Output: 'resource_name_of_the_owning_resource'
```

---

#### `setCustomData()`

New since version 0.35.0

- `key` (_string_ or _number_) - The key to set.
- `value` (_any_) - The value to set.

**Returns** the event handler `NssLibsSharedHelperEventHandlerApi`.

```lua
event_handler_api:setCustomData('my_key', 'my_value')
print(event_handler_api:getCustomData('my_key'))
-- Output: 'my_value'
```

---

#### `getCustomData()`

New since version 0.35.0

- `key` (_string_ or _number_) - The key to set.

**Returns** the value of the custom data as `any`.

```lua
event_handler_api:setCustomData('my_key', 'my_value')
print(event_handler_api:getCustomData('my_key'))
-- Output: 'my_value'
```

---

#### `addSourceToCallback()`

New since version 0.35.0

For server side only. Adds the source as first argument to the callback.

**Returns** the event handler `NssLibsSharedHelperEventHandlerApi`.

```lua
local event_name = 'your_event_name'
local resource_name = GetCurrentResourceName()

local callback = function(source, ...)
    print('Source:', source, 'Event ' .. tostring(event_name) .. ' for ' .. tostring(resource_name) .. 'is triggered:', ...)
end

local event_handler_api = SERVER_HELPER:addEventHandler(event_name, callback, resource_name)
event_handler_api:addSourceToCallback()
```

---

#### `doNotAddSourceToCallback()`

New since version 0.35.0

For server side only. Do not add the source as first argument to the callback (default).

**Returns** the event handler `NssLibsSharedHelperEventHandlerApi`.

```lua
local event_name = 'your_event_name'
local resource_name = GetCurrentResourceName()

local callback = function(...)
    print('Event ' .. tostring(event_name) .. ' for ' .. tostring(resource_name) .. 'is triggered:', ...)
end

local event_handler_api = SERVER_HELPER:addEventHandler(event_name, callback, resource_name)
event_handler_api:doNotAddSourceToCallback()
```

---

#### `enable()`

Enables the event handler so all registered callbacks will be called when the event is triggered.

**Returns** the event handler `NssLibsSharedHelperEventHandlerApi`.

```lua
event_handler_api:disable()
TriggerEvent('your_event_name', 'Hello World 1')
-- Output: No output because the event handler is disabled

event_handler_api:enable()
TriggerEvent('your_event_name', 'Hello World 2 ')
-- Output: "Event your_event_name for your_resource_name is triggered: Hello World 2"
```

---

#### `disable()`

Do the opposite of `enable()`.

{% hint style="info" %}
Disabled event handlers are still existing and are registered in the system but will not be called when the event is
triggered.
{% endhint %}

**Returns** the event handler `NssLibsSharedHelperEventHandlerApi`.

```lua
event_handler_api:enable()
TriggerEvent('your_event_name', 'Hello World 2 ')
-- Output: "Event your_event_name for your_resource_name is triggered: Hello World 2"

event_handler_api:disable()
TriggerEvent('your_event_name', 'Hello World 1')
-- Output: No output because the event handler is disabled
```

#### `isEnabled()`

**Returns** `true` if the event handler is enabled. Otherwise `false`.

```lua
event_handler_api:disable()
local is_enabled = event_handler_api:isEnabled()
print(is_enabled) -- false

event_handler_api:enabled()
is_enabled = event_handler_api:isEnabled()
print(is_enabled) -- true
```

---

#### `isDisabled()`

**Returns** `true` if the event handler is disabled. Otherwise `false`.

```lua
event_handler_api:disable()
local is_disabled = event_handler_api:isDisabled()
print(is_disabled) -- true

event_handler_api:enabled()
is_disabled = event_handler_api:isDisabled()
print(is_disabled) -- false
```

---

#### `destroy()`

Removes the event handler from the system.

{% hint style="info" %}
Destroyed event handlers does not exist anymore and are not registered in the system anymore. They can not be
re-enabled.
{% endhint %}

**Returns** nothing.

```lua
TriggerEvent('your_event_name', 'Hello World 1')
-- Output: "Event your_event_name for your_resource_name is triggered: Hello World 1"

Citizen.Wait(1000)

event_handler_api:destroy()
TriggerEvent('your_event_name', 'Hello World 2')
-- Output: No output because the event handler is destroyed

Citizen.Wait(1000)

event_handler_api:enable()
TriggerEvent('your_event_name', 'Hello World 3')
-- Output: No output because the event handler is destroyed and can not be re-enabled
```

---

#### `addAdditionalCallback(callback)`

- `callback` (_function_) - The additional callback to add.
    - If the callback returns `false` other additional callbacks registered after this callback will not be called.

**Returns** the event handler `NssLibsSharedHelperEventHandlerApi`.

```lua
local additional_callback = function(...)
    print('Additional callback:', ...)
end

event_handler_api:addAdditionalCallback(additional_callback)

TriggerEvent('your_event_name', 'Hello World')

-- Output:
-- "Event your_event_name for your_resource_name is triggered: Hello World" because of the first callback that created the event handler
-- "Additional callback: Hello World"
```

---

#### `getEventHandlerReference()`

**Returns** the original event handler reference of type `any`.

```lua
local event_handler_reference = event_handler_api:getEventHandlerReference()
print(event_handler_reference) -- (some reference)
```

---

#### `getUid()`

**Returns** the unique id of the event handler api instance as `number`.

```lua
local event_handler_uid = event_handler_api:getUid()
print(event_handler_uid) -- (some unique id)
```

---

### `NssLibsSharedHelperCallbackHandlerCbApi`

The following methods uses the following base structure for the examples:

```lua
local callback = function(a, b, c)
    print(a, b, c)
end

local resource_name = GetCurrentResourceName()

local callback_api = SERVER_HELPER.createCallbackApi(callback, resource_name)
```

---

#### `enable()`

Enables the callback so if called it will be executed (except the callback was destroyed).

**Returns** the callback api `NssLibsSharedHelperCallbackHandlerCbApi`.

```lua
callback_api:disable()
callback_api:call(1, 2, 3)
-- Output: No output because the callback api is disabled

callback_api:enable()
callback_api:call(1, 2, 3)
-- Output: "1, 2, 3"
```

---

#### `disable()`

Disables the callback so if called it will not be executed.

{% hint style="info" %} Disabled callback apis are still existing and are registered in the system but will not be
called when the callback api is called. {% endhint %}

**Returns** the callback api `NssLibsSharedHelperCallbackHandlerCbApi`.

```lua
callback_api:disable()
callback_api:call(1, 2, 3)
-- Output: No output because the callback api is disabled

callback_api:enable()
callback_api:call(1, 2, 3)
-- Output: "1, 2, 3"
```

---

#### `isEnabled()`

**Returns** `true` if the callback api is enabled (and not destroyed).

```lua
callback_api:enable()
print(tostring(callback_api:isEnabled())) -- true

callback_api:disable()
print(tostring(callback_api:isEnabled())) -- false
```

---

#### `isDisabled()`

**Returns** `true` if the callback api is disabled (or destroyed).

```lua
callback_api:disable()
print(tostring(callback_api:isDisabled())) -- true

callback_api:enable()
print(tostring(callback_api:isDisabled())) -- true
```

---

#### `isDestroyed()`

**Returns** `true` if the callback api is destroyed.

```lua
callback_api:destroy()
print(tostring(callback_api:isDestroyed())) -- true
```

---

#### `getResourceName()`

**Returns** the resource name of the callback api as `string`.

```lua
local resource_name = callback_api:getResourceName()
print(resource_name) -- 'resource_name_of_the_owning_resource'
```

---

#### `getUid()`

**Returns** the unique identifier of the callback api as `number`.

```lua
local uid = callback_api:getUid()
print(uid) -- 'uid_of_the_callback_api'
```

---

#### `destroy()`

Destroys the callback api, so it can not be used anymore.

**Returns** the callback api `NssLibsSharedHelperCallbackHandlerCbApi`.

```lua
callback_api:destroy()
```

---

#### `onDestroy(on_destroy_callback)`

- `on_destroy_callback` (_function_) - The callback to call when the callback api is destroyed. If the callback
  returns `true` the
  destroy process will be canceled.

**Returns** the callback api `NssLibsSharedHelperCallbackHandlerCbApi`.

```lua
local on_destroy_callback = function(callback_api)
    print('Callback api destroyed', tostring(callback_api:getUid()))
    -- Output: Callback api destroyed, uid_of_the_callback_api
end

callback_api:onDestroy(on_destroy_callback)

callback_api:destroy()
```

---

#### `call(...)`

- `...` (_varargs_, _optional_) - The variable arguments to pass to the callback.

Calls the original callback with the given arguments. If the callback api is disabled or destroyed the callback will not
be called.

**Returns** the result of the callback.

```lua
callback_api:call(1, 2, 3)
-- Output: "1, 2, 3"
```
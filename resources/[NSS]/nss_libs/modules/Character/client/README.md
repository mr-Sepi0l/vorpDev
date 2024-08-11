# nss_libs - Client side character API

## Import

```lua
---@type NssLibsClientCharacterApi
character_client_api = exports.nss_libs:getClientCharacterApi(GetCurrentResourceName())
```

---

## Methods

### `listenSelectedCharacter(callback, on_destroy_callback)`

- `callback` (_function_) - The callback function that will be called when a character is selected.
    - `char_id` (_number_) - The character id of the selected character.
- `on_destroy_callback` (_function_, _optional_) - The callback function that will be called when the listener is
  destroyed.
    - `event_handler_api` (_[NssLibsSharedHelperEventHandlerApi]_) - The event handler api instance.
    - If the callback returns `false` the listener will not be destroyed.

**Returns** an [NssLibsSharedHelperEventHandlerApi] instance. The listener is initially active.

```lua
character_client_api:listenSelectedCharacter(function(char_id)
    print('Selected character id: ' .. char_id)
    -- DO YOUR STUFF HERE
end)
```

```lua
local callback = function(char_id)
  print('Selected character id: ' .. char_id)
  -- DO YOUR STUFF HERE
end

local on_destroy_callback = function(event_handler_api)
  local listener_uid = event_handler_api:getUid()
  print('Listener ' .. tostring(listener_uid) .. ' is destroyed')
end

local selected_character_listener = character_client_api:listenSelectedCharacter(function(char_id)
    print('Selected character id: ' .. char_id)
    -- DO YOUR STUFF HERE
end)

Citizen.Wait(10000)

-- This disables the listener temporarily
selected_character_listener:disable()

Citizen.Wait(10000)

-- This re-enables the listener (if not destroyed before)
selected_character_listener:enable()

Citizen.Wait(10000)

-- This will destroy the listener and call the on_destroy_callback (if set)
selected_character_listener:destroy()
```

---

### `resetAllSelectedCharacterListener()`

Resets only all "on selected character" event handler of the given resource name.

**Returns** the current used [NssLibsClientCharacterApi] instance.

```lua
character_client_api:resetAllSelectedCharacterListener()
```

---

### `resetApi()`

Resets the whole character api for the given resource name.

**Returns** the current used [NssLibsClientCharacterApi] instance.

```lua
character_client_api:resetApi()
```

---

[NssLibsSharedHelperEventHandlerApi]: ../../Helper/share/README.md#NssLibsSharedHelperEventHandlerApi

[NssLibsClientCharacterApi]: ./README.md#Methods

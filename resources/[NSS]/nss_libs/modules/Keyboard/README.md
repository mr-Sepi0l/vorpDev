# Keyboard Events

The __Keyboard__ module was designed for **easy use** in your scripts and to ensure **high performance**.

Especially the performance is very important. The module should prevent loops from
running in several scripts that query whether various keys have been pressed.
The module has a loop that can be used by all. This main loop is resource-saving and only
queries keys that have been registered in the event procedure for observation in the module.

Note: If the dependent resource stops all listeners of that resource will be removed automatically.

-----------------------------------------------------------------

## How to use

__Simple example__

```lua
---@type NssLibsKeyboardApi
local keyboard_api = exports.nss_libs:getKeyboardApi(GetCurrentResourceName())

---@param listener_api NssLibsKeyboardKeyListenerApi
local on_press_b = function(listener_api)
    print('B was pressed', listener_api.listener_id)
end

keyboard_api.onKeyDown(keyboard_api.Keys.B, on_press_b)
```

__Extended example__

```lua
---@type NssLibsKeyboardApi
local keyboard_api = exports.nss_libs:getKeyboardApi(GetCurrentResourceName())

----@type NssLibsKeyboardKeyListenerApi
local key_n_listener_api, key_l_listener_api, key_i_listener_api

key_n_listener_api = keyboard_api.onKeyDown(keyboard_api.Keys.N, function(listener_api)
    print('N pressed, disable N key, enable L key', listener_api.listener_id)
    key_n_listener_api.off()
    key_l_listener_api.on()
end)

key_l_listener_api = keyboard_api.onKeyDown(keyboard_api.Keys.L, function(listener_api)
    print('L pressed, disable L key, enable N key', listener_api.listener_id)
    key_n_listener_api.on()
    key_l_listener_api.off()
end)

key_i_listener_api = keyboard_api.onKeyDown(keyboard_api.Keys.I, function(listener_api)
    print('I pressed, remove all key listener', listener_api.listener_id)
    key_n_listener_api.remove()
    key_l_listener_api.remove()
    key_i_listener_api.remove()
end)

key_l_listener_api.off()
```

-----------------------------------------------------------------

## Method reference

### Object `NssLibsKeyboardApi`

A standalone object which contains functions to create key listeners.

__Getting the object__

```lua
---@type NssLibsKeyboardApi
local keyboard_api = exports.nss_libs:getKeyboardApi(GetCurrentResourceName())
```

__Methods and properties__

- `onKeyDown(key_hash, on_press_callback)` Creates a new key listener and returns `NssLibsKeyboardKeyListenerApi` object.
   - `key_hash` The hash number of the key that should listen to.
   - `on_press_callback(listener_api)` The callback which gets fired if the listened key was pressed.
      - `listener_api` is `NssLibsKeyboardKeyListenerApi` object.
- `Keys` A table with all key hashes. See `NssLibsKeyboardKeyMap` for more information or the config.lua file.


### Object `NssLibsKeyboardKeyListenerApi`

A standalone object which contains some information and functions.

- `listender_id` _number_ Identifier of key listener.
- `key_hash` _number_ The hash number of the listened key.
- `remove()` _function_ Method to remove the listener.
- `on()` _function_ Method to (re)activate listener.
- `off()` _function_ Method to deactivate listener.
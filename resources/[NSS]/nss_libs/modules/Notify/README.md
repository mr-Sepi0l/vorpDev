# nss_libs - Notify

This is a library for display notifications on the screen.

## Example

### client.lua

```lua
-- Getting the API
---@type NssLibsNotifyApi
NOTIFY = exports.nss_libs:getNotifyApi()

-- Define a duration (in milliseconds). All notify methods have a duration argument, but this is optional.
local duration_in_ms = 5000 -- 5 seconds

------------------------------------------------------------------------------------
-- Example for alert
------------------------------------------------------------------------------------

NOTIFY:alert('What the fuck!?', 'Something gone really wrong', duration_in_ms)

------------------------------------------------------------------------------------
-- Example for success
------------------------------------------------------------------------------------

NOTIFY:success('Cool!', 'You made it', duration_in_ms)

------------------------------------------------------------------------------------
-- Example for custom notify
------------------------------------------------------------------------------------

-- See https://github.com/femga/rdr3_discoveries/tree/f729ba03f75a591ce5c841642dc873345242f612/useful_info_from_rpfs/textures for available textures
-- See https://github.com/femga/rdr3_discoveries/tree/7149acf64a4784afa4582afdd1b0009a137aed50/useful_info_from_rpfs/colours for available colors
local icon_dict = 'hud_textures'
local icon_name = 'check'
local color = 'COLOR_WHITE'

local priority = true -- Clears all other messages and show the new one instant

NOTIFY:notify('Attention', 'You are great', duration_in_ms, icon_dict, icon_name, color, priority)

------------------------------------------------------------------------------------
-- Example for tip right
------------------------------------------------------------------------------------

NOTIFY.tipRight('Tip', 'If you eat you will get fat!', duration_in_ms)

```

All notify methods having default styles, but you can override them by passing a table as the last argument.

```lua
NOTIFY:setDefaultSuccessStyle('YOUR_ITEM_DICT', 'YOUR_ITEM_NAME', 'YOUR_COLOR')
NOTIFY:setDefaultAlertStyle('YOUR_ITEM_DICT', 'YOUR_ITEM_NAME', 'YOUR_COLOR')
NOTIFY:setDefaultNotifyStyle('YOUR_ITEM_DICT', 'YOUR_ITEM_NAME', 'YOUR_COLOR')
```
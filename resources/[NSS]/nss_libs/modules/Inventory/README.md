# nss_libs - Inventory

This module contains an inventory api that wraps inventories from other frameworks like Vorp.

## How to use

### Client side

```lua
-- Gets the client api.
---@type NssLibsInventoryClientApi
inventory_client = exports.nss_libs:getClientInventoryApi(GetCurrentResourceName())

-- Use item of with inventory item id 12 and item name 'coal'.
inventory_client:useItem(12, 'coal')
```

### Server side

```lua
-- Gets the server api.
---@type NssLibsInventoryApi
inventory = exports.nss_libs:getInventoryApi(GetCurrentResourceName())

local server_player_id = 12 -- Just an example.

-- Add 1 coal to the inventory.
inventory:addItem(server_player_id, 'coal', 1)

-- Gets all items from the user inventory.
---@type NssLibsInventoryNamedUserInventoryItemList|nil
local user_inventory_items = inventory:getUserInventory(server_player_id)
```

# TODO

- [ ] Complete the readme
- [ ] Create a client version that automatically triggers the server version - but keep in mind this can be a security
  risk!!!
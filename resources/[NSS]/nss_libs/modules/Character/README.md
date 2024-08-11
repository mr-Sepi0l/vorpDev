# nss_libs - Character

This module contains a character api that wraps characters from other frameworks like VorpCore. It offers
some additional information like Steam ID, Discord ID, etc.

For client and server there are different helper libraries. The client helper is used for client side and the server
helper is used for server side.

* [Client Character](./client/README.md)
* [Server Character](./server/README.md)

## How to use

### Client

### Server

```lua
local name_of_admin_group = 'admin'
local example_player_id = 99 -- The server player id of a joined player

---@type NssLibsCharacterApi
character_api = exports.nss_libs:getCharacterApi(GetCurrentResourceName(), name_of_admin_group)

-- Add some money
character_api:addMoney(example_player_id, 1000)

-- Remove some money
character_api:subMoney(example_player_id, 999)

-- Check for money
if character_api:hasMoney(example_player_id, 1) then
    print('Player has at least 1 money')
end

-- Get some information
print(character_api:getDiscordProfileUrl(example_player_id))
print(character_api:getSteamId(example_player_id))
print(character_api:getRedmCharacterName(example_player_id))
```

# TODO

- [ ] Consider config und config.demo
- [ ] Complete readme
# nss_libs - Client side character API

## Import

```lua
-- Example name of admin group, if you do not have an admin group you can use a not used group name.
local name_of_admin_group = 'admin'

---@type NssLibsCharacterApi
character_api = exports.nss_libs:getCharacterApi(GetCurrentResourceName(), name_of_admin_group)
```

---

## Methods

### `addMoney(_source, amount)`

- `_source` (_integer_) - The server player id of a joined player.
- `amount` (_float_) - The amount of money to add.

**Returns** nothing.

```lua
local example_player_id = 99 -- The server player id of a joined player
character_api:addMoney(example_player_id, 1000)
```

---

### `getCharacterByName(character_name)`

- `character_name` (_string_) - The full character name to search for.

__Important__: This method loads the data from the database and not from the VORP (or other framework) cache. In case of
VORP a change of group or job will be not saved at the moment the job or group is changed.

**Returns** an [NssLibsCharacterItem] instance or `nil` if not found.

```lua
local full_name = 'John Doe'
local character = character_api:getCharacterByName(full_name)

if character then
    print('Character found: ' .. tostring(character.char_id) .. ' :)')
else
    print('Character ' .. tostring(full_name) .. ' found :(')
end
```

---

### `getCharacterByCharId(char_id)`

- `char_id` (_integer_) - The character id to search for.

__Important__: This method loads the data from the database and not from the VORP (or other framework) cache. In case of
VORP a change of group or job will be not saved at the moment the job or group is changed.

**Returns** an [NssLibsCharacterItem] instance or `nil` if not found.

```lua
local char_id = 1
local character = character_api:getCharacterByCharId(char_id)

if character then
    print('Character found: ' .. tostring(character.full_name) .. ' :)')
else
    print('Character ' .. tostring(char_id) .. ' found :(')
end
```

---

### `getCharData(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** an [NssLibsCharacterItem] instance or `nil` if not found.

```lua
local example_player_id = 99 -- The server player id of a joined player
local character = character_api:getCharData(example_player_id)

if character then
    print('Character found: ' .. tostring(character.full_name) .. ' :)')
else
    print('Character ' .. tostring(example_player_id) .. ' found :(')
end
```

---

### `getDiscordId(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** a `string` with the discord id.

```lua
local example_player_id = 99 -- The server player id of a joined player
local discord_id = character_api:getDiscordId(example_player_id)

print('Discord id: ' .. discord_id)
```

---

### `getDiscordProfileUrl(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** a `string` with the discord profile url.

```lua
local example_player_id = 99 -- The server player id of a joined player
local discord_profile_url = character_api:getDiscordProfileUrl(example_player_id)

print('Discord profile url: ' .. discord_profile_url)
```

---

### `getFivmId(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** a `string` with the fivem id.

```lua
local example_player_id = 99 -- The server player id of a joined player
local fivem_id = character_api:getFivmId(example_player_id)

print('Fivem id: ' .. fivem_id)
```

---

### `getIdentifiers(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** an [NssLibsCharacterIdentifiers] instance.

```lua
local example_player_id = 99 -- The server player id of a joined player
local identifiers = character_api:getIdentifiers(example_player_id)

print('Steam id: ' .. identifiers.steam)
print('Discord id: ' .. identifiers.discord)
```

### `getIp(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** a `string` with the ip.

```lua
local example_player_id = 99 -- The server player id of a joined player
local ip = character_api:getIp(example_player_id)

print('Ip: ' .. ip)
```

---

### `getRedmCharacterName(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** a `string` with the redm character name.

```lua
local example_player_id = 99 -- The server player id of a joined player
local redm_character_name = character_api:getRedmCharacterName(example_player_id)

print('Redm character name: ' .. redm_character_name)
```

---

### `getSteamId(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** a `string` with the steam id.

```lua
local example_player_id = 99 -- The server player id of a joined player
local steam_id = character_api:getSteamId(example_player_id)

print('Steam id: ' .. steam_id)
```

---

### `getSteamProfileUrl(_source)`

- `_source` (_integer_) - The server player id of a joined player.

**Returns** a `string` with the steam profile url.

```lua
local example_player_id = 99 -- The server player id of a joined player
local steam_profile_url = character_api:getSteamProfileUrl(example_player_id)

print('Steam profile url: ' .. steam_profile_url)
```

---

### `hasMoney(_source, amount)`

- `_source` (_integer_) - The server player id of a joined player.
- `amount` (_float_) - The amount of money to check for.

**Returns** a `boolean` if the player has the amount of money.

```lua
local example_player_id = 99 -- The server player id of a joined player
if character_api:hasMoney(example_player_id, 1.99) then
    print('Player has at least 1.99 money')
end
```

---

### `subMoney(_source, amount)`

- `_source` (_integer_) - The server player id of a joined player.
- `amount` (_float_) - The amount of money to remove.

**Returns** nothing.

```lua
local example_player_id = 99 -- The server player id of a joined player
character_api:subMoney(example_player_id, 999)
```

---

### `addGold(_source, amount)`

- `_source` (_integer_) - The server player id of a joined player.
- `amount` (_float_) - The amount of gold to add.

**Returns** nothing.

```lua
local example_player_id = 99 -- The server player id of a joined player
character_api:addGold(example_player_id, 1000.29)
```

--- 

### `hasGold(_source, amount)`

- `_source` (_integer_) - The server player id of a joined player.
- `amount` (_float_) - The amount of gold to check for.

**Returns** a `boolean` if the player has the amount of gold.

```lua
local example_player_id = 99 -- The server player id of a joined player
if character_api:hasGold(example_player_id, 1.99) then
    print('Player has at least 1.99 gold')
end
```

---

### `subGold(_source, amount)`

- `_source` (_integer_) - The server player id of a joined player.
- `amount` (_float_) - The amount of gold to remove.

**Returns** nothing.

```lua
local example_player_id = 99 -- The server player id of a joined player
character_api:subGold(example_player_id, 999.99)
```

---

### `onGroupChange(callback)`

Since version `0.33.0`.

- `callback` (_function_) - The function to call when the group changes.
    - `source` (_integer_) - The server player id of a joined player.
    - `char_id` (_string_) - The character id of the player.
    - `new_group` (_string_) - The new group of the player.

**Returns** `NssLibsSharedHelperEventHandlerApi`.

```lua
local event_handler = character_api:onGroupChange(function(source, char_id, new_group)
    print('Group changed for ' .. char_id .. ' to ' .. new_group)
end)
```

---

### `onJobChange(callback)`

Since version `0.33.0`.

- `callback` (_function_) - The function to call when the job changes.
    - `source` (_integer_) - The server player id of a joined player.
    - `char_id` (_string_) - The character id of the player.
    - `new_job` (_string_) - The new job of the player.

**Returns** `NssLibsSharedHelperEventHandlerApi`.

```lua
local event_handler = character_api:onJobChange(function(source, char_id, new_job)
    print('Job changed for ' .. char_id .. ' to ' .. new_job)
end)
```

---

### `onJobGradeChange(callback)`

Since version `0.33.0`.

- `callback` (_function_) - The function to call when the job grade changes.
    - `source` (_integer_) - The server player id of a joined player.
    - `char_id` (_string_) - The character id of the player.
    - `new_job_grade` (_integer_) - The new job grade of the player.

**Returns** `NssLibsSharedHelperEventHandlerApi`.

```lua
local event_handler = character_api:onJobGradeChange(function(source, char_id, new_job_grade)
    print('Job grade changed for ' .. char_id .. ' to ' .. new_job_grade)
end)
```

---

### `getSteamIdOfChar(char_id)`

Since version `0.33.0`.

- `char_id` (_integer_) - The character id to search for.

**Returns** a `string` with the steam id or `nil` if not found.

```lua
local char_id = 205
local steam_id = character_api:getSteamIdOfChar(char_id)

if steam_id then
    print('Steam id: ' .. steam_id)
else
    print('Steam id not found')
end
```

---

### `getSourceOfChar(char_id)`

Since version `0.33.0`.

- `char_id` (_integer_) - The character id to search for.

**Returns** a `number` with server player id or `nil` if not found.

```lua
local char_id = 205
local server_player_id = character_api:getSourceOfChar(char_id)

if server_player_id then
    print('Server player id: ' .. server_player_id)
else
    print('Server player id not found')
end
```

---

## Objects

### `NssLibsCharacterItem`

#### Properties

- `char_id` (_integer_)
- `group` (_string_)
- `job` (_string_)
- `job_grade` (_integer_)
- `firstname` (_string_)
- `lastname` (_string_)
- `full_name` (_string_)
- `money` (_float_)
- `is_admin` (_boolean_)
- `server_player_id` (_integer_, _nil_)

---

#### Methods

##### `hasOneOfTheJobs(jobs)`

- `jobs` (_NssLibsCharacterJobList|NssLibsCharacterJobName[]_) - The job list or job names to check for. The job names
  are case-sensitive.

**Returns** a `boolean` if the character has one of the jobs.

```lua
-- Simple job list
local jobs = { 'police', 'ambulance' }

if char_data:hasOneOfTheJobs(jobs) then
    print('Character has one of the jobs')
end
```

```lua
--- Job list with job grades
local jobs = {
    ["police"] = 3,
    ["ambulance"] = 2
}

if char_data:hasOneOfTheJobs(jobs) then
    print('Character has one of the jobs with the correct grade')
end
```

---

##### `hasJob(job)`

- `job` (_NssLibsCharacterJobName_) - The job name to check for. The job name is case-sensitive.

**Returns** a `boolean` if the character has the job.

```lua
local job = 'police'

if char_data:hasJob(job) then
    print('Character has the job')
end
```

---

##### `hasJobGrade(grade)`

- `grade` (_integer_) - The job grade to check for.

**Returns** a `boolean` if the character has the job grade.

```lua
local grade = 3

if char_data:hasJobGrade(grade) then
    print('Character has the job grade')
end
```

---

##### `isEmployed()`

**Returns** a `boolean` if the character has a job.

```lua
if char_data:isEmployed() then
    print('Character has a job')
end
```

### `NssLibsCharacterIdentifiers`

#### Properties

- `steam` (_string_)
- `license` (_string_)
- `xbl` (_string_)
- `live` (_string_)
- `discord` (_string_)
- `fivem` (_string_)
- `license2` (_string_)
- `ip` (_string_)

---

[NssLibsCharacterItem]: #nsslibscharacteritem

[NssLibsCharacterIdentifiers]: #nsslibscharacteridentifiers
# nss_libs - Database

This is a library for executing database queries.

## Example

### server.lua

```lua
-- Getting the API
---@type NssLibsDatabase
DB = exports.nss_libs:getDatabase()

------------------------------------------------------------------------------------
-- Async example
-- The query does not block the thread/script.
------------------------------------------------------------------------------------
local query_a = 'SELECT * FROM users WHERE id = @id' -- @id is the placeholder for the parameter id.

local params_a = {
  id = 1
}

local on_result_a = function(result)
  print('Async Result', table.unpack(result))
end

DB:asyncQuery(query_a, params_a, on_result_a)

------------------------------------------------------------------------------------
-- Sync example
-- The query blocks the thread/script until the result is received.
------------------------------------------------------------------------------------
local query_s = 'SELECT * FROM users WHERE id = @id' -- @id is the placeholder for the parameter id.

local params_s = {
  id = 1
}

local result_s = DB:query(query_s, params_s)

print('Sync result', table.unpack(result_s))

------------------------------------------------------------------------------------
-- Example without parameters
------------------------------------------------------------------------------------

local query_p = 'SELECT * FROM users'

local result_p = DB:query(query_p)

print('Sync result without parameters', table.unpack(result_p))
```

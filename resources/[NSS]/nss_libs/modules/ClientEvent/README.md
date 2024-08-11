# nss_libs - ClientEvent

This is a library for sending events to the client in synchronous and asynchronous ways optionally waiting for a
response.

## Example

### client.lua

Listen clients from the server.

```lua
-- Gets the client listener api.
---@type ClientListenerApi
client_listener_api = exports.nss_libs:getClientListenerApi(GetCurrentResourceName())

-- Register a listener for the event "test" and return the result.
---@param _source number The identifier of the client that fired the event.
---@param times number Example argument.
client_listener_api:addListener('test', function(_source, times)

    local result = {}

    for _ = 1, times do
        table.insert(result, 'Hello from client')
    end

    print('Client Result', table.unpack(result))

    return result
end)
```

### server.lua

Fires events to the client.

```lua
-- Gets the client event api.
---@type ClientEventApi
client_event_api = exports.nss_libs:getClientEventApi(GetCurrentResourceName())

Citizen.CreateThread(function()

    local player_id = 1
    local times = 3

    -- Example awaits result and blocks the thread as long as no result response is received.
    -- The client event works like a synchronous function call.
    -- It is not allowed to fire this to all players in one call.
    local data = client_event_api:await("test", player_id, times)
    print('Client Result', table.unpack(data))

    -- The callback is executed async on client response.
    -- Example does not await result and does not block the thread. 
    -- It is not allowed to fire this to all players in one call.
    ---@param response_data any|table
    client_event_api:async("test", player_id, function(response_data)
        print('Client Result', table.unpack(response_data))
    end, times)

    -- Example fires a global client event and does not wait for a result.
    -- Example does not await result and does not block the thread.
    -- If player_id is nil or -1 the event will be fired to all players.
    client_event_api:fire("test", player_id, times)

    -- Example fires a global client event to all players and does not wait for a result.
    -- Example does not await result and does not block the thread.
    client_event_api:fireToAll("test", times)

end)
```
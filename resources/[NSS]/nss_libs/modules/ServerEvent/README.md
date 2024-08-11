# nss_libs - ServerEvent

This is a library for sending events to the server in synchronous and asynchronous ways optionally waiting for a
response.

## Communication example

Fires events to the server.

### client.lua

```lua
-- Gets the server event api.
---@type ServerEventApi
server_event_api = exports.nss_libs:getServerEventApi(GetCurrentResourceName())

Citizen.CreateThread(function()

    local times = 3

    -- Example awaits result and blocks the thread as long as no result response is received.
    -- The server event works like a synchronous function call.
    local data = server_event_api:await("test", times)
    print('Client Result', table.unpack(data))

    -- The callback is executed async on server response.
    -- Example does not await result and does not block the thread. 
    ---@param response_data any|table
    server_event_api:async("test", function(response_data)
        print('Client Result', table.unpack(response_data))
    end, times)

    -- Example fires a global server event and does not wait for a result.
    -- Example does not await result and does not block the thread.
    server_event_api:fire("test", times)

end)
```

### server.lua

Listen events from the client.

```lua
-- Gets the server listener api.
---@type ServerListenerApi
client_listener_api = exports.nss_libs:getServerListenerApi(GetCurrentResourceName())

-- Register a listener for the event "test" and return the result.
---@param _source number The identifier of the client that fired the event.
---@param times number Example argument.
client_listener_api:addListener('test', function(_source, times)

    local result = {}

    for _ = 1, times do
        table.insert(result, 'Hello from server')
    end

    print('Server Result', table.unpack(result))

    return result
end)
```

## "on server ready" example

Executes callback on client side if the server triggers that he is ready.

### client.lua

```lua
-- Gets the server event api.
---@type ServerEventApi
server_event_api = exports.nss_libs:getServerEventApi(GetCurrentResourceName())

Citizen.CreateThread(function()

    ---@type NssLibServerEventApiOnServerReadyCallback
    local on_server_ready = function(timout, ...)
        
        if timout == true then
            print('Server is not ready within 10 seconds')
            return
        end
        
        print('Server is ready')
        
        -- Do your stuff here. E.g. call the run() function of your main script.
    end

    local interval_in_ms = 1000 -- Optional, checking interval_in_ms in ms. Default is 1000ms (1s).
    local timeout_in_ms = 10000 -- Optional, timeout_in_ms in ms. Default is 30000ms (30s).

    server_event_api:onServerReady(on_server_ready, interval_in_ms, timeout_in_ms)
end)
```

### server.lua

```lua
-- Gets the server listener api.
---@type ServerListenerApi
client_listener_api = exports.nss_libs:getServerListenerApi(GetCurrentResourceName())

Citizen.CreateThread(function()

    -- Example do 5 seconds something and then fires "i am ready" event.
    Citizen.Wait(5000)
    
    client_listener_api:serverIsReady()

end)
```

You can add arguments to the `serverIsReady(true, false, 'whatever')` function. The arguments will be passed to the onServerReady callback.

## How it works

In client scripts `local server_event_api = exports.nss_libs:getServerEventApi(GetCurrentResourceName())` returns a
client scoped event api.

That api can be used to fire events to the server. But not to listen to server events (see ClientEvent for that case).

If an event is fired to the server, the server will execute the server side registered listener for that event and
return the result. Each fired event has a unique request id. The client will wait for the result with that id and
process the result. The server sends the response only to the source client that fired the event.
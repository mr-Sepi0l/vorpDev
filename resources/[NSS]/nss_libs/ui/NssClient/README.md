# nss_libs - NssClient

This ui component is used to communicate between the browser user interface (NUI) and the game client.

## NUI Usage

### ES6 module import

For `NssUiApi` usage, please see the [README.md](../README.md#load-components-via-api) of the `nss_libs/ui` folder.

Alternative example of direct ES6 module import:

```javascript
import {NssClient} from "nui://nss_libs/ui/NssClient/NssClient.js";
```

------------------------------------------------------------------

### Create instance

```javascript
/**
 * @type {NssClient}
 */
const nss_client = new NssClient('YOUR_RESOURCE_NAME');
```

Ensure that the resource name is the identical and correct name of your resource folder because it is used for paths.

------------------------------------------------------------------

### Send simple message

```javascript
/**
 * @type {NssClient}
 */
const nss_client = new NssClient('YOUR_RESOURCE_NAME');

const request_data = {
    // Your data here...
    example: "Hello World!"
};

nss_client.post('EVENT_NAME', request_data);
```

------------------------------------------------------------------

### Send message with callback

```javascript
/**
 * @type {NssClient}
 */
const nss_client = new NssClient('YOUR_RESOURCE_NAME');

const request_data = {
    // Your data here...
    example: "Hello World!"
};

/**
 * @param {NssClientMessageResponse} response_data
 */
const response_callback = (response_data) => {
    // Do your stuff here...
};

nss_client.post('EVENT_NAME', request_data, response_callback);
```

`request_data` will be automatically extended with property `response_event_type`. You must have to response directly
to the request. Use the `response_event_type` as value of `type` of `response_data`. This ensures the response is linked
to the related request callback.

------------------------------------------------------------------

### Listen to client messages

```javascript
/**
 * @type {NssClient}
 */
const nss_client = new NssClient('YOUR_RESOURCE_NAME');

nss_client.on('EVENT_NAME', (request_data) => {
    // Do your stuff here...
});
```

Only one callback is allowed per event type. If you want to add more callbacks, you have to add a wrapper callback that
manage the different callbacks.

------------------------------------------------------------------

### Standard close message

```javascript
/**
 * @type {NssClient}
 */
const nss_client = new NssClient('YOUR_RESOURCE_NAME');

nss_client.close();
```

This will send a message to the client with the event name `close`. Often used to close the NUI by the client.

------------------------------------------------------------------

### Use mock for local development

Import the `NssClient` as shown above and use the following code to use the mock instead of the real client.

```javascript
/**
 * @type {NssClientMock}
 */
const nss_client = await NssClient.mockFactory('YOUR_RESOURCE_NAME');

// ----------------------------------------------------------------------------- //
// Case A: Simulate an event triggered in LUA client
// ----------------------------------------------------------------------------- //

nss_client.simulateClientToNuiEvent('EVENT_NAME', {example: "Hello World!"});

// ----------------------------------------------------------------------------- //
// Case B: Catches post calls from and simulates a response (like a server or 
// LUA client).
// ----------------------------------------------------------------------------- //

/**
 * @type {NssClientMock~simulatePostResponseCallback}
 */
const simulated_server_response_cb = (request_data) => {

    // Do your stuff here...
    
    // Just an example
    if (request_data.do_it !== true) {
        console.error('Invalid request data!');
        return { done_it: false };
    }

    return { done_it: true };
};

const simulated_response_time_in_ms = 3000;

nss_client.listenPostForResponseSimulation(
    'EVENT_NAME', 
    simulated_server_response_cb, 
    simulated_response_time_in_ms
);

// Do a post and check if the simulated response is called
const request_data = {do_it: true};

const response_cb = (response_data) => {
    console.log('Response data:', response_data.done_it);
};

nss_client.post('EVENT_NAME', request_data, response_cb);
```

------------------------------------------------------------------

## Client Usage

```lua
---@param event_name string
---@param callback fun(request: NssClientRequest):NssClientResponse
local register_nui_callback_wrapper = function(event_name, callback)
    RegisterNUICallback(event_name, callback)
end

---@param response NssClientResponse
local send_nui_message_wrapper = function(response)
    SendNUIMessage(response)
end

---@type NssClientApi
NUI_CLIENT = exports.nss_libs:getNssClientApi(register_nui_callback_wrapper, send_nui_message_wrapper)

---@param request NssClientRequest
NUI_CLIENT.on('EVENT_NAME', function(request)

    -- Do something with request here ...

    return { success = true }
end)

-- Example Send message to NUI
local response_data = {
    y = 'Sample Data',
}

NUI_CLIENT.send('EVENT_NAME', response_data)
```

__Important__

`register_nui_callback_wrapper` and `send_nui_message_wrapper` are wrappers for the native
functions `RegisterNUICallback` and `SendNUIMessage`. You have to provide these functions to the `getNssClientApi`
form your resource. Because the resource where it is declared is responsible for the communication between the
NUI and the game client.
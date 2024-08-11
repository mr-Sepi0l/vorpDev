---@class NssLibsClientCharacterVorp:NssLibsClientCharacterFrameworkBridge
---@field private _selected_character_listener table<string, table<any, NssLibsSharedHelperEventHandlerApiCallback>>
---@field private _events table<string, string>
NssLibsClientCharacterVorp = {
    _events = {
        on_selected_char = "vorp:SelectedCharacter",
    },
    _selected_character_listener = {},
}

--- Listens to selected character event "on selected character" for given resource name.
---
--- IMPORTANT:
--- The NssLibsClientHelper:addEventHandler creates an event listener. Those listeners usually will be automatically
--- destroyed by the system if the resource that created the event listener stops.
--- But nss_libs creates the event listener for that source resource so it will never be destroyed automatically if
--- the source resource stops. So, we need to destroy it manually if the related source resource stops.
---
---@param resource_name string The related source resource name.
---@param callback NssLibsClientCharacterOnSelectedCharCallback The callback function that will be called when the event is triggered.
---@param on_destroy_callback NssLibsSharedHelperEventHandlerApiOnDestroyCallback|nil
---@return NssLibsSharedHelperEventHandlerApi
function NssLibsClientCharacterVorp:listenSelectedCharacter(resource_name, callback, on_destroy_callback)

    if not self._selected_character_listener[resource_name] then
        self._selected_character_listener[resource_name] = {}
    end

    -- Create a bridge callback to map the return values of vorp to the expected return values of nss_libs.
    -- See https://vorpcore.github.io/VORP_Documentation/api/characters#character-selected-event for original event.
    ---@param char_id number
    local bridge_callback = function(char_id)
        char_id = tonumber(char_id)
        callback(char_id)
    end

    ---@type NssLibsSharedHelperEventHandlerApi
    local event_handler_api = NssLibsClientHelper:addEventHandler(
            self._events.on_selected_char,
            bridge_callback,
            resource_name,
            on_destroy_callback
    )

    local event_reference = event_handler_api:getEventHandlerReference()

    -- Save the event handler instance so it can be later destroyed if a reset call is for the related resource.
    self._selected_character_listener[resource_name][event_reference] = event_handler_api

    return event_handler_api
end

-- Resets only listeners for "selected character" events for given resource name.
---@param resource_name string
function NssLibsClientCharacterVorp:resetSelectedCharacterListeners(resource_name)

    if not NssLibsClientHelper:hasTableEntries(self._selected_character_listener[resource_name]) then
        return
    end

    for _, event_handler_api in pairs(self._selected_character_listener[resource_name]) do
        event_handler_api:destroy()
    end

    self._selected_character_listener[resource_name] = {}
end

-- Resets all data related to given resource name.
---@param resource_name string
function NssLibsClientCharacterVorp:reset(resource_name)
    self:resetSelectedCharacterListeners(resource_name)
end

-- Finally register the vorp bridge in the client character api (like dependency injection).
NssLibsClientCharacter:setBridgeToFramework(NssLibsClientCharacterVorp)

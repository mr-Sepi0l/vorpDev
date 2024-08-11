---@class NssLibsClientCharacterFrameworkBridge
---@field listenSelectedCharacter fun(resource_name:string, callback:NssLibsClientCharacterOnSelectedCharCallback, on_destroy_callback:NssLibsSharedHelperEventHandlerApiOnDestroyCallback):NssLibsSharedHelperEventHandlerApi
---@field resetSelectedCharacterListeners fun(resource_name:string):void
---@field reset fun(resource_name:string):void

---@alias NssLibsClientCharacterOnSelectedCharCallback fun(char_id:number):void

---@class NssLibsClientCharacterApi
---@field listenSelectedCharacter fun(callback:NssLibsClientCharacterOnSelectedCharCallback, on_destroy_callback:NssLibsSharedHelperEventHandlerApiOnDestroyCallback):NssLibsSharedHelperEventHandlerApi
---@field resetAllSelectedCharacterListener fun():NssLibsClientCharacterApi
---@field resetApi fun():NssLibsClientCharacterApi


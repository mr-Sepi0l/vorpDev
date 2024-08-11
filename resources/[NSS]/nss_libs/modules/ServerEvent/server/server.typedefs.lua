---@alias NssLibsServerListenerApiListenerCallback fun(_source:any, vararg:any):any

---@class ServerListenerApi
---@field private resource_name string
---@field addListener fun(event_name: string, callback: NssLibsServerListenerApiListenerCallback): ServerListenerReference
---@field removeListener fun(listener_ref: ServerListenerReference): ServerListenerApi
---@field serverIsReady fun(vararg any): ServerListenerApi
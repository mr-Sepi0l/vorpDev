---@alias NssLibServerEventApiOnServerReadyCallback fun(timeout:boolean, vararg any):void

---@class ServerEventApi
---@field resource_name string
---@field fire fun(event_name: string, ...: any): ServerEventApi
---@field async fun(event_name: string, callback: function, ...: any): ServerEventApi
---@field await fun(event_name: string, ...: any): any
---@field onServerReady fun(callback: NssLibServerEventApiOnServerReadyCallback, interval_in_ms: number|nil, timeout_in_ms: number|nil): ServerEventApi
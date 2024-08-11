---@class NssLibsNotify
---@field is_initialized boolean
---@field bridge_api NssLibsNotifyApi|nil
---@field registered_bridges_callbacks NssLibsNotifyBridgeApiGetApiIfExistsCallback[]
---@field max_time_to_wait_in_ms number

---@class NssLibsNotifyApi
---@field alert fun(title:string, message:string, duration_in_ms:number|nil, priority:boolean|nil):NssLibsNotifyApi
---@field success fun(title:string, message:string, duration_in_ms:number|nil, priority:boolean|nil):NssLibsNotifyApi
---@field notify fun(title:string, message:string, duration_in_ms:number|nil, icon_dict:string|nil, icon_name:string|nil, color:string|nil, priority:boolean|nil):NssLibsNotifyApi
---@field tipRight fun(message:string, duration_in_ms:number|nil, priority:boolean|nil):NssLibsNotifyApi
---@field setDefaultSuccessStyle fun(icon_dict:string|nil, icon_name:string|nil, color:string|nil):NssLibsNotifyApi
---@field setDefaultAlertStyle fun(icon_dict:string|nil, icon_name:string|nil, color:string|nil):NssLibsNotifyApi
---@field setDefaultNotifyStyle fun(icon_dict:string|nil, icon_name:string|nil, color:string|nil):NssLibsNotifyApi

---@alias NssLibsNotifyBridgeApiGetApiIfExistsCallback fun():NssLibsNotifyApi|nil
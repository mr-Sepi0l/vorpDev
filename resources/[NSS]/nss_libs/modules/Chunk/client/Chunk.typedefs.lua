---@class NssLibsChunksApi
---@field create fun():NssLibsChunkApi
---@field clear fun():NssLibsChunksApi

---@class NssLibsChunkApi
---@field setSize fun(size_in_meters:number):NssLibsChunkApi
---@field setMonitoringInterval fun(interval_in_ms:number):NssLibsChunkApi
---@field setModeAllEntered fun():NssLibsChunkApi
---@field setModeOnlyEnteredNearest fun():NssLibsChunkApi
---@field add fun(x:number, y:number, z:number, radius:number, on_enter_cb:fun(item_id:string)|nil, on_leave_cb:fun(item_id:string)|nil):NssLibsChunkItemApi
---@field remove fun(chunk_item_id:string):NssLibsChunkApi
---@field reset fun():NssLibsChunkApi

---@class NssLibsChunkItemApi
---@field getId fun():string
---@field remove fun():void

---@class NssLibsChunkItem
---@field id string
---@field x number
---@field y number
---@field z number
---@field coords NssLibsChunkCoordsVector3 @vector3
---@field radius number
---@field on_enter_cb function
---@field on_leave_cb function

---@class NssLibsChunkCoordsVector3
---@field x number
---@field y number
---@field z number
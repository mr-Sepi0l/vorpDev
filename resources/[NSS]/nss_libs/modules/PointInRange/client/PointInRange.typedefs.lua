---@class NssLibsPointInRangeChunkItem
---@field coords NssLibsPointInRangeCoords
---@field radius number
---@field resource_name string
---@field on_enter_cb fun():void
---@field on_leave_cb fun():void
---@field id string
---@field ignore_nearest_check boolean

---@class NssLibsPointInRangeCoords
---@field x number
---@field y number
---@field z number

---@class NssLibsPointInRangeListenerApi
---@field remove fun():void
---@field getId fun():string

---@class NssLibsPointInRangeApi
---@field add fun(x:number, y:number, z:number, radius:number, on_enter_cb:function, on_leave_cb:function):NssLibsPointInRangeListenerApi
---@field reset fun():void
---@field IGNORE_NEAREST_CHECK boolean
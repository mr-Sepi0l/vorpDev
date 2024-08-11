---@alias NssLibsAttachPropResourceName string
---@alias NssLibsAttachPropPlayerId number
---@alias NssLibsAttachPropNetworkId number
---@alias NssLibsAttachPropNetworkIdList NssLibsAttachPropNetworkId[]
---@alias NssLibsAttachPropModelName string

---@class NssLibsAttachPropShareEvents
---@field public attached string
---@field public detached string
---@field public client_detach string
---@field public server_detach string

---@class NssLibsAttachPropShare
---@field public Events NssLibsAttachPropShareEvents
---@field public AttachableScenarioProps NssLibsAttachPropModelName[]

---@class NssLibsAttachPropShareAttachedPropDetails
---@field public prop_network_id NssLibsAttachPropNetworkId
---@field public prop_model_name NssLibsAttachPropModelName
---@field public x number
---@field public y number
---@field public z number

---@class NssLibsAttachPropShareCoords
---@field public x number
---@field public y number
---@field public z number

---@alias NssLibsAttachPropShareAttachedPropDetailList NssLibsAttachPropShareAttachedPropDetails[]
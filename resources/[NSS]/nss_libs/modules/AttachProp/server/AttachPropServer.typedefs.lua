---@alias NssLibsAttachPropServerAttachedPropList table<NssLibsAttachPropNetworkId, NssLibsAttachPropModelName>

---@alias NssLibsAttachPropServerAttachedPropFlagList table<NssLibsAttachPropNetworkId, boolean|NssLibsAttachPropServerAttachedPropDependency>

---@alias NssLibsAttachPropServerAttachedPropListsByResource table<NssLibsAttachPropResourceName, NssLibsAttachPropServerAttachedPropList>>

---@class NssLibsAttachPropServerAttachedPropDependency
---@field public resource_name NssLibsAttachPropResourceName
---@field public prop_model_name NssLibsAttachPropModelName
---@field public player NssLibsAttachPropPlayerId
---@field public player_resource_key string
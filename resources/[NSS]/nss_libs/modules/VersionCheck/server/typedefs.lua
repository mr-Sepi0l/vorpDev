---@alias NssVersionCheckVersionDependencies NssVersionCheckVersionDependency[]

---@class NssVersionCheckVersionDependency
---@field public resource_name string
---@field public version_str string
---@field public version number

---@class NssVersionCheckVersion
---@field public latest_version_str string
---@field public latest_version number
---@field public versions table<string>
---@field public last_allowed_version number
---@field public last_allowed_version_str string
---@field public dependencies NssVersionCheckVersionDependencies

---@alias NssVersionCheckVersionJsonVersionDependencies table<string, table<string,string>> @ { [current_resource_version_str]: { [dependency_resource_name]: [required_dependency_version_str] } }

---@class NssVersionCheckVersionJson
---@field public version string
---@field public versions string[]|nil
---@field public last_allowed_version string|nil
---@field public dependencies NssVersionCheckVersionJsonVersionDependencies|nil
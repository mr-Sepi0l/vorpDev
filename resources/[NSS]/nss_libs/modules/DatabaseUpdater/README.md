# nss_libs - DatabaseUpdater

This module provides a simple way to update the database by versions given by a json file.

If the current version of the `fxmanifest.lua` is behind the latest version in the json file,
the database will be updated. All `versions` (see json file) higher than the current version of the `fxmanifest.lua`
will be updated.

__Important:__ Ensure that the folder `db` exists in your resource. All sql files must be placed in this folder with the
following naming convention: `[VERSION].sql` (e.g. `0.0.1.sql`).

__Important:__ Ensure that all queries inside the sql files are separated by `;` (semicolon).

__Important:__ Ensure that the version in the `fxmanifest.lua` is a valid version (e.g. `0.0.1`) and matches with the
naming convention of the sql files.

__Important:__ It is not necessary to add the db folder to the `fxmanifest.lua`.

Example for json file:

```json
{
  "version": "0.0.1",
  "versions": [
    "0.0.1"
  ]
}
```

Example for server scripts:

```lua
---@type PackageVersionCheckApi
local version_check_api = exports.nss_libs:getVersionCheckApi(GetCurrentResourceName())

---@type NssLibsDatabaseUpdaterApi
local db_update_api = exports.nss_libs:getDatabaseUpdaterApi(GetCurrentResourceName())

Citizen.CreateThread(function()

    ---@type NssVersionCheckVersion
    local version = version_check_api:check("https://github.com/NIGHTSHIFT-STUDIO/nss_versions/blob/main/nss_quest.json")

    local current_version = version_check_api:getCurrentVersion()

    db_update_api:checkAndUpdate(current_version, version.versions)
end)
```
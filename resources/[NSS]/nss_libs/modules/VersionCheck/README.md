# nss_libs - VersionCheck

This module provides a simple way to check if the client is using the latest version of a resource.

Example for json file:

```json
{
  "version": "0.0.2",
  "versions": [
    "0.0.1",
    "0.0.2"
  ],
  "dependencies": {
    "0.0.1": {
      "nss_libs": "0.21.1"
    },
    "0.0.2": {
      "nss_libs": "0.22.0"
    }
  },
  "last_allowed_version": "0.0.1"
}
```

- `version` is required and should be the up-to-date version of the resource.
- `versions` is optional and should be a list of all versions of the resource so the `DatabaseUpdater` module can update
  the database.
- `last_allowed_version` is optional and should be the last version of the resource that is allowed to be used by the
  game server. If the game server using an older version, the related resource will be stopped. This is useful if you
  want to prevent the game server from using an older version of a resource of however reason, e.g. you will force a
  free resource to be become a paid resource. Ensure that the version check url is not reachable in unencrypted files
  to prevent manipulations.
- `dependencies` is optional and should be a list of all dependencies of each version of the resource. The dependency
  version is the minimum version.

Example for server scripts:

```lua
 ---@type PackageVersionCheckApi
 local version_check_api = exports.nss_libs:getVersionCheckApi(GetCurrentResourceName())

 version_check_api:check("https://github.com/NIGHTSHIFT-STUDIO/nss_versions/blob/main/nss_quest.json")
```

Results in the following server console / log output:

- Up to date

```log
✅   Up to Date! nss_quest (Installed 1.0.2)
```

- Outdated

```log
❌   Outdated! nss_quest (Installed 1.0.0, Available 1.0.2)
```

- Unsupported

```log
⚠   Unsupported! nss_quest (Installed 1.0.3, Available 1.0.2)
```
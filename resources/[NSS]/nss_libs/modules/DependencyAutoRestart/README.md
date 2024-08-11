# nss_libs - DependencyAutoRestart

Automatically restarts all resources that has the resource using `DependencyAutoRestart` as dependency.

__Important:__ Ensure that no recursive effects appears if one two resources having each other as dependency. This
will be solved in a future version.

## Example

Add the following code snippet to your resource at this point where your resource is started and initialized.

```lua
---@type DependencyAutoRestartApi
local resource_auto_restart_api = exports.nss_libs:getDependencyAutoRestartApi(GetCurrentResourceName())

resource_auto_restart_api.reloadDependencies()
```

## TODOs

- [ ] Check if two resources having each other as dependency to prevent recursive effects.
- [ ] Consider order of dependencies (currently sometimes dependencies are restarted in wrong order and the game client
  chrashes).
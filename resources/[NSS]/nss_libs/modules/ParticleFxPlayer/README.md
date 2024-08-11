# nss_libs - ParticleFxPlayer

Important: Synced particle fx are restricted by missing methods. For example it is not possible to set the color or
alpha of a synced particle fx. If you want that you have to create the particle on each client individually.

## Examples

### Play particle fx on position for one second looped over network

```lua
---@type NssLibsParticleFxPlayerControllerApi
local pfx_api = exports.nss_libs:getParticleFxPlayerApi(GetCurrentResourceName())

---@type NssLibsParticleFxPlayerApi
local pfx_player = pfx_api.create()

local duration_in_ms = 1000 -- One second
local interval_in_ms = 100 -- 10 times per second

-- non-looped asset
local asset_dictionary = 'scr_crackpot'
local asset_name = 'scr_crackpot_tesla_fail'

-- false if non-looped asset: https://github.com/femga/rdr3_discoveries/blob/f729ba03f75a591ce5c841642dc873345242f612/graphics/ptfx/ptfx_assets_non_looped.lua
-- true looped asset: https://github.com/femga/rdr3_discoveries/blob/f729ba03f75a591ce5c841642dc873345242f612/graphics/ptfx/ptfx_assets_looped.lua
local is_looped_asset = false

-- Static interval
pfx_player
        .setAsset(asset_dictionary, asset_name, is_looped_asset)
        .setPosition(0.0, 0.0, 0.0)
        .useNetwork()
        .play(duration_in_ms, interval_in_ms)

-- Random interval
local random_interval = { 100, 500 } -- Random value between 100 and 500 ms each wait loop

pfx_player
        .setAsset(asset_dictionary, asset_name, is_looped_asset)
        .setPosition(0.0, 0.0, 0.0)
        .useNetwork()
        .play(duration_in_ms, random_interval)
```

## TODOs

- [ ] Test it!
- [ ] Add more examples
- [ ] Add more documentation of available methods
- [ ] Add random interval
- [ ] Add random offset / axis / rotation
- [ ] Add random assets
```lua
--SetParticleFxNonLoopedColour
--0x60B85BED6577A35B
-- SET_PARTICLE_FX_NON_LOOPED_COLOUR
SetParticleFxNonLoopedColour(
        r --[[ number ]],
        g --[[ number ]],
        b --[[ number ]]
)
--SetParticleFxLoopedColour
--0x239879FC61C610CC
-- SET_PARTICLE_FX_LOOPED_COLOUR
SetParticleFxLoopedColour(
        ptfxHandle --[[ integer ]],
        r --[[ number ]],
        g --[[ number ]],
        b --[[ number ]],
        p4 --[[ boolean ]]
)
--SetParticleFxLoopedAlpha
--0x88786E76234F7054
-- SET_PARTICLE_FX_LOOPED_ALPHA
SetParticleFxLoopedAlpha(
        ptfxHandle --[[ integer ]],
        alpha --[[ number ]]
)
--SetParticleFxNonLoopedAlpha
--0xE8A35938A7026CEA
-- SET_PARTICLE_FX_NON_LOOPED_ALPHA
SetParticleFxNonLoopedAlpha(
        alpha --[[ number ]]
)
```

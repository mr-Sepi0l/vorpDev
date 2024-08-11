fx_version "adamant"
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

game 'rdr3'
lua54 'yes'

name "nss_libs"
description 'Library of helping functions and scripts.'
version '0.35.0'

author 'systemNEO'
author 'DerHobbs'

-- Consider order!
shared_scripts {
    '**/config.lua',
    'internal_cfg.lua',
    'share/Class.lua',
    'share/ApiMaker.lua',
    'modules/Helper/share/SharedHelper.lua',
    'modules/**/share/**/*.lua',
}

-- Consider order!
server_scripts {
    'modules/Helper/server/ServerHelper.lua',
    'modules/**/server/**/*.lua',
    'modules/**/server/**/*.bridge.lua',
    'startup_server.lua',
}

-- Consider order!
client_scripts {
    'modules/Helper/client/ClientHelper.lua',
    'modules/**/client/**/*.lua',
    'modules/**/client/**/*.bridge.lua',
    'ui/NssClient/NssClient.lua',
    'startup_client.lua',
}

files {
    'ui/**/*',
}

dependencies {
    'vorp_inventory',
    'vorp_core',
}

escrow_ignore {
    'config.lua',
    'config.demo.lua',
    '**/config.lua',
    '**/*.config.lua',
    '**/config.demo.lua',
    '**/*.typedefs.lua', -- Type definitions are open as example for developers.
    '**/typedefs.lua', -- Type definitions are open as example for developers.
    '**/*.bridge.lua', -- Bridge files are open as example for developers.
}
dependency '/assetpacks'
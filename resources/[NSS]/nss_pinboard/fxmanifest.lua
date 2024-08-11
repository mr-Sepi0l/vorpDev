fx_version 'adamant'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

game 'rdr3'
lua54 'yes'
version '1.3.1'

author 'systemNEO'
author 'DerHobbs'

description 'Bulletin boards to pin and show notices on specified locations.'

shared_scripts {
    'config.lua',
    'shared/locale.lua',
    'languages/*.lua'
}

client_scripts {
    'client/client.lua'
}

server_scripts {
    'server/modules/globals.lua',
    'server/modules/db.lua',
    'server/modules/vorp.lua',
    'server/modules/discord.lua',
    'server/modules/actions.lua',
    'server/server.lua'
}

ui_page 'html/index.html'

files {
    'html/**/*',
}

dependencies {
    'vorp_core',
}

escrow_ignore {
    'config.demo.lua',
    'config.lua',
    'map/**/*',
    'languages/**/*'
}


dependency '/assetpacks'
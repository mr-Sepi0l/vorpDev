fx_version 'adamant'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

game 'rdr3'
lua54 'yes'
version '1.6.3'

author 'systemNEO'
author 'DerHobbs'

description 'Mini quest system.'

shared_scripts {
    'quests/**/*',
    'config.lua',
    'internal_cfg.lua',
}

client_scripts {
    'client/modules/**/*',
    'client/client.lua',
}

server_scripts {
    'server/modules/**/*',
    'server/server.lua',
}

ui_page 'html_quest/index.html'

files {
    'html_quest/**/*',
}

dependencies {
    'nss_libs',
    'vorp_inventory',
    'vorp_core',
}

escrow_ignore {
    'config.lua',
    'config.demo.lua',
    'quests/**/*',
}


dependency '/assetpacks'
fx_version 'adamant'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'

game 'rdr3'
author 'Krueger'
lua54 'yes'


client_scripts { 
  'client.lua' 
}

server_scripts {
  'server.lua'
}

shared_scripts {
  'config.lua'
}

escrow_ignore {
  'config.lua'
}

dependencies {
  'menuapi'
}
dependency '/assetpacks'
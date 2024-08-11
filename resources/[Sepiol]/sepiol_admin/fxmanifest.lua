game 'rdr3'
fx_version 'adamant'
rdr3_warning 'I acknowledge that this is a prerelease build of RedM, and I am aware my resources *will* become incompatible once RedM ships.'
lua54 'yes'

shared_scripts {
	'config.lua',
}
server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'server/functions.lua',
	'server/server.lua',
}
client_scripts {
	'client/client.lua'
}

ui_page 'html/index.html'

files {
	'html/**/*'
}

fx_version 'cerulean'
game 'gta5'

author 'Ruptz'
description 'Rockstar Editor w/ ox_lib'
version '1.0.0'
lua54 'yes'

client_scripts {
    'client/main.lua'
}

server_scripts {
    'server/main.lua'
}

shared_scripts {
    'config.lua',
    '@ox_lib/init.lua'
}

ui_page 'web/index.html'

files {
    'web/index.html',
    'web/style.css',
    'web/script.js'
}
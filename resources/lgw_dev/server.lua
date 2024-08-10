----- GET COORDS DISCORD --
local Webhook = 'https://discord.com/api/webhooks/960159482518839376/6jgAaPOql1YOvq2Dxab7bHn2jgTrrJfBKWEW8y3f6nWIm35qhDCbD4YEsvZGuoG43lOa'

local SystemName = 'Boot Coords'

RegisterCommand("gc", function(source, args, rawCommand)
    if args[1] then
        TriggerClientEvent('lgw_dev:getCoords', source, args[1])
    else
        TriggerClientEvent('lgw_dev:getCoords', source)
    end
end, true)

RegisterServerEvent('lgw_dev:print')
AddEventHandler('lgw_dev:print', function(x, y, z, heading, name)
    local title = "Coordonnées"
    if name ~= nil then
        title = name
    end

    local message = {
        {
            ["title"] = "Export de " .. GetPlayerName(source),
            ["color"] = 12833302,
            ["fields"] = {
                {
                    ["name"] = title,
                    ["value"] = "```css\n{x = " .. x .. ",  y = " .. y .. ",  z = " .. z .. "}, heading = " .. heading .. "\n```",
                },
                {
                    ["name"] = title,
                    ["value"] = "```fix\n" .. x .. ", " .. y .. ", " .. z .. ", heading = " .. heading .. "\n```",
                },
            },
            ["footer"] = {
                ["text"] = "Print coords"
            }
        }
    }

    PerformHttpRequest(Webhook, function(Error, Content, Head) end, 'POST', json.encode({username = SystemName, embeds = message}), { ['Content-Type'] = 'application/json' })
end)

local VORPcore = exports.vorp_core:GetCore() -- NEW includes  new callback system

RegisterCommand("giveitem2", function(source, args, rawCommand)
    if args[1] and args[2] and args[3] then
        local Character = VORPcore.getUser(tonumber(args[1])).getUsedCharacter
        if Character.group == 'admin' then
            if Character == nil then
                TriggerClientEvent('vorp:Tip', tonumber(args[1]), 'Veuillez entrer un ID valide', 'error')
                return
            end
            if args[2] == nil or tonumber(args[3]) == nil then
                TriggerClientEvent('vorp:Tip', tonumber(args[1]), 'Veuillez entrer un item et une quantité valide', 'error')
                return
            end
            local ItemDB = exports.vorp_inventory:getItemDB(args[2])
            if ItemDB == nil then
                TriggerClientEvent('vorp:Tip', tonumber(args[1]), 'Cet item n\'existe pas', 'error')
                return
            end
            local canCarry = exports.vorp_inventory:canCarryItem(tonumber(args[1]), args[2], tonumber(args[3]))
            if canCarry then
                exports.vorp_inventory:addItem(tonumber(args[1]), args[2], tonumber(args[3]))
            else
                TriggerClientEvent('vorp:Tip', tonumber(args[1]), 'Vous n\'avez pas assez de place', 'error')
            end
        else
            TriggerClientEvent('vorp:Tip', source, 'Vous n\'avez pas la permission', 'error')
        end
    end
end, true)
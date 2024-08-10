local VORPcore = exports.vorp_core:GetCore()

exports.vorp_inventory:registerUsableItem('carteida', function(data)
    local card = {
        data = data,
        type = 'usa',
        itemName = 'carteida'
    }
    TriggerClientEvent('lgw_carteid:getClosestPlayer', data.source, card)
end)

exports.vorp_inventory:registerUsableItem('carteidna', function(data)
    local card = {
        data = data,
        type = 'na',
        itemName = 'carteidna'
    }
    TriggerClientEvent('lgw_carteid:getClosestPlayer', data.source, card)
end)

RegisterNetEvent('lgw_carteid:getIdCard')
AddEventHandler('lgw_carteid:getIdCard', function(closestPlayer, card)
    local timer = 10000
    local type = card.type
    local itemName = card.itemName
    local data = card.data

    if data.item.metadata.firstname and data.item.metadata.lastname then
        TriggerClientEvent("lgw_carteid:opening", data.source, data.item.metadata, type, timer)
        if closestPlayer ~= nil then
            TriggerClientEvent("lgw_carteid:opening", closestPlayer, data.item.metadata, type, timer)
        end
    else
        local character = VORPcore.getUser(data.source).getUsedCharacter
        exports.vorp_inventory:subItemID(data.source, data.item.mainid)

        local newData = {
            firstname = character.firstname,
            lastname = character.lastname,
            description = character.firstname .. ' ' .. character.lastname
        }
        exports.vorp_inventory:addItem(data.source, itemName, 1, newData)
        TriggerClientEvent("lgw_carteid:opening", data.source, newData, type, timer)
        if closestPlayer ~= nil then
            TriggerClientEvent("lgw_carteid:opening", closestPlayer, data.item.metadata, type, timer)
        end
    end
end)

--function GetIdCard(data, type, itemName)
--    local timer = 10000
--
--    if data.item.metadata.firstname and data.item.metadata.lastname then
--        TriggerClientEvent("lgw_carteid:opening", data.source, data.item.metadata, type, timer)
--    else
--        local character = VORPcore.getUser(data.source).getUsedCharacter
--        exports.vorp_inventory:subItemID(data.source, data.item.mainid)
--
--        local newData = {
--            firstname = character.firstname,
--            lastname = character.lastname,
--            description = character.firstname .. ' ' .. character.lastname
--        }
--        exports.vorp_inventory:addItem(data.source, itemName, 1, newData)
--        TriggerClientEvent("lgw_carteid:opening", data.source, newData, type, timer)
--    end
--end

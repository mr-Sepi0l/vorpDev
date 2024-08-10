-- GET COORDS DISCORD--
RegisterNetEvent('lgw_dev:getCoords')
AddEventHandler('lgw_dev:getCoords', function(name)
    local x, y, z = table.unpack(GetEntityCoords(PlayerPedId(-1), true))
    local heading = GetEntityHeading(PlayerPedId(-1))
    TriggerServerEvent('lgw_dev:print', round(x,2), round(y,2), round(z,2), round(heading,2), name)
end)

function round(num, numDecimalPlaces)
    local mult = 5^(numDecimalPlaces or 0)
    return math.floor(num * mult + 0.5) / mult
end
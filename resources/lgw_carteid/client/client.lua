Showing = false

RegisterNetEvent('lgw_carteid:getClosestPlayer')
AddEventHandler('lgw_carteid:getClosestPlayer', function(card)
    local closestPlayer, closestDistance = GetClosestPlayer()
    if closestPlayer ~= -1 and closestDistance <= 2.25 then
        TriggerServerEvent('lgw_carteid:getIdCard', GetPlayerServerId(closestPlayer), card)
    else
        TriggerServerEvent('lgw_carteid:getIdCard', nil, card)
    end
end)

RegisterNetEvent("lgw_carteid:opening")
AddEventHandler("lgw_carteid:opening", function(data, type, timer)
    SetNuiFocus(true, true)
    SendNUIMessage(
        {
            action = "show",
            infos = data,
            type = type,
            timer = timer
        }
    )

    Wait(timer)
    Showing = false
end)

RegisterNetEvent("lgw_carteid:close")
AddEventHandler("lgw_carteid:close", function()
    SetNuiFocus(false, false)
    SendNUIMessage({ action = "hide" })
    Showing = false
end)

RegisterNUICallback("close", function(data, cb)
    SetNuiFocus(false, false)
    SendNUIMessage({ action = "hide" })
    Showing = false
end)


function GetClosestPlayer()
    local players, closestDistance, closestPlayer = GetActivePlayers(), -1, -1
    local playerPed, playerId = PlayerPedId(), PlayerId()
    local coords, usePlayerPed = coords, false

    if coords then
        coords = vector3(coords.x, coords.y, coords.z)
    else
        usePlayerPed = true
        coords = GetEntityCoords(playerPed)
    end

    for i = 1, #players, 1 do
        local tgt = GetPlayerPed(players[i])

        if not usePlayerPed or (usePlayerPed and players[i] ~= playerId) then
            local targetCoords = GetEntityCoords(tgt)
            local distance = #(coords - targetCoords)

            if closestDistance == -1 or closestDistance > distance then
                closestPlayer = players[i]
                closestDistance = distance
            end
        end
    end
    return closestPlayer, closestDistance
end

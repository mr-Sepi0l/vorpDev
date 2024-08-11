RegisterServerEvent("k:tp")
AddEventHandler('k:tp', function(target)

    local _source = tonumber(source)
    local _target = target

    TriggerEvent("sepiol_admin:checkPermissions", _source, function(UserGroup, Character)
        if target.x ~= 0.0 and target.y ~= 0.0 then
            TriggerClientEvent('k:teleport', _source, _source, _target)
        else
            TriggerClientEvent('vorp:TipBottom', _source, Locale.preset_not_found, 3000)
            return
        end
    end)
end)

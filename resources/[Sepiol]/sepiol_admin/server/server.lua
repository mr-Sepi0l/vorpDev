local VORPcore = exports.vorp_core:GetCore()

RegisterServerEvent('sepiol_admin:openMenu')
AddEventHandler('sepiol_admin:openMenu', function()
    local _source = source
    Utils.checkPermissions(_source, function(UserGroup)
        TriggerClientEvent("sepiol_admin:OpenMenu", _source, UserGroup)

        TriggerEvent("chat:addSuggestion", "/gm", "Permet de te teleporter à Guarma.", {})
        TriggerEvent("chat:addSuggestion", "/sd", "Permet de te teleporter à Saint-Denis.", {})
    end)
end)

RegisterServerEvent('sepiol_admin:setJob')
AddEventHandler('sepiol_admin:setJob', function(source, target, jobName, jobGrade)
    local _source = source
    Utils.checkPermissions(_source, function(UserGroup, Character)
        local Target = VORPcore.getUser(target)

        if not Target then
            VORPcore.NotifyRightTip(_source, "Le joueur specifié n'existe pas", 4000)
            return
        end

        local TargetChar = Target.getUsedCharacter

        MySQL.Async.execute('UPDATE characters SET job = @job, jobgrade = @jobgrade WHERE charidentifier=@charIdentifier', {
            ['@job'] = jobName,
            ['@jobgrade'] = jobGrade,
            ['@charIdentifier'] = TargetChar.charIdentifier,
        }, function(rowsChanged)
            if rowsChanged == 0 then
                VORPcore.NotifyRightTip(_source, "Une erreur est survenue lors du changement de job", 4000)
            else
                local message = "Vous avez changer le job de " .. TargetChar.firstname .. " " .. TargetChar.lastname .. " en " .. jobName .. " " .. jobGrade
                VORPcore.NotifyRightTip(_source, message, 4000)
            end
        end)
    end)
end)

RegisterCommand('sjob', function(source, args)
    local targetPlayer = tonumber(args[1])
    local jobName = args[2]
    local jobGrade = tonumber(args[3])

    if jobGrade and jobName and targetPlayer then
        TriggerEvent('sepiol_admin:setJob', source, targetPlayer, jobName, jobGrade)
    end
end)

local Menu = exports.vorp_menu:GetMenuData()
local VORPcore = exports.vorp_core:GetCore()
local autoHealActive = false

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
        if IsControlJustPressed(1, 0x4AF4D473) then
            -- Delete
            TriggerServerEvent('sepiol_admin:openMenu')
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        Citizen.Wait(1)
        if (autoHealActive) then
            Citizen.Wait(1000 * 60 * 10)
            healMe()
        end
    end
end)

RegisterNetEvent("sepiol_admin:OpenMenu")
AddEventHandler("sepiol_admin:OpenMenu", function()
    openAdminMenu()
end)

RegisterCommand('coords', function()
    local coords, heading = GetEntityCoords(PlayerPedId()), GetEntityHeading(PlayerPedId())
    SendNUIMessage({
        type = 'clipboard',
        data = '' .. vec(coords.x, coords.y, coords.z, heading)
    })
    VORPcore.NotifyRightTip("Copié dans le presse papier!", 4000)
end)

function openAdminMenu()
    Menu.CloseAll()
    MenuElements = {
        {
            label = "AutoHeal: " .. (autoHealActive and 'ON' or 'OFF'),
            value = "autoHeal",
            desc = "Vous soigne automatiquement toutes les 10 minutes",
            itemHeight = '2vh'
        },
        {
            label = "Noclip",
            value = "noclip",
            desc = "",
            itemHeight = '2vh'
        },
        {
            label = "Export Coords",
            value = "coords",
            desc = "Exporter vos coordonnés actuelles en vector4",
            itemHeight = '2vh'
        },
        {
            label = "TPM",
            value = "tpm",
            desc = "Vous téléporte à voitre marqueur sur le map",
            itemHeight = '2vh'
        }
    }

    Menu.Open(
            "default",
            GetCurrentResourceName(),
            "AdminMenu", -- unique namespace
            {
                title = "Admin Menu",
                subtext = "Gestion administrateur / modérateurs",
                align = "top-left", -- top-right , top-center , top-left
                elements = MenuElements, -- elements needed
                itemHeight = "4vh", -- set all elements to this height if they are not definded in the element (optional)
            },
            function(data, menu)
                -- get any of the params you definded in the elements
                if data.current.value == "autoHeal" then
                    autoHealActive = not autoHealActive
                    healMe()
                    MenuElements[1].label = "AutoHeal: " .. (autoHealActive and 'ON' or 'OFF')
                    menu.setElements(MenuElements)
                    menu.refresh()
                end

                if data.current.value == "noclip" then
                    ExecuteCommand('noclip')
                    menu.close()
                end

                if data.current.value == "coords" then
                    ExecuteCommand('coords')
                    menu.close()
                end

                if data.current.value == "tpm" then
                    ExecuteCommand('tpm')
                    menu.close()
                end
            end, function(data, menu)
                --(optional)
                -- if theres no previous menu close menu on backspace press
                menu.close()
            end
    )
end

function healMe()
    ExecuteCommand('healneeds')
    if autoHealActive then
        VORPcore.NotifyRightTip("Vous avez été soigné", 4000)
    end
end

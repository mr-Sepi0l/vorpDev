Citizen.CreateThread(function()
    while true do
        if IsControlJustPressed(1,  0x4AF4D473) then -- Delete
            TriggerServerEvent('sepiol_admin:checkPermissions')
        end
    end
end)

RegisterNetEvent("sepiol_admin:OpenMenu")
AddEventHandler("sepiol_admin:OpenMenu", function()
    local data = {
        title = 'Admin Menu',
        subtitle = 'Gestion administrateur / modérateurs',
        numberOnScreen = 8
    }

    local menu = jo.menu.create('AdminMenu', data)

    menu:addItem({
        title = "Item 1",
        price = {money = 10.2},
        onActive = function(currentData)
            print('Item 1 active')
        end,
        onClick = function(currentData)
            print('Clicked on item 1')
        end,
        onChange = function(currentData)
            print('Something change in the item 1')
        end,
        onExit = function(currentData)
            print('Exit the item 1')
        end
    })

    menu:send()
    jo.menu.setCurrentMenu('AdminMenu')
    jo.menu.show(true)
end)

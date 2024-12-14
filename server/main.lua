local webhookUrl = Config.Webhook

local function sendToDiscordLog(title, description, color)
    local embed = {{
        ["title"] = title,
        ["description"] = description,
        ["color"] = color,
        ["footer"] = { ["text"] = os.date("%Y-%m-%d %H:%M:%S") },
    }}

    PerformHttpRequest(webhookUrl, function(err, text, headers)
        if err ~= 200 then
            print("Error sending Discord log: " .. err)
        end
    end, "POST", json.encode({ embeds = embed }), { ["Content-Type"] = "application/json" })
end

RegisterNetEvent("rockstarEditor:startRecording")
AddEventHandler("rockstarEditor:startRecording", function()
    local src = source
    local playerName = GetPlayerName(src)
    sendToDiscordLog("Recording Started", playerName .. " has started recording.", 3066993) -- Green
end)

RegisterNetEvent("rockstarEditor:saveClip")
AddEventHandler("rockstarEditor:saveClip", function()
    local src = source
    local playerName = GetPlayerName(src)
    sendToDiscordLog("Recording Saved", playerName .. " has saved their recording.", 3447003) -- Blue
end)

RegisterNetEvent("rockstarEditor:discardClip")
AddEventHandler("rockstarEditor:discardClip", function()
    local src = source
    local playerName = GetPlayerName(src)
    sendToDiscordLog("Recording Discarded", playerName .. " has discarded their recording.", 15158332) -- Red
end)

RegisterNetEvent("rockstarEditor:activateEditor")
AddEventHandler("rockstarEditor:activateEditor", function()
    local src = source
    local playerName = GetPlayerName(src)
    sendToDiscordLog("Rockstar Editor Activated", playerName .. " has activated the Rockstar Editor.", 16776960) -- Yellow
end)

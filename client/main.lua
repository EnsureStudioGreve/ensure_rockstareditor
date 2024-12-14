local isRecording = false

-- Fetch Config
RegisterNUICallback('fetchConfig', function(_, cb)
    cb({
        enableClipping = Config.EnableClipping,
        enableRecording = Config.EnableRecording,
        enableEditor = Config.EnableEditor
    })
end)

-- Start Recording
RegisterNUICallback('startRecording', function(_, cb)
    if Config.EnableRecording then
        StartRecording(1)
        isRecording = true
        TriggerServerEvent("rockstarEditor:startRecording")
        cb({ status = 'recording' })
    else
        cb({ status = 'recording_disabled' })
        lib.notify({
            title = 'Recording Disabled',
            description = 'Recording Is Disabled',
            type = 'warning'
        })
        print("Recording is currently disabled by the server configuration.")
    end
end)

-- Save Recording
RegisterNUICallback('saveClip', function(_, cb)
    if Config.EnableRecording then
        if isRecording then
            StopRecordingAndSaveClip()
            isRecording = false
            TriggerServerEvent("rockstarEditor:saveClip")
            cb({ status = 'saved' })
        else
            cb({ status = 'not_recording' })
        end
    else
        cb({ status = 'clipping_disabled' })
        lib.notify({
            title = 'Clipping Disabled',
            description = 'Clipping Is Disabled',
            type = 'warning'
        })
        print("Saving clips is currently disabled by the server configuration.")
    end
end)

-- Discard Recording
RegisterNUICallback('discardClip', function(_, cb)
    if Config.EnableRecording then
        if isRecording then
            StopRecordingAndDiscardClip()
            isRecording = false
            TriggerServerEvent("rockstarEditor:discardClip")
            cb({ status = 'discarded' })
        else
            cb({ status = 'not_recording' })
        end
    else
        cb({ status = 'clipping_disabled' })
        lib.notify({
            title = 'Clipping Disabled',
            description = 'Clipping Is Disabled',
            type = 'warning'
        })
        print("Discarding clips is currently disabled by the server configuration.")
    end
end)

-- Activate Rockstar Editor
RegisterNUICallback('activateEditor', function(data, cb)
    if Config.EnableEditor then
        if data.confirm then
            NetworkSessionLeaveSinglePlayer()
            ActivateRockstarEditor()
            TriggerServerEvent("rockstarEditor:activateEditor")
            cb({ status = 'activated' })
        else
            cb({ status = 'cancelled' })
        end
    else
        cb({ status = 'editor_disabled' })
        lib.notify({
            title = 'Editor Disabled',
            description = 'Rockstar Editor Is Disabled',
            type = 'warning'
        })
        print("Rockstar Editor is currently disabled by the server configuration.")
    end
end)

-- Close UI
RegisterNUICallback('closeUI', function(_, cb)
    SetNuiFocus(false, false)
    cb({ status = 'closed' })
end)

-- Command to Open UI
RegisterCommand('rockstarEditor', function()
    SetNuiFocus(true, true)
    SendNUIMessage({ action = "openUI" })
end)
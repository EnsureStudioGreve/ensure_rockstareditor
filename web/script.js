$(document).ready(function () {
    // Fetch config
    $.post(`https://${GetParentResourceName()}/fetchConfig`, {}, function (config) {
        if (!config.enableRecording) {
            $('#startRecording').prop('disabled', true);
            console.log('Recording is disabled by the server configuration.');
        }
        if (!config.enableClipping) {
            $('#saveClip, #discardClip').prop('disabled', true);
            console.log('Clipping functionality is disabled by the server configuration.');
        }
        if (!config.enableEditor) {
            $('#activateEditorConfirm').prop('disabled', true);
            console.log('Rockstar Editor is disabled by the server configuration.');
        }
    });

    // Function to show the UI
    function showUI() {
        $('#editorUI').fadeIn(300);
    }

    // Function to hide the UI
    function hideUI() {
        $('#editorUI').fadeOut(300);
    }

    // Button to open
    $('#openUI').click(function () {
        showUI();
    });

    // Start Recording
    $('#startRecording').click(function () {
        $.post(`https://${GetParentResourceName()}/startRecording`, {}, function (response) {
            if (response.status === 'recording_disabled') {
                alert('Recording is disabled by the server configuration.');
            } else {
                hideUI();
                console.log('Start Recording Response:', response);
            }
        });
    });

    // Save Clip
    $('#saveClip').click(function () {
        $.post(`https://${GetParentResourceName()}/saveClip`, {}, function (response) {
            if (response.status === 'clipping_disabled') {
                alert('Saving clips is disabled by the server configuration.');
            } else {
                hideUI();
                console.log('Save Clip Response:', response);
            }
        });
    });

    // Discard Clip
    $('#discardClip').click(function () {
        $.post(`https://${GetParentResourceName()}/discardClip`, {}, function (response) {
            if (response.status === 'clipping_disabled') {
                alert('Discarding clips is disabled by the server configuration.');
            } else {
                hideUI();
                console.log('Discard Clip Response:', response);
            }
        });
    });

    // Activate Rockstar Editor
    $('#activateEditorConfirm').click(function () {
        if (confirm("Are you sure you want to activate the Rockstar Editor?")) {
            $.post(`https://${GetParentResourceName()}/activateEditor`, { confirm: true }, function (response) {
                if (response.status === 'editor_disabled') {
                    alert('Rockstar Editor is disabled by the server configuration.');
                } else {
                    hideUI();
                    console.log('Rockstar Editor Activated:', response);
                }
            });
        }
    });

    // Close
    $('#closeUI').click(function () {
        hideUI();
    });
});
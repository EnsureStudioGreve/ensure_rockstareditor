$(document).ready(function () {

    // Listen for NUI Messages
    window.addEventListener('message', function (event) {
        if (event.data.action === 'openUI') {
            showUI();
        }
    });

    // Confirmation editor
    function showConfirmationModal(callback) {
        $('#confirmationModal').fadeIn(300);

        // If "Yes" is clicked
        $('#confirmYes').off('click').on('click', function () {
            $('#confirmationModal').fadeOut(300);
            callback(true);
        });

        // If "No" is clicked
        $('#confirmNo').off('click').on('click', function () {
            $('#confirmationModal').fadeOut(300);
            callback(false);
        });
    }

    // Fetch configuration from the server
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
        $('#editorUI')
            .css('display', 'flex')
            .hide()
            .fadeIn(300);
    }

    // Function to hide the UI
    function hideUI() {
        $('#editorUI')
        .css('display', 'none')
        .hide()
        .fadeOut(300);
        $.post(`https://${GetParentResourceName()}/closeUI`, {}, function () {});
    }

    // Start Recording
    $('#startRecording').on('click', function () {
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
    $('#saveClip').on('click', function () {
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
    $('#discardClip').on('click', function () {
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
$('#activateEditorConfirm').on('click', function () {
    showConfirmationModal(function (confirmed) {
        console.log('Confirmation:', confirmed);
        if (confirmed) {
            $.post(`https://${GetParentResourceName()}/activateEditor`, JSON.stringify({ confirm: true }), function (response) {
                if (response.status === 'editor_disabled') {
                    alert('Rockstar Editor is disabled by the server configuration.');
                } else {
                    hideUI();
                    console.log('Rockstar Editor Activated:', response);
                }
            });
        } else {
            console.log('User canceled activation of Rockstar Editor.');
        }
    });
});


    // Close UI
    $('#closeUI').on('click', function () {
        hideUI();
    });
});
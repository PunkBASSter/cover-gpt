document.getElementById('saveSettings').addEventListener('click', function() {
    const cvText = document.getElementById('cvText').value;
    const apiToken = document.getElementById('apiToken').value;
    const promptFormat = document.getElementById('promptFormat').value;

    chrome.storage.sync.set({
        cvText: cvText,
        apiToken: apiToken,
        promptFormat: promptFormat
    }, function() {
        const status = document.getElementById('status');
        status.textContent = 'Settings saved.';
        setTimeout(function() {
            status.textContent = '';
        }, 1000);
    });
});

// Load any saved settings when the settings page is opened
window.addEventListener('DOMContentLoaded', function() {
    chrome.storage.sync.get(['cvText', 'apiToken', 'promptFormat'], function(items) {
        if (items.cvText) document.getElementById('cvText').value = items.cvText;
        if (items.apiToken) document.getElementById('apiToken').value = items.apiToken;
        if (items.promptFormat) document.getElementById('promptFormat').value = items.promptFormat;
    });
});

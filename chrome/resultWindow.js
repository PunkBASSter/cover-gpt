chrome.storage.local.get('analysisResult', function(data) {
    const contentElement = document.getElementById('analysisContent');
    contentElement.textContent = data.analysisResult;
  });

document.getElementById('copyButton').addEventListener('click', function() {
  const contentElement = document.getElementById('analysisContent');
  const textToCopy = contentElement.textContent;

  copyTextToClipboard(textToCopy);
});

function copyTextToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        const tooltip = document.getElementById('tooltip');
        tooltip.classList.remove('hidden');
        
        setTimeout(() => {
          tooltip.classList.add('hidden');
        }, 1000);
      })
      .catch(err => {
        console.error('Failed to copy text: ', err);
      });
  }
  
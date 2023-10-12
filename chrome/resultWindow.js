chrome.storage.local.get('gptResult', function(data) {
    const contentElement = document.getElementById('gptResultContent');
    contentElement.textContent = data.gptResult;
  });

document.getElementById('copyButton').addEventListener('click', function() {
  const contentElement = document.getElementById('gptResultContent');
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
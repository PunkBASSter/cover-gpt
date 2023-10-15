
//chrome.storage.local.get('gptResult', function(data) {
//    const contentElement = document.getElementById('gptResultContent');
//    contentElement.textContent = data.gptResult;
//  });

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

function showLoader() {
  document.getElementById("loader").style.display = "block";
  document.getElementById("gptResultContent").style.display = "none";
  document.getElementById("copyButton").style.display = "none";
}

function hideLoader() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("gptResultContent").style.display = "block";
  document.getElementById("copyButton").style.display = "block";
}

async function sendGptRequest() {
  showLoader();
  try {
      const apiToken = await chrome.storage.sync.get('apiToken');
      const chat = await chrome.storage.sync.get('chat');
      console.log(apiToken.apiToken);
      console.log(chat.chat);
      const res = await sendChatToOpenAI(apiToken.apiToken, chat.chat);
      document.getElementById('gptResultContent').textContent = res;
  } catch (error) {
      console.error(error);
      document.getElementById('gptResultContent').textContent = error;
  } finally {
      hideLoader();
  }
}
sendGptRequest();

document.getElementById('copyButton').addEventListener('click', function() {
  const contentElement = document.getElementById('gptResultContent');
  const textToCopy = contentElement.textContent;

  copyTextToClipboard(textToCopy);
});
const copyTextToClipboard = (text) => {
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

const showLoader = () => {
  document.getElementById("loader").style.display = "block";
  document.getElementById("gptResultContent").style.display = "none";
  document.getElementById("copyButton").style.display = "none";
}

const hideLoader = () => {
  document.getElementById("loader").style.display = "none";
  document.getElementById("gptResultContent").style.display = "block";
  document.getElementById("copyButton").style.display = "block";
}

const sendGptRequest = async () => {
  showLoader();
  try {
    const [apiToken, chat] = await Promise.all([
      chrome.storage.sync.get('apiToken'),
      chrome.storage.sync.get('chat')]
    );
    const res = await sendChatToOpenAI(apiToken.apiToken, chat.chat);
    document.getElementById('gptResultContent').textContent = res;
  } 
  catch (error) {
      console.error(error);
      document.getElementById('gptResultContent').textContent = error;
  } 
  finally {
      hideLoader();
  }
}
sendGptRequest();

document.getElementById('copyButton').addEventListener('click', function() {
  const contentElement = document.getElementById('gptResultContent');
  const textToCopy = contentElement.textContent;

  copyTextToClipboard(textToCopy);
});
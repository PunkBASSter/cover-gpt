chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "generateCoverLetter",
    "title": "Generate Cover Letter",
    "contexts": ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "generateCoverLetter") {
    let jobDescription = info.selectionText;
    openCoverLetterWindow(jobDescription);
  }
});

const openCoverLetterWindow = async (jobDescription) => { 
  const promptFormat = await chrome.storage.sync.get('promptFormat');
  const cv = await chrome.storage.sync.get('cvText');
  const msg = stringFormat(promptFormat.promptFormat, jobDescription, cv.cvText);
  const messages = [{ role: 'user', content: msg }];
  chrome.storage.sync.set({chat: messages});
  showResultWindow();
}

const showResultWindow = () => {
  chrome.windows.create({
    url: chrome.runtime.getURL('resultWindow.html'),
    type: 'popup',
    width: 400,
    height: 300
  });
}

const stringFormat = (formatStr, ...args) => {
  if (typeof formatStr !== 'string') {
      throw new Error(`A string expected but ${typeof formatStr} given.}`);
  }
  return formatStr.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] !== 'undefined'
          ? args[number]
          : match;
  });
}
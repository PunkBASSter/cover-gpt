chrome.runtime.onInstalled.addListener(function() {
  chrome.contextMenus.create({
    "id": "analyzeJobDescription",
    "title": "Analyze Job Description",
    "contexts": ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
  if (info.menuItemId === "analyzeJobDescription") {
    let jobDescription = info.selectionText;
    analyzeText(jobDescription);
  }
});

async function analyzeText(jobDescription) { 
  const apiToken = await chrome.storage.sync.get('apiToken');
  const promptFormat = await chrome.storage.sync.get('promptFormat');
  const cv = await chrome.storage.sync.get('cvText');
  
  console.log(cv.cvText);

  const msg = stringFormat(promptFormat.promptFormat, jobDescription, cv.cvText);
  
  const messages = [
    { role: 'user', content: msg }
  ];

  console.log(messages);

  const gptResult = await sendChatToOpenAI(apiToken.apiToken, messages)
    .then(responseText => {
      console.log(responseText);
      chrome.storage.local.set({'gptResult': responseText}, function() {
        showResultWindow();
      });
    });
}

function showResultWindow() {
  chrome.windows.create({
    url: chrome.runtime.getURL('resultWindow.html'),
    type: 'popup',
    width: 400,
    height: 300
  });
}

const OPENAI_CHAT_ENDPOINT = 'https://api.openai.com/v1/chat/completions';

function sendChatToOpenAI(apiToken, messages) {
  return fetch(OPENAI_CHAT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiToken}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: messages
    })
  })
  .then(response => response.json())
  .then(data => {
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return data.choices[0].message.content;
    } else {
      throw new Error('No response from OpenAI.');
    }
  })
  .catch(error => {
    console.error('Error calling OpenAI API:', error);
  });
}

function stringFormat(formatStr, ...args) {
  if (typeof formatStr !== 'string') {
      throw new Error(`A string expected but ${typeof formatStr} given.}`);
  }
  
  console.log(args)

  return formatStr.replace(/{(\d+)}/g, function(match, number) { 
      return typeof args[number] !== 'undefined'
          ? args[number]
          : match;
  });
}
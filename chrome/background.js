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
    chrome.storage.local.get('cvText', function(data) {
      let cvText = data.cvText;
      analyzeText(cvText, jobDescription);
    });
  }
});

function analyzeText(cvText, jobDescription) {
  // Simple analysis: For this example, let's just count words.
  // You can replace this with a more advanced analysis logic.
  //const cvWords = cvText.split(/\s+/).length;
  //const jobDescriptionWords = jobDescription.split(/\s+/).length;

  const cvWords = "AZAZA"
  const jobDescriptionWords = "OLOLO"
  const analysisResult = `
    Words in CV: ${cvWords}
    Words in Job Description: ${jobDescriptionWords}
    (Implement your detailed analysis logic here)
  `;

  chrome.storage.local.set({'analysisResult': analysisResult}, function() {
    showAnalysisPopup();
  });
}

function showAnalysisPopup() {
  chrome.windows.create({
    url: chrome.runtime.getURL('resultWindow.html'),
    type: 'popup',
    width: 400,
    height: 300
  });
}

function OLDshowAnalysisPopup(content) {
  const resultHtml = `
    <html>
      <head>
        <title>GPT Result</title>
      </head>
      <body>
        <pre>${content}</pre>
      </body>
    </html>
  `;

  const encodedResult = btoa(unescape(encodeURIComponent(resultHtml)));
  const url = 'data:text/html;base64,' + encodedResult;

  chrome.windows.create({
    url: url,
    type: 'popup',
    width: 400,
    height: 300
  });
}
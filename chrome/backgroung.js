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
    // Simple analysis: Here, we're just showing an alert. 
    // But you can implement more advanced analysis and display results differently.
    alert('Analysis Complete! (Implement your analysis logic here)');
  }
  
document.getElementById('saveBtn').addEventListener('click', function() {
    let cvText = document.getElementById('cvText').value;
    chrome.storage.local.set({'cvText': cvText}, function() {
      alert('CV text saved!');
    });
  });
  
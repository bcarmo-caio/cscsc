chrome.commands.onCommand.addListener(function(command, tab) {
   // console.log(`COMMAND "${command}" triggered`)
   if (command === "execute_copy") {
    // console.log('Inside execute_copy')
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: copyToClipboard
    });
    // showSnackbar();
  }
  else if (command === "execute_paste") {
    // console.log('Inside execute_paste')
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      function: pasteFromClipboard
    });
    // showSnackbar();
  }
});

function copyToClipboard() {
  // For some reason, I cannot debug here using console.log...
  // console.log('Inside copyToClipboard')
  const selectedText = window.getSelection().toString();
  // console.log(`Got: "${selectedText}"`)
  if (selectedText) {
    navigator.clipboard.writeText(selectedText);
  }
}

function pasteFromClipboard() {
  // For some reason, I cannot debug here using console.log...
  // console.log('Inside pasteFromClipboard')
  navigator.clipboard.readText().then(text => {
    document.execCommand('insertText', false, text);
  });
}

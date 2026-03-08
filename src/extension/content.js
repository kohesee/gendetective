// Content Script for GenDetective Chrome Extension
// This runs on every page to enable text selection analysis

console.log('GenDetective content script loaded');

// Listen for messages from the extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'get_selected_text') {
    const selectedText = window.getSelection().toString();
    sendResponse({ text: selectedText });
  }
});

// Add context menu functionality
document.addEventListener('contextmenu', (event) => {
  const selectedText = window.getSelection().toString();
  
  if (selectedText.length > 0) {
    // Selected text is available for analysis
    chrome.runtime.sendMessage({
      action: 'selection_available',
      text: selectedText
    });
  }
});

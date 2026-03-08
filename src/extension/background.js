// Service Worker for GenDetective Chrome Extension

chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    console.log('GenDetective extension installed');
  } else if (details.reason === 'update') {
    console.log('GenDetective extension updated');
  }
});

// Message handler for content script and popup communication
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyze_selection') {
    // Handle analysis of selected text
    const selectedText = request.text;
    console.log('Analyzing selected text:', selectedText);
    
    // Forward to popup or process directly
    sendResponse({ success: true, message: 'Text received for analysis' });
  }
});

// Context menu for quick analysis
chrome.contextMenus.create({
  id: 'analyze-with-gendetective',
  title: 'Analyze with GenDetective',
  contexts: ['selection']
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'analyze-with-gendetective') {
    // Send selected text to popup
    chrome.runtime.sendMessage({
      action: 'analyze_selection',
      text: info.selectionText
    });
  }
});

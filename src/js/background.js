goog.provide('scherzo.background');

goog.require('scherzo.util.compiler_satisfier');

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: 'messenger.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    },
    {
      conditions: [
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: {hostSuffix: 'developer.chrome.com'},
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});
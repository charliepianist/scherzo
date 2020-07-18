goog.module('scherzo.popup');

const CRYPTO = goog.require('scherzo.crypto');

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
})

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let tab = tabs[0];
    document.getElementById('results').innerHTML += "<br>" + tab.url || tab.pendingUrl;  
})

CRYPTO.test();
console.log(CRYPTO.HASH('test'));

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
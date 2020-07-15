goog.provide('scherzo.popup');

goog.require('scherzo.util.compiler_satisfier');
goog.require('scherzo.crypto');

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
})

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let tab = tabs[0];
    document.getElementById('results').innerHTML += "<br>" + tab.url || tab.pendingUrl;  
})

scherzo.crypto.test();
console.log(scherzo.crypto.hash('test'));

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
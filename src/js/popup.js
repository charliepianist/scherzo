goog.provide('scherzo.popup');

goog.require('sjcl');

let changeColor = document.getElementById('changeColor');

chrome.storage.sync.get('color', function(data) {
    changeColor.style.backgroundColor = data.color;
    changeColor.setAttribute('value', data.color);
})

chrome.tabs.query({active: true, currentWindow: true}, tabs => {
    let tab = tabs[0];
    document.getElementById('results').innerHTML += "<br>" + tab.url || tab.pendingUrl;  
})

function dec2bin(dec){
    return (dec >>> 0).toString(2);
}

let hash = sjcl.hash.sha256.hash('test');
let bin = hash.map(int => dec2bin(int));
let hexa = bin.map(temp => parseInt(temp, 2).toString(16));
let result = hexa.join('');

document.getElementById('results').innerHTML += result;
console.log(result);

changeColor.onclick = function(element) {
    let color = element.target.value;
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 'document.body.style.backgroundColor = "' + color + '";'});
    });
  };
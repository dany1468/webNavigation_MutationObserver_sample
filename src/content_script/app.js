// NOTE hashchange イベントを補足したら、type `tab` でメッセージを送る
window.addEventListener('hashchange', function(e) {
  console.log('app.js onhashchange');

  chrome.runtime.sendMessage({type: 'tab'}, function(response) {
    console.log('app.js onhashchange sendMessage response: ' + response.tabId);
  });
}, false);

// NOTE type `hello` のメッセージが来たら farewell とレスポンスを返す
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.type == 'hello') {
    console.log('app.js onMessage: ' + request.type);
    sendResponse({farewell: true});
  }
});

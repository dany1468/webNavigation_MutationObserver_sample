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

// NOTE body 配下の .yj-actions のエレメント（yammer のアクションボタン）の追加を監視するようにした
var selector = '.yj-message-list-item--action-list.yj-actions';

var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    for (var i = 0; i < mutation.addedNodes.length; i++) {
      var addedNode = mutation.addedNodes[i];

      if (typeof addedNode.querySelector === "function") {
        if (addedNode.querySelector(selector)) {
          console.log('app.js MutationObserver : addedNode matches');
        }
      }
    }
  });
});

observer.observe(document.body, {
  childList: true, subtree: true
});

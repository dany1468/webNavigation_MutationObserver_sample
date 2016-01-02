var eventList = [
  'onBeforeNavigate',
  'onCreatedNavigationTarget',
  'onCommitted',
  'onCompleted',
  'onDOMContentLoaded',
  'onErrorOccurred',
  'onReferenceFragmentUpdated',
  'onHistoryStateUpdated'
];

// NOTE yammer.com で発生する webNavigation イベントを補足したら
//      アクティブなタブに type `hello` とメッセージを送る
eventList.forEach(function(e) {
  chrome.webNavigation[e].addListener(function(data) {
    if (typeof data) {
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        console.log('background.js event: ' + e + ' / tabs.query tab.id: ' + tabs[0].id);

        chrome.tabs.sendMessage(tabs[0].id, {type: "hello"}, function(response) {
          console.log('background.js event: ' + e + ' / sendMessage response: ' + response.farewell);
        });
      });
    } else {
      console.error(chrome.i18n.getMessage('inHandlerError'), e);
    }
  }, {
    url: [{hostSuffix: 'yammer.com'}]
  });
});

// NOTE type が `tab` のメッセージが来たらタブ id を戻す（タブ id を戻すことに意味は無い)
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.type == 'tab') {
    console.log('background.js onMessage tab.id: ' + sender.tab.id);
    sendResponse({tabId: sender.tab.id});
  }
});

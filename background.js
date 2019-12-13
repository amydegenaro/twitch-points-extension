'use strict';

chrome.runtime.onInstalled.addListener(function() {
  console.log('WE ARE RUNNING');
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'www.twitch.tv', schemes: ['https']},
      })
      ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onUpdated.addListener(function() {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    //   console.log(response.farewell);
    // });
    chrome.tabs.sendMessage(tabs[0].id, { action: "clickBonusBox" }, function(response) {
      console.log(response.clicked);
    });
  });
});

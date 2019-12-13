chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('HELLOOOOO I AM LISTENING')

  // if (request.greeting == "hello")
  //   sendResponse({farewell: "goodbye"});

  if (request.action === "clickBonusBox") {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    const targetNode = document.getElementsByClassName("community-points-summary")[0];
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true
    }

    const observer = new MutationObserver((mutations) => {
      // what we want to fire when mutation on target node is found
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const bonusButton = mutation.target.querySelector('tw-button--success') || document.getElementsByClassName('tw-button--success')[0];
          if (bonusButton) {
            console.log('Bonus available, clicking...');
            bonusButton.click();
            sendResponse({ clicked: "Bonus points clicked!" });
          }
        }
      })
    });

    observer.observe(targetNode, observerOptions);
  }
});

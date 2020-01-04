chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('HELLOOOOO I AM LISTENING')

  if (request.action === "clickBonusBox") {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver
    const targetNode = document.getElementsByClassName("community-points-summary")[0];
    const observerOptions = {
      childList: true,
      attributes: true,
      subtree: true
    }

    targetNode.getElementsByTagName('button')[1].click();

    const observer = new MutationObserver((mutations) => {
      // what we want to fire when mutation on target node is found
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          const bonusButton = mutation.target.getElementsByTagName('button')[1]
          || targetNode.getElementsByTagName('button')[1];

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

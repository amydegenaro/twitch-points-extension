const clickButton = (source) => {
  const button = source.getElementsByTagName('button')[0];
  // can also use getElementsByClassName('tw-button--success')[0]
  if (button) {
    console.log('Bonus available, clicking...');
    button.click();
    console.log('Click succcessful! :D');
  };
};

chrome.runtime.onMessage.addListener((request) => {
  console.log('HELLOOOOO I AM LISTENING');

  if (request.action === "checkForBonus") {
    console.log('Waiting for bonus...');

    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    const targetNode = document.getElementsByClassName("community-points-summary")[0].children[1];
    clickButton(targetNode);

    const observer = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        clickButton(mutation.target);
      })
    });

    observer.observe(targetNode, { childList: true });
  }
});

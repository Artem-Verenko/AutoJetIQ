chrome.runtime.sendMessage("Hello from content script!", (response) => {
    console.log(response);
})
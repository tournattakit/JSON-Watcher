
chrome.runtime.onInstalled.addListener(function () {
    chrome.storage.sync.set({ isActive: true, isNewTab: false });

    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules([{
            conditions: [new chrome.declarativeContent.PageStateMatcher()
            ],
            actions: [new chrome.declarativeContent.ShowPageAction()]
        }]);
    });
});

chrome.webRequest.onBeforeRequest.addListener(function (details) {
    chrome.storage.sync.get('isActive', function (data) {
        if (data.isActive) {
            const { frameId, url, tabId } = details;

            if (frameId > 0) return;

            var params = (new URL(url)).searchParams;

            var str = params.get('q');

            try {
                var json = JSON.parse(str);

                if (typeof (json) !== "object" || json == null) return;

                chrome.storage.sync.get('isNewTab', function (data) {
                    if (data.isNewTab) {
                        chrome.tabs.create({ url: chrome.extension.getURL('content/content.html') });
                    } else {
                        chrome.tabs.update(tabId, { url: chrome.extension.getURL('content/content.html') });
                    }

                    chrome.runtime.onMessage.addListener(
                        function (request, sender, sendResponse) {
                            if (request.msg === "created") {
                                chrome.runtime.sendMessage(json);
                            }
                        }
                    );
                });
            }
            catch
            {
                return;
            }
        }
    });
}, { urls: ["<all_urls>"] });
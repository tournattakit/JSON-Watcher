'use strict';

let chk_active = document.getElementById("chk_active");
let chk_newtab = document.getElementById("chk_newtab");

chrome.storage.sync.get('isActive', function (data) {
    if (data.isActive) {
        chk_active.checked = true;
    } else {
        chk_active.checked = false;
    }
});

chrome.storage.sync.get('isNewTab', function (data) {
    if (data.isNewTab) {
        chk_newtab.checked = true;
    } else {
        chk_newtab.checked = false;
    }
});

chk_active.addEventListener('change', function () {
    if (this.checked) {
        chrome.storage.sync.set({ isActive: true });
    } else {
        chrome.storage.sync.set({ isActive: false });
    }
});

chk_newtab.addEventListener('change', function () {
    if (this.checked) {
        chrome.storage.sync.set({ isNewTab: true });
    } else {
        chrome.storage.sync.set({ isNewTab: false });
    }
});
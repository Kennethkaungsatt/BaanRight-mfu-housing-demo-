// Background service worker (Manifest V3)

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "translate-selection",
    title: 'Translate with Baan Buddy',
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info) => {
  if (info.menuItemId === "translate-selection" && info.selectionText) {
    await chrome.storage.local.set({ pendingText: info.selectionText });
    openPopupSafely();
  }
});

// Relay from content.js's floating "Translate" button
chrome.runtime.onMessage.addListener((message) => {
  if (message?.type === "TRANSLATE_SELECTION" && message.text) {
    chrome.storage.local.set({ pendingText: message.text }).then(openPopupSafely);
  }
});

function openPopupSafely() {
  // openPopup requires a recent user gesture and is only supported on some
  // Chrome versions; fall back silently if it's unavailable. The popup also
  // checks storage for pendingText on its own open, as a backup path.
  if (chrome.action && chrome.action.openPopup) {
    chrome.action.openPopup().catch(() => {});
  }
}

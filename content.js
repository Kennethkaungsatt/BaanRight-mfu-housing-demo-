// Shows a small floating button near selected text so a student can select
// a Thai post (e.g. inside a Facebook group they're already a member of)
// and send just that selected text to the extension. This never fetches
// anything from the page on its own and never reads a URL — it only acts
// on text the user has explicitly highlighted.

let floatBtn = null;

function removeButton() {
  if (floatBtn) {
    floatBtn.remove();
    floatBtn = null;
  }
}

document.addEventListener("mouseup", () => {
  removeButton();
  const selection = window.getSelection();
  const text = selection ? selection.toString().trim() : "";
  if (text.length < 10 || selection.rangeCount === 0) return;

  const range = selection.getRangeAt(0);
  const rect = range.getBoundingClientRect();

  floatBtn = document.createElement("button");
  floatBtn.textContent = "Translate with Baan Buddy";
  Object.assign(floatBtn.style, {
    position: "fixed",
    top: `${Math.max(rect.top - 34, 4)}px`,
    left: `${Math.min(rect.left, window.innerWidth - 200)}px`,
    zIndex: 2147483647,
    background: "#0f6e56",
    color: "white",
    border: "none",
    borderRadius: "999px",
    padding: "6px 12px",
    fontSize: "12px",
    fontFamily: "sans-serif",
    cursor: "pointer",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)"
  });

  floatBtn.addEventListener("mousedown", (e) => e.preventDefault()); // keep selection
  floatBtn.addEventListener("click", () => {
    chrome.runtime.sendMessage({ type: "TRANSLATE_SELECTION", text });
    removeButton();
  });

  document.body.appendChild(floatBtn);
});

document.addEventListener("mousedown", (e) => {
  if (floatBtn && e.target !== floatBtn) removeButton();
});

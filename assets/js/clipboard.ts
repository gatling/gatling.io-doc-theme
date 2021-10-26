import Clipboard from "clipboard";

var $blocks = document.querySelectorAll("pre");

// Hugo only wraps highlighted code blocks in a div
// We catch orphan pre blocks and wrap them ourselves to harmonize styling
for (let i = 0, len = $blocks.length; i < len; i++) {
  const pre = $blocks[i];
  if (pre.parentNode && pre.parentNode.className !== "highlight") {
    const wrap = document.createElement("div");
    wrap.classList.add("highlight");
    pre.parentNode.insertBefore(wrap, pre);
    wrap.appendChild(pre);
  }
}

var $highlights = document.querySelectorAll(".highlight");

function copyButton() {
  var copy = document.createElement("button");
  copy.className = "btn-clipboard btn btn-sm btn-link";
  return copy;
}

function statusButton(parent) {
  var status = document.createElement("span");
  status.className = "copy-status";
  parent.append(status);
}

function clipboardButton(element) {
  var copy = copyButton();
  statusButton(copy);
  element.prepend(copy);
}

for (let i = 0, len = $highlights.length; i < len; i++) {
  clipboardButton($highlights[i]);
}

const clipboard = new Clipboard(".btn-clipboard", {
  target: function (trigger) {
    return trigger.nextElementSibling;
  },
});

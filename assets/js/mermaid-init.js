import mermaid from "{{ .Site.Params.mermaid.moduleurl }}";
mermaid.initialize({ startOnLoad: false });

const initialize = () => {
  const theme = document.documentElement.hasAttribute("data-dark-mode") ? "dark" : "default";
  mermaid.initialize({ startOnLoad: false, theme: theme });

  const items = document.querySelectorAll(".mermaid");

  let counter = 0;
  for (const item of items) {
    const id = counter++;
    if (item.originalCode === undefined) {
      item.originalCode = item.textContent.trim();
    }
    mermaid.render("mermaid" + id, item.originalCode).then((value) => {
      item.innerHTML = value.svg;
    }, (error) => {
      console.log(error);
      item.innerHTML = "";
      item.appendChild(document.getElementById("mermaid" + id));
    });
  }
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("mode").addEventListener("click", initialize);
  initialize();
});

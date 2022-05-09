const DATA_TOGGLE_KEY = "data-toggle-key";
const DATA_TOGGLE_VALUE = "data-toggle-value";

const ACTIVE_CLASS = "active";

const toggleAllTabsOnClick = (targetKey, targetValue, initializing) => {
  // We store the config language selected in users' localStorage
  localStorage.setItem(targetKey, targetValue);
  if (!initializing && targetKey === "language") {
    window.gtag("event", "Language toggle clicked", {
      event_category: "Documentation DSL",
      event_label: window.languages[targetValue],
    });
  }

  document.querySelectorAll(`[${DATA_TOGGLE_KEY}='${targetKey}']`).forEach(selected => {
    selected.classList.remove(ACTIVE_CLASS);
    if (selected.getAttribute(DATA_TOGGLE_VALUE) === targetValue) {
      selected.classList.add(ACTIVE_CLASS);
    }
  })
};

for (const tab of document.querySelectorAll(`button[${DATA_TOGGLE_KEY}]`)) {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    toggleAllTabsOnClick(
      event.currentTarget.getAttribute(DATA_TOGGLE_KEY),
      event.currentTarget.getAttribute(DATA_TOGGLE_VALUE),
      false
    )
  });
}

// Clean up old items
if (localStorage.hasOwnProperty("configLangPref")) {
  localStorage.removeItem("configLangPref");
}

const DEFAULTS_TABS = {
  "build-tool": "maven",
  "language": "java"
}

for (const [key, defaultValue] of Object.entries(DEFAULTS_TABS)) {
  const value = localStorage.hasOwnProperty(key) ? localStorage.getItem(key) : defaultValue;
  toggleAllTabsOnClick(key, value, true);
}


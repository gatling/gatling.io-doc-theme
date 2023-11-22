const DATA_TOGGLE_KEY = "data-toggle-key";
const DATA_TOGGLE_VALUE = "data-toggle-value";

const ACTIVE_CLASS = "active";

const selectTabEvent = (targetKey: string, targetValue: string) => {
  document.querySelectorAll(`[${DATA_TOGGLE_KEY}='${targetKey}']`).forEach(selected => {
    selected.classList.remove(ACTIVE_CLASS);
    if (selected.getAttribute(DATA_TOGGLE_VALUE) === targetValue) {
      selected.classList.add(ACTIVE_CLASS);
    }
  })
}

const DEFAULTS_TABS = {
  "build-tool": "maven",
  "language": "java"
}

const toggleAllTabsOnClick = (targetKey: string, targetValue: string) => {
  if (targetKey in DEFAULTS_TABS) {
    // We store the config language selected in users' localStorage
    localStorage.setItem(targetKey, targetValue);

    if (targetKey === "language") {
      if (window.gtag !== undefined && window.languages !== undefined && window.languages.hasOwnProperty(targetValue)) {
        window.gtag("event", "Language toggle clicked", {
          event_category: "Documentation DSL",
          event_label: window.languages[targetValue],
        });
      }
    }
  }

  selectTabEvent(targetKey, targetValue);
};

for (const tab of document.querySelectorAll(`button[${DATA_TOGGLE_KEY}]`)) {
  tab.addEventListener("click", (event) => {
    event.preventDefault();
    toggleAllTabsOnClick(
      event.currentTarget.getAttribute(DATA_TOGGLE_KEY),
      event.currentTarget.getAttribute(DATA_TOGGLE_VALUE)
    )
  });
}

// Clean up old items
if (localStorage.hasOwnProperty("configLangPref")) {
  localStorage.removeItem("configLangPref");
}

for (const [key, defaultValue] of Object.entries(DEFAULTS_TABS)) {
  const value = localStorage.getItem(key) ?? defaultValue;
  selectTabEvent(key, value);
}

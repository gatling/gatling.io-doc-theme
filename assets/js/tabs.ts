const DATA_TOGGLE_KEY = "data-toggle-key";
const DATA_TOGGLE_VALUE = "data-toggle-value";

const ACTIVE_CLASS = "active";

const RANDOMIZED_DATA_PREFIX = "code-toggle-";

const selectTabEvent = (targetKey: string, targetValue: string) => {
  document.querySelectorAll(`[${DATA_TOGGLE_KEY}='${targetKey}']`).forEach(selected => {
    selected.classList.remove(ACTIVE_CLASS);
    if (selected.getAttribute(DATA_TOGGLE_VALUE) === targetValue) {
      selected.classList.add(ACTIVE_CLASS);
    }
  })
};

const TABS_DEFAULTS = {
  "build-tool": "maven",
  "language": "java",
  "platform": window.navigator.platform.indexOf("Win") !== -1 ? "Windows" : "Linux/MacOS"
};

const toggleAllTabsOnClick = (targetKey: string, targetValue: string) => {
  if (targetKey === "language") {
    if (window.gtag !== undefined && window.languages !== undefined && window.languages.hasOwnProperty(targetValue)) {
      window.gtag("event", "Language toggle clicked", {
        event_category: "Documentation DSL",
        event_label: window.languages[targetValue],
      });
    }
  }

  selectTabEvent(targetKey, targetValue);
};

for (const tab of document.querySelectorAll(`button[${DATA_TOGGLE_KEY}]`)) {
  tab.addEventListener("click", (event) => {
    event.preventDefault();

    const targetKey = event.currentTarget.getAttribute(DATA_TOGGLE_KEY);
    const targetValue = event.currentTarget.getAttribute(DATA_TOGGLE_VALUE);
    toggleAllTabsOnClick(targetKey, targetValue);

    if (!targetKey.startsWith(RANDOMIZED_DATA_PREFIX)) {
      // We store the config selected in users' localStorage
      localStorage.setItem(targetKey, targetValue);
    }
  });
}

for (const [key, defaultValue] of Object.entries(TABS_DEFAULTS)) {
  const value = localStorage.getItem(key) ?? defaultValue;

  selectTabEvent(key, value);
}

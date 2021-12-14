const tabs = document.querySelectorAll("[data-toggle-tab]");
const panes = document.querySelectorAll("[data-pane]");

const toggleAllTabsOnClick = (event, targetKey) => {
  const initializing = targetKey !== undefined;

  let targetValue;
  if (event.target) {
    event.preventDefault();
    targetKey = event.currentTarget.getAttribute("data-toggle-key");
    targetValue = event.currentTarget.getAttribute("data-toggle-tab");
  } else {
    targetValue = event;
  }

  // We store the config language selected in users' localStorage
  localStorage.setItem(targetKey, targetValue);
  if (!initializing && targetKey === "language") {
    window.gtag("event", "Language toggle clicked", {
      event_category: "Documentation DSL",
      event_label: window.languages[targetValue],
    });
  }

  const selectedTabs = document.querySelectorAll(
    "[data-toggle-tab='" + targetValue + "']"
  );
  const selectedPanes = document.querySelectorAll(
    "[data-pane='" + targetValue + "']"
  );

  for (let i = 0; i < tabs.length; i++) {
    tabs[i].classList.remove("active");
    panes[i].classList.remove("active");
  }

  for (let i = 0; i < selectedTabs.length; i++) {
    selectedTabs[i].classList.add("active");
    selectedPanes[i].classList.add("active");
  }
};

for (const tab of tabs) {
  tab.addEventListener("click", toggleAllTabsOnClick);
}

// Clean up old items
if (localStorage.hasOwnProperty("configLangPref")) {
  localStorage.removeItem("configLangPref");
}

// Set defaults
for (const [key, value] of [
  ["build-tool", "bundle"],
  ["language", "java"],
]) {
  if (!localStorage.hasOwnProperty(key)) {
    localStorage.setItem(key, value);
  }
}

// Upon page load, if user has a preferred language or build-tool in its localStorage, tabs are set to it.
for (const key of ["build-tool", "language"]) {
  if (localStorage.hasOwnProperty(key)) {
    toggleAllTabsOnClick(localStorage.getItem(key), key);
  }
}

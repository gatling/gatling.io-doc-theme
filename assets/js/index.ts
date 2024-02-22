import FlexSearch, { CreateOptions, SearchOptions } from "flexsearch";

const suggestions = document.getElementById("suggestions");
const userinput = document.getElementById("userinput");

if (suggestions !== null && userinput !== null) {
  initializeSearch(suggestions, userinput as HTMLInputElement);
}

type FrontMatter = {
  title: string;
  description: string;
  content: string;
  href: string;
  section: string;
};

const KeyCodes = {
  up: 38,
  down: 40,
  slash: 191,
  escape: 27,
};

const searchLimit = 10;
const indexOptions: CreateOptions = {
  filter: false,
  cache: true,
  async: true,
  encode: "extra",
  tokenize: "strict",
  doc: {
    id: "id",
    field: ["title", "description", "content", "section"],
    store: ["title", "description", "href", "section"],
  },
};

const index = FlexSearch.create<FrontMatter>(indexOptions);

const createSearchEntryElement = (frontMatter: FrontMatter): HTMLDivElement => {
  const entry = document.createElement("div");

  const suggestion = document.createElement("a");
  suggestion.classList.add("suggestion");
  suggestion.href = frontMatter.href;

  const label = document.createElement("div");

  const title = document.createElement("span");
  const titleText = document.createTextNode(frontMatter.title);
  title.append(titleText);
  label.append(title);

  const section = document.createElement("span");
  const sectionText = document.createTextNode(frontMatter.section);
  section.append(sectionText);
  label.append(section);

  const description = document.createElement("span");
  const descriptionText = document.createTextNode(frontMatter.description);
  description.append(descriptionText);

  suggestion.append(label);
  suggestion.append(description);
  entry.append(suggestion);

  return entry;
};

const whileResultsInferiorSearchLimit =
  (fallback: (limit: number) => Promise<FrontMatter[]>) =>
  (results: FrontMatter[]): Promise<FrontMatter[]> => {
    if (results.length < searchLimit) {
      const nextLimit = searchLimit - results.length;
      return fallback(nextLimit).then((newResults) => [
        ...results,
        ...newResults.slice(0, nextLimit),
      ]);
    } else {
      return Promise.resolve(results);
    }
  };

type SearchQuery = SearchOptions & { query: string };
const searchOptionsQueryFields = (query: string): SearchQuery[] =>
  indexOptions.doc?.field.map(
    (field: string): SearchQuery => ({
      field,
      query,
      bool: "or",
    })
  );

const search = (query: string): Promise<FrontMatter[]> => index.search({
  query,
  limit: searchLimit,
});

const displayNoneClass = "d-none";
const hideElement = (element: HTMLElement, hide: boolean): void => {
  if (hide) element.classList.add(displayNoneClass);
  else element.classList.remove(displayNoneClass);
};

function initializeSearch(
  suggestions: HTMLElement,
  userinput: HTMLInputElement
): void {
  // Shortcuts
  document.addEventListener("keydown", (e: KeyboardEvent) => {
    switch (e.keyCode) {
      // Open search
      case KeyCodes.slash:
        e.preventDefault();
        userinput.focus();
        break;

      // Close search
      case KeyCodes.escape:
        userinput.blur();
        hideElement(suggestions, true);
        break;

      // Navigate search
      case KeyCodes.up:
      case KeyCodes.down:
        const suggestionsHidden = suggestions.classList.contains(displayNoneClass);
        if (suggestionsHidden) return;

        const focusableSuggestions = [...suggestions.querySelectorAll("a")];
        if (focusableSuggestions.length === 0) return;

        e.preventDefault();

        const index = focusableSuggestions.indexOf(document.activeElement);

        const offset = e.keyCode === KeyCodes.up ? -1 : 1;
        const nextIndex = Math.max(
          Math.min(index + offset, focusableSuggestions.length),
          0
        );
        focusableSuggestions[nextIndex].focus();
        break;
    }
  });

  // Hide when click outside
  document.addEventListener("click", (event) => {
    if (suggestions.contains(event.target as Node)) {
      hideElement(suggestions, true);
    }
  });

  // User search input
  userinput.addEventListener(
    "input",
    function () {
      const inputElement = this as HTMLInputElement;
      const value = inputElement.value;

      const results = search(value);

      hideElement(suggestions, false);
      const previousChildsLength = suggestions.childNodes.length;

      results.then((frontMatters) => {
        suggestions.append(...frontMatters.map(createSearchEntryElement));
        for (let i = 0; i < previousChildsLength; i++) {
          suggestions.firstChild &&
            suggestions.removeChild(suggestions.firstChild);
        }
      });
    },
    true
  );

  // Empty suggestions on entry click
  suggestions.addEventListener(
    "click",
    () => suggestions.childNodes.forEach(suggestions.removeChild),
    true
  );
}

fetch("{{ strings.TrimRight "/" .Site.BaseURL }}/search/index.json")
  .then((response) => response.json())
  .then(({ exported, indexes }) => {
    if (exported) {
      // @ts-ignore
      index.import(indexes, { serialize: false });
    } else {
      index.add(indexes);
    }
  });

// FIXME: js.Build import all dependencies inside concatenated file, in a self-called function preventing the export

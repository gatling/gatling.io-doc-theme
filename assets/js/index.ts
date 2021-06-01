import FlexSearch, {CreateOptions, Index, SearchOptions} from "flexsearch";

const suggestions = document.getElementById('suggestions');
const userinput = document.getElementById('userinput');

if (suggestions !== null && userinput !== null) {
  initializeSearch(suggestions, userinput as HTMLInputElement);
}

type FrontMatter = {
  title: string,
  description: string,
  content: string,
  href: string,
  version: string,
  latest: string,
  section: string
}

const KeyCodes = {
  up: 38,
  down: 40,
  slash: 191,
  escape: 27
}

const searchLimit = 10;
const indexOptions: CreateOptions = {
  filter: false,
  cache: true,
  async: true,
  encode: "extra",
  tokenize: "strict",
  doc: {
    id: 'id',
    field: [
      'title',
      'description',
      'content',
      'section',
      'version',
      'latest'
    ],
    // @ts-ignore https://github.com/nextapps-de/flexsearch/issues/152
    store: [
      'title',
      'description',
      'href',
      'section',
      'version',
      'latest'
    ]
  },
}

const index = FlexSearch.create<FrontMatter>(indexOptions);


const createSearchEntryElement = (frontMatter: FrontMatter): HTMLDivElement => {
  const entry = document.createElement('div');

  const hyperlink = document.createElement('a');
  hyperlink.href = frontMatter.href;

  const title = document.createElement('span');
  const titleText = document.createTextNode(frontMatter.title);
  title.append(titleText);

  const description = document.createElement('span');
  const descriptionText = document.createTextNode(frontMatter.description);
  description.append(descriptionText);

  hyperlink.append(title);
  hyperlink.append(description);

  entry.append(hyperlink);
  return entry;
}

type SearchConfiguration = {
  section: string,
  version?: string,
  latest?: string
}

let searchConfiguration: SearchConfiguration = {
  section: "",
  version: undefined,
  latest: undefined
};

const updateSearchOptions = (section: string, version?: string, latest?: boolean): void => {
  searchConfiguration = {
    section,
    version,
    latest: `${latest === undefined ? version === undefined : latest}` // Filter on latest when version isn't set
  }
};

const whileResultsInferiorSearchLimit = (fallback: (limit: number) => Promise<FrontMatter[]>) => (results: FrontMatter[]): Promise<FrontMatter[]> => {
  if (results.length < searchLimit) {
    const nextLimit = searchLimit - results.length;
    return fallback(nextLimit).then(newResults => [...results, ...newResults.slice(0, nextLimit)]);
  } else {
    return Promise.resolve(results);
  }
}

type SearchQuery = SearchOptions & {query: string};
const searchOptionsQueryFields = (query: string,): SearchQuery[] =>
  indexOptions.doc?.field.map((field: string): SearchQuery => ({
    field,
    query,
    bool: "or"
  }))

const search = (query: string): Promise<FrontMatter[]> => {
  if (searchConfiguration.version) {
    return index.search({
      query,
      limit: searchLimit,
      where: {
        section: searchConfiguration.section,
        version: searchConfiguration.version
      }
    }).then(whileResultsInferiorSearchLimit((limit) =>
      index.search({
        query,
        limit,
        where: {
          version: "null"
        }
      })
    )).then(whileResultsInferiorSearchLimit(() =>
      // @ts-ignore
      index.search([
        ...searchOptionsQueryFields(query),
        {
          field: "latest",
          query: "false",
          bool: "not" // boolean condition must be inverse for it to work
        },
        {
          field: "section",
          query: searchConfiguration.section,
          bool: "not"
        }
      ])
    ));
  } else {
    return index.search({
      query,
      limit: searchLimit,
      where: {
        latest: "true"
      }
    });
  }
}

const displayNoneClass = 'd-none';
const hideElement = (element: HTMLElement, hide: boolean): void => {
  if (hide) element.classList.add(displayNoneClass);
  else element.classList.remove(displayNoneClass);
}


function initializeSearch(suggestions: HTMLElement, userinput: HTMLInputElement): void {

  // Shortcuts
  document.addEventListener('keydown', (e: KeyboardEvent) => {
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
        e.preventDefault();
        const focusableSuggestions = suggestions.querySelectorAll('a') || [];
        const index: number = Array.from(focusableSuggestions).indexOf(document.activeElement as HTMLAnchorElement);

        const offset = e.keyCode === KeyCodes.up ? -1 : 1;
        const nextIndex = Math.max(Math.min(index + offset, focusableSuggestions.length), 0);
        focusableSuggestions[nextIndex].focus();
        break;
    }
  });

  // Hide when click outside
  document.addEventListener('click', (event) => {
    if (suggestions.contains(event.target as Node)) {
      hideElement(suggestions, true);
    }
  });

  // User search input
  userinput.addEventListener('input', function() {
    const inputElement = this as HTMLInputElement;
    const value = inputElement.value;

    const results = search(value);

    hideElement(suggestions, false);
    const previousChildsLength = suggestions.childNodes.length;

    results.then((frontMatters) => {
      suggestions.append(...frontMatters.map(createSearchEntryElement));
      for (let i = 0; i < previousChildsLength; i++) {
        suggestions.firstChild && suggestions.removeChild(suggestions.firstChild);
      }
    })
  }, true);

  // Empty suggestions on entry click
  suggestions.addEventListener('click', () => suggestions.childNodes.forEach(suggestions.removeChild), true);
}

fetch("{{ .Site.BaseURL }}/search/index.json")
  .then(response => response.json())
  .then(({ exported, indexes }) => {
      if (exported) { // @ts-ignore
        index.import(indexes, { serialize: false });
      } else {
        index.add(indexes);
      }
  })

// FIXME: js.Build import all dependencies inside concatenated file, in a self-called function preventing the export
window.updateSearchVersion = (section: string, version?: string, latest?: boolean): void =>
  updateSearchOptions(section, version, latest)


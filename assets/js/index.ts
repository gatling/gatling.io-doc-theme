import FlexSearch, { Index, SearchOptions } from "flexsearch";

const suggestions = document.getElementById('suggestions');
const userinput = document.getElementById('userinput');

if (suggestions !== null && userinput !== null) {
  initializeSearch(suggestions, userinput as HTMLInputElement)
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

const index = FlexSearch.create<FrontMatter>({
  cache: true,
  async: true,
  encode: "extra",
  doc: {
    id: 'id',
    field: [
      'title',
      'description',
      'content'
    ],
    // @ts-ignore https://github.com/nextapps-de/flexsearch/issues/152
    store: [
      'title',
      'description',
      'href',
      'version',
      'latest',
      'section',
      'content'
    ]
  },
});


const createSearchEntryElement = (frontMatter: FrontMatter): HTMLDivElement => {
  const entry = document.createElement('div');

  const hyperlink = document.createElement('a');
  hyperlink.href = frontMatter.href;

  const title = document.createElement('span')
  const titleText = document.createTextNode(frontMatter.title)
  title.append(titleText)

  const description = document.createElement('span')
  const descriptionText = document.createTextNode(frontMatter.description)
  description.append(descriptionText)

  hyperlink.append(title)
  hyperlink.append(description)

  entry.append(hyperlink)
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
}
const updateSearchOptions = (section: string, version?: string, latest?: boolean): void => {
  searchConfiguration = {
    version,
    latest: `${latest === undefined ? version === undefined : latest}` // Filter on latest when version isn't set
  }
}

const search = (query: string): Promise<FrontMatter[]> => {
  const options: SearchOptions = {};
  // [{
  //   query,
  //   where: {
  //     section: searchConfiguration.section,
  //     version: searchConfiguration.version, // si y'en a pas, c'est latest true
  //     latest: `${searchConfiguration.version === undefined}`
  //   },
  //   bool: "and"
  // }, {
  //   query,
  //   where: {
  //     section: !== searchConfiguration.section,
  //     latest: "false"
  //   },
  //   bool: "not"
  // }]

  if (searchConfiguration.version) {
    options.where = {
      version: searchConfiguration.version
    }
  }

  console.log("options:")
  console.log({
    query,
    ...options
  });

  return index.search({
    query,
    ...options
  });
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
        suggestions.classList.add('d-none');
        break;

      // Navigate search
      case KeyCodes.up:
      case KeyCodes.down:
        e.preventDefault();
        const focusableSuggestions = suggestions.querySelectorAll('a') || [];
        const index: number = Array.from(focusableSuggestions).indexOf(document.activeElement as HTMLAnchorElement)

        const offset = e.keyCode === KeyCodes.up ? 1 : -1;
        const nextIndex = Math.max(Math.min(index + offset, focusableSuggestions.length), 0)
        focusableSuggestions[nextIndex].focus();
        break;
    }
  });

  // Hide when click outside
  document.addEventListener('click', (event) => {
    if (suggestions.contains(event.target as Node)) {
      suggestions.classList.add('d-none');
    }
  });

  // User search input
  userinput.addEventListener('input', function() {
    const inputElement = this as HTMLInputElement;
    const value = inputElement.value;

    const results = search(value);

    suggestions.classList.remove('d-none');
    suggestions.childNodes.forEach(suggestions.removeChild)

    results.then((frontMatters) => {
      console.log("results:")
      console.log(frontMatters)
      suggestions.append(...frontMatters.map(createSearchEntryElement))
    })
  }, true);

  // Empty suggestions on entry click
  suggestions.addEventListener('click', () => suggestions.childNodes.forEach(suggestions.removeChild), true);
}

const docs = [
  {{ range $index, $page := .Site.Pages -}}
{
  id: {{ $index }},
  href: "{{ .Permalink | absURL }}",
    title: {{ .Title | jsonify }},
  description: {{ .Params.description | jsonify }},
  content: {{ .Content | plainify | jsonify }},
  version: "{{ .Params.version }}",
  latest: "{{ .Params.latest }}",
  section: "{{ .Section }}",
},
{{ end -}}
];

// @ts-ignore
index.add(docs)
console.log(index.export())


// FIXME: js.Build import all dependencies inside concatenated file, in a self-called function preventing the export
window.updateSearchVersion = (section: string, version?: string, latest?: boolean): void => {
  updateSearchOptions(section, version, latest)
}


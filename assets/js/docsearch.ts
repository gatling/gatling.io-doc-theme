{{ with .Site.Params.docSearch }}
import docsearch from '@docsearch/js';

// https://docsearch.algolia.com/docs/api/#transformsearchclient
function debounce(func, wait) {
  let lastTimeout = null;
  return function (...args) {
    const that = this;
    return new Promise((resolve, reject) => {
      if (lastTimeout) {
        clearTimeout(lastTimeout);
      }
      lastTimeout = setTimeout(() => {
        lastTimeout = null;
        Promise.resolve(func.apply(that, args)).then(resolve).catch(reject);
      }, wait);
    });
  };
}

docsearch({
  appId: "{{ .appId }}",
  apiKey: "{{ .apiKey }}",
  container: '#docSearch',
  debug: false, // Set debug to true if you want to inspect the modal
  indexName: "{{ .indexName }}",
  insights: true, // Optional, automatically send insights when user interacts with search results
  transformSearchClient: (searchClient: any) => ({
    ...searchClient,
    search: debounce(searchClient.search, 200)
  }),
  askAi: {
    indexName: "{{ .askAi.indexName }}",
    apiKey: "{{ .askAi.apiKey }}",
    appId: "{{ .askAi.appId }}",
    assistantId: "{{ .askAi.assistantId }}",
  }
});

const onClick = function() {
  document.getElementsByClassName("DocSearch-Button")[0].click();
}

const docSearchToggle = document.getElementById("docSearchToggle");
docSearchToggle.addEventListener("click", () => onClick(), true);
{{ end }}

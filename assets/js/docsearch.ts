{{ with .Site.Params.docSearch }}
import docsearch from "@docsearch/js";

docsearch({
  appId: "{{ .appId }}",
  apiKey: "{{ .apiKey }}",
  indexName: "{{ .indexName }}",
  insights: true, // Optional, automatically send insights when user interacts with search results
  container: '#docSearch',
  debug: false // Set debug to true if you want to inspect the modal
});

const onClick = function() {
  document.getElementsByClassName("DocSearch-Button")[0].click();
}

const docSearchToggle = document.getElementById("docSearchToggle");
docSearchToggle.addEventListener("click", () => onClick(), true);
{{ end }}


# gatling.io/docs Hugo Module Theme

## Dev mode

### Quick (docker-compose)

```console
docker-compose up
```

Then, go to [http://localhost:1313](http://localhost:1313)

### Local

```console
cd exampleSite
hugo mod npm pack
npm install
hugo server --buildDrafts
```

Then, go to [http://localhost:1313](http://localhost:1313)

## Using the theme

*ref: https://gohugo.io/hugo-modules/use-modules/#use-a-module-for-a-theme*

```console
hugo mod init github.com/<your_user>/<your_project>
```

Add the module theme to your hugo project configuration:

```yaml
module:
  imports:
    - path: github.com/gatling/gatling.io-doc-theme
```

Retrieve the node dependencies:

```console
hugo mod get -u
hugo mod npm pack
npm install
```

Add babel configuration:
```javascript
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          browsers: [
            // Best practice: https://github.com/babel/babel/issues/7789
            ">=1%",
            "not ie 11",
            "not op_mini all",
          ],
        },
      },
    ],
    "@babel/preset-typescript",
  ],
};
```

## Configuration

### params.yaml

```yaml
# Meta Data for SEO
title: "Gatling"
titleSeparator: "-"
description: "Documentation"

## Open Graph + Twitter Cards
images: ["gatling-logo.png"]
twitterSite: "GatlingTool"
twitterCreator: "GatlingTool"
facebookAuthor: "GatlingTool"
facebookPublisher: "GatlingTool"
ogLocale: "en_US"

## JSON-LD
schemaName: "Gatling Corp"
schemaLogo: "gatling-logo.png"
schemaTwitter: "https://twitter.com/GatlingTool"
schemaLinkedIn: "https://www.linkedin.com/company/gatling/"
schemaGitHub: https://github.com/gatling

## Sitelinks Search Box
siteLinksSearchBox: false

## Chrome Browser
themeColor: "#fff"

# Images
quality: 85
bgColor: "#fff"
lqipWidth: "20x"

# Alert
alert: false  # show alert text
alertText: "" # alert text displayed before footer

# Footer
footer: "Powered by Hugo, and fork from Doks theme"

# Edit Page
editPage: true # add Github edition links (see editPage requirement)

options:
  lazySizes: true    # enable https://github.com/aFarkas/lazysizes
  instantPage: true  # enable https://instant.page/
  flexSearch: true   # enable search (see search requirement)
  darkMode: true     # toggle dark mode
  bootStrapJs: false # activate Bootstrap JS
  breadCrumb: false  # add bread crumb

includeCode:
  default: scala
  labels:
    java: Java
    kt: Kotlin
    scala: Scala

analytics:
  universalTrackingId: "UA-XXXXXXXX-X"
  globalTrackingId: "G-XXXXXXXXX"
  tagManagerTrackingId: "GTM-XXXXXXX"
```

#### Search

Enabling search require you to add the following content file at `content/search.md`

**search.md**

```yaml
---
layout: "search"
outputs: ["json"]
noindex: true
---
```

#### Edit page

Enabling edit page require a page parameters `docsRepo` with values:

* **url**: the URL to the content folder of your documentation
* **rel**: prefix to truncate on the file path

### menu.yaml

**Main**

Allow you to specify URL you wan't to add in the top bar menu.

```yaml
main:
  - name: OSS
    url: /oss/
    weight: 1
```

**Social**

```yaml
social:
  - name: Twitter
    pre: <i class="fab fa-twitter"></i>
    url: 'https://twitter.com/GatlingTool'
    weight: 1
```

## Parameters


## Content

Content files tree must match the following description for sidebar menu and pages navigation to works properly.

Every `content` folder should define a node `_index.md` or a section `index.md` with front-matter parameters `title` and  `description`.

**structure**

```
content
├── section-1
│   ├── _index.md
│   ├── category-1
│   │   ├── _index.md
│   │   ├── part-1
│   │   │   └── index.md
│   │   └── part-2.md
│   └── category-2
│   │   └── ...
└── section-2
    └── ...
```

Sidebar menu and pages navigation scope the two closest parents pages.

### Versioning

Your content may contain multiple versions of a documentation

**structure**

```
content
└── reference
    ├── _index.md
    ├── current
    ├── 2.0.0
    └── 1.0.0
```

If so, in reference `_index.md` set the parameter `versionning` to `true`.
Each version folder should cascade a `version` to their childs through their root `_index.md`.
Latest version must set `latest` to `true` and reflect the `current` folder

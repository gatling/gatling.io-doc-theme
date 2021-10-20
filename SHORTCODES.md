# Shortcodes usage and examples

## Table of Contents

* [Syntax](#syntax)
* [Alerts](#alerts)
* [Anchors](#anchors)
* [Icons](#icons)
* [Images](#images)
* [Including code from files](#including-code-from-files)
* [Printing variables](#printing-variables)
* [Embedding youtube videos](#embedding-youtube-videos)

## Syntax

Every inline shortcode needs to be opened by `{{<` and closed by `>}}`. If the shortcode has content it needs to be closed:

```markdown
{{< name-of-shortcode ... >}}
Multi line
content
{{< /name >}}
```

Shortcode can take one or more parameters:

```markdown
{{< name-of-shortcode one two three ... >}}
```

They can be surrounded by quotes if necessary:

```markdown
{{< name-of-shortcode one "two and more" three ... >}}
```

Parameter can be named:

```markdown
{{< name-of-shortcode key="value" key2="value2" ... >}}
```

## Alerts

```markdown
{{< alert tip >}}
If the value is a `[String]`, Gatling will try to parse it into a value of the expected type.
{{< /alert >}}
```

First parameter can be one of:

* danger
* info
* tip
* warning

## Anchors

```markdown
{{< anchor jsonPath >}}
```

Add an invisible link with `id="jsonPath"`.

It is NOT recommended to use it for titles as they are automatically anchored. If you want to rename or shorten the anchor of a title, you can do it this way:

```markdown
## Ultra ultra ultra ultra ultra long title {#short-anchor}
```

## Icons

```markdown
{{< icon check >}}
```

Every [free solid icons](https://fontawesome.com/v5.15/icons?d=gallery&p=2&s=solid&m=free) available from Font Awesome can be used. Just remember to remove the `fa-` prefix.

## Images

```markdown
{{< img src="global-variable.png" alt="Global variable" >}}
```

This one has named parameters `src` and `alt`. It scans the `images` folder and make multiple versions of the image inside a srcset, based on global parameters.

## Including code from files

This shortcode allows to include:

* Full content from a file
* Partial content from a file wrapped by a single or multiple tags (separated by commas)
* Wrap content in tabs if multiple languages are specified

Along that, it will:

* Reindent the content to the least amount of indentation
* Scan for the proper file(s) if no file name is provided
* Sync all the toggles by the language that was last clicked, defaults to Scala

Files needs to be present in the document hierarchy, inside a folder named `code`.

If no parameter is specified aside the file name or anchor, it defaults the language to Scala:

```markdown
{{< include-code "CheckSample.scala" >}}
```

You can specify one of more anchor to extract from the file, separated by commas:

```markdown
{{< include-code "CheckSample.scala#status-is-200,..." >}}
```

The file extension can be skipped:

```markdown
{{< include-code "CheckSample#status-is-200" >}}
```

The file can be skipped, in which case it will fetch the first file and consider the parameter as a anchor:

```markdown
{{< include-code "status-is-200" >}}
```

Language(s) can be speficied after the anchor name:

```markdown
{{< include-code "CheckSample#status-is-200" scala >}}
```

If more than one language is specified, it will wrap all the languages in a tab:

```markdown
{{< include-code "CheckSample#status-is-200" scala java kt >}}
```

It is NOT allowed to specify the extension with multiple languages:

```markdown
{{< include-code "CheckSample.scala#status-is-200" java kt >}}
```

This will print a warning, but will still work (for now).

Is is accompagnied by parameters that are set inside the `config/params.yml` file:

```yaml
includeCode:
  default: scala
  labels:
    java: Java
    kt: Kotlin
    scala: Scala
```

## Printing variables

```markdown
{{< var revnumber >}}
```

Substitution with a global variable.

Variables needs to be cascaded from the section root inside the front matter for it to work properly:

```yaml
---
cascade:
  variables:
    revnumber: 1.2.3
---
```

## Embedding youtube videos

```markdown
{{< youtube IHVYt8GvfM0 >}}
```

Superset of the original hugo shortcode that forces a css class and removes extra inner styles.

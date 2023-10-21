---
title: Include code
---

### Description

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
{{</* include-code "CheckSample.scala" */>}}
```

You can specify one of more anchor to extract from the file, separated by commas:

```markdown
{{</* include-code "CheckSample.scala#status-is-200,..." */>}}
```

The file extension can be skipped:

```markdown
{{</* include-code "CheckSample#status-is-200" */>}}
```

The file can be skipped, in which case it will fetch the first file and consider the parameter as a anchor:

```markdown
{{</* include-code "status-is-200" */>}}
```

Language(s) can be speficied after the anchor name:

```markdown
{{</* include-code "CheckSample#status-is-200" scala */>}}
```

If more than one language is specified, it will wrap all the languages in a tab:

```markdown
{{</* include-code "CheckSample#status-is-200" scala java kt */>}}
```

It is NOT allowed to specify the extension with multiple languages:

```markdown
{{</* include-code "CheckSample.scala#status-is-200" java kt */>}}
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
### Example

{{< include-code "CheckSample#status-is-200" scala java kt >}}

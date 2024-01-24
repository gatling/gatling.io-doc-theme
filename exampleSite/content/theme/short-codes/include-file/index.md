---
title: Include file
---

### Description

This shortcode allows to include multiple files, based on a label and a path.
Included files are markdownified, so you can use short codes in them.

```go-html-template
{{</* include-file >}}
key1: files/file1.md
key2: files/file2.md
{{< /include-file */>}}

```

### Example

{{< include-file >}}
key1: files/file1.md
key2: files/file2.md
{{< /include-file >}}

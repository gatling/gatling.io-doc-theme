---
title: Var
---

### Description

Substitution with a global variable, defined in `data/variables.toml`:

```toml
revnumber = "1.2.3"
```

```go-html-template
{{</* var revnumber */>}}
```

### Example

{{< var test >}}

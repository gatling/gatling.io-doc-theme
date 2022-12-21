---
title: Youtube
variables:
  test: my custom variable
---

### Description

Substitution with a global variable.

Variables needs to be cascaded from the section root inside the front matter for it to work properly:

```yaml
---
cascade:
  variables:
    revnumber: 1.2.3
---
```


```markdown
{{</* var revnumber */>}}
```

### Example

{{< var test >}}

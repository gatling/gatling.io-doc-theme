---
title: Badge
---

### Description

It's possible to uses badges using a closed form:

```
{{</* badge success */>}}New{{</* /badge */>}}
```

Or even a self-closed form:

```
{{</* badge success "New" /*/>}}
```

### Example 1 {{% badge success %}}closed{{% /badge %}} {#example-1}

For badges in title, use `%%` instead of `<>`:

```
### Example 1 {{%/* badge success */%}}closed{{%/* /badge */%}} {#example-1}
```

### Example 2 {{% badge success "self closed" %}}{{% /badge %}} {#example-2}

Or using self-closed form:

```
### Example 1 {{%/* badge success "self closed" /*/%}} {#example-2}
```

Note: you want to override the default anchor when using a badge, otherwise the header link will be "weird", e.g: #example-2-span-classbadge-badge-successself-closedspan 

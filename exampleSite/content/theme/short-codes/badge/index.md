---
title: Badge
---

## Description

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

{{< alert warning >}}
You want to override the default anchor when using a badge inside a title
If not, the header link will be "weird", e.g: #example-2-span-classbadge-badge-successself-closedspan
{{< /alert >}}

## Available badges

### Danger {{% badge danger "danger" /%}} {#danger}

In a title: &uparrow;

```
### Danger {{%/* badge danger "danger" /*/%}} {#danger}
```

In a paragraph: {{< badge danger "danger" />}}

```
In a paragraph: {{</* badge danger "danger" /*/>}}
```

### Info {{% badge info "info" /%}} {#info}

In a title: &uparrow;

```
### Info {{%/* badge info "info" /*/%}} {#info}
```

In a paragraph: {{< badge info "info" />}}

```
In a paragraph: {{</* badge info "info" /*/>}}
```

### Light {{% badge light "light" /%}} {#light}

In a title: &uparrow;

```
### Light {{%/* badge light "light" /*/%}} {#light}
```

In a paragraph: {{< badge light "light" />}}

```
In a paragraph: {{</* badge light "light" /*/>}}
```

### Secondary {{% badge secondary "secondary" /%}} {#secondary}

In a title: &uparrow;

```
### Light {{%/* badge secondary "secondary" /*/%}} {#secondary}
```

In a paragraph: {{< badge secondary "secondary" />}}

```
In a paragraph: {{</* badge secondary "secondary" /*/>}}
```

### Success {{% badge success "success" /%}} {#success}

In a title: &uparrow;

```
### Success {{%/* badge success "success" /*/%}} {#success}
```

In a paragraph: {{< badge success "success" />}}

```
In a paragraph: {{</* badge success "success" /*/>}}
```

### Warning {{% badge warning "warning" /%}} {#warning}

In a title: &uparrow;

```
### Warning {{%/* badge warning "warning" /*/%}} {#warning}
```

In a paragraph: {{< badge warning "warning" />}}

```
In a paragraph: {{</* badge warning "warning" /*/>}}
```

## Brand badges

### OSS {{% badge oss "OSS" /%}} {#oss}

In a title: &uparrow;

```
### OSS {{%/* badge oss "OSS" /*/%}} {#oss}
```

In a paragraph: {{< badge oss "OSS" />}}

```
In a paragraph: {{</* badge oss "OSS" /*/>}}
```

### Self-Hosted {{% badge self-hosted "Self-Hosted" /%}} {#self-hosted}

In a title: &uparrow;

```
### Self-Hosted {{%/* badge self-hosted "Self-Hosted" /*/%}} {#self-hosted}
```

In a paragraph: {{< badge self-hosted "Self-Hosted" />}}

```
In a paragraph: {{</* badge self-hosted "Self-Hosted" /*/>}}
```

### Cloud {{% badge cloud "Cloud" /%}} {#cloud}

In a title: &uparrow;

```
### Cloud {{%/* badge cloud "Cloud" /*/%}} {#cloud}
```

In a paragraph: {{< badge cloud "Cloud" />}}

```
In a paragraph: {{</* badge cloud "Cloud" /*/>}}
```

### Enterprise {{% badge enterprise "Enterprise" /%}} {#enterprise}

In a title: &uparrow;

```
### Enterprise {{%/* badge enterprise "Enterprise" /*/%}} {#enterprise}
```

In a paragraph: {{< badge enterprise "Enterprise" />}}

```
In a paragraph: {{</* badge enterprise "Enterprise" /*/>}}
```

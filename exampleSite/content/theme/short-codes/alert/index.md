---
title: Alert
---

### Description

If the value is a `[String]`, Gatling will try to parse it into a value of the expected type.
Expected types:
- tip
- info
- warning
- danger

```go-html-template
{{</* alert tip */>}}
If the value is a `[String]`, Gatling will try to parse it into a value of the expected type.
{{</* /alert */>}}
```

### Example

{{< alert tip >}}
Tip
{{< /alert >}}

{{< alert info >}}
Info
{{< /alert >}}

{{< alert warning >}}
Warning
{{< /alert >}}

{{< alert danger >}}
Danger
{{< /alert >}}




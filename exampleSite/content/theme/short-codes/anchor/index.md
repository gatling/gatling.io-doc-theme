---
title: Anchor
---

### Description

Add an invisible link with `id="jsonPath"`.

It is NOT recommended to use it for titles as they are automatically anchored. If you want to rename or shorten the anchor of a title, you can do it this way:

```go-html-template
{{</* anchor test */>}}
```

Then referenced with:

```go-html-template
{{</* ref path/to/file#test */>}}
```

### Example

[logs]({{< ref "./anchor#test" >}})

Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Etiam a lacus dolor. Pellentesque luctus, odio quis commodo euismod, odio est euismod ex, eu dictum diam sem pharetra lacus.

Nam viverra blandit lectus, eget sollicitudin nunc fermentum et.

Mauris quis lorem ac odio facilisis convallis. Pellentesque ligula magna, condimentum ut ornare id,
placerat ut eros. Donec sed consectetur sem, at placerat mi. Nullam purus lectus, placerat quis placerat in,

tempor vitae massa. Pellentesque non justo eu sem tempor ullamcorper in in diam. Donec et congue dui.
Aliquam ultrices ex sodales vestibulum vulputate. Vivamus elementum diam leo, in lobortis ex lobortis in.

Phasellus id blandit lacus, et varius lacus.

{{< anchor test >}}

Cras mollis mi eget sem gravida suscipit. Praesent dui felis, cursus vel erat sit amet, sodales iaculis nisl.
In quis semper neque. Suspendisse dui tortor, feugiat nec urna vel, aliquam gravida neque.

Nam nec aliquam ex, vitae pulvinar ligula. Maecenas lobortis tincidunt ullamcorper.
Donec ornare, eros a finibus ornare, purus ligula dictum dui, in mollis est urna vel urna.

Integer sodales, odio ac efficitur pellentesque, tellus orci fringilla eros, sit amet fringilla mauris mi vitae erat.


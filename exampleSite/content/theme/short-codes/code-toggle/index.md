---
title: Code Toggle
---

### Description

Allow to switch between multiple values, based on a key used as label.

```
{{</* code-toggle console >}}
key1: value1
key2: value3
key3: value3
{{< /code-toggle */>}}

```


### Example


{{< code-toggle console >}}
gradle: gradle gatlingEnterpriseStart -Dgatling.enterprise.apiToken=<CREATED_API_TOKEN>
maven: mvn gatling:enterpriseStart -Dgatling.enterprise.apiToken=<CREATED_API_TOKEN>
sbt: sbt "Gatling / enterpriseStart" -Dgatling.enterprise.apiToken=<CREATED_API_TOKEN>
{{< /code-toggle >}}



---
title: "Part 1 1"
date: 2021-04-23T05:19:27-04:00
---

PART-1 CONTENT

{{< code-toggle console >}}
gradle: gradle gatlingEnterpriseStart -Dgatling.enterprise.apiToken=<CREATED_API_TOKEN>
maven: mvn gatling:enterpriseStart -Dgatling.enterprise.apiToken=<CREATED_API_TOKEN>
sbt: sbt "Gatling / enterpriseStart" -Dgatling.enterprise.apiToken=<CREATED_API_TOKEN>
custom: I should not exist!
{{< /code-toggle >}}

{{< include-code "print-session-value" java kt scala >}}

{{< include-code "ComputerDatabaseSampleJava.java#print-session-value" java >}}

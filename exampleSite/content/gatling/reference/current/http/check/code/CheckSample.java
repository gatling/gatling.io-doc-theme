
/*
 * Copyright 2011-2021 GatlingCorp (https://gatling.io)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import io.gatling.javaapi.core.*;
import io.gatling.javaapi.http.*;

import java.time.Duration;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static io.gatling.javaapi.core.CoreDsl.*;
import static io.gatling.javaapi.http.HttpDsl.*;

class CheckSampleJava {

    private CheckSampleJava() {}

    static {
        //#status-is
        status().is(200);
        //#status-is

        //#status-in
        status().in(200, 201, 202);
        //#status-in

        //#status-is-200
        http("My Request").get("myUrl").check(status().is(200));
        //#status-is-200

        //#status-is-not-404-or-500
        http("My Request").get("myUrl").check(status().not(404), status().not(500));
        //#status-is-not-404-or-500
    }

    public static <T> void lol() {
        String pattern, headerName, expression;

        //#substring
        substring("foo"); // same as substring("foo").find.exists
        substring("foo").findAll().saveAs("indices"); // saves a Seq[Int]
        substring("foo").count().saveAs("counts"); // saves the number of occurrences of foo
        //#substring

        //#regex
        regex("<td class=\"number\">");
        regex("<td class=\"number\">ACC${account_id}</td>");
        regex("/private/bank/account/(ACC[0-9]*)/operations.html");
        //#regex

        //#xpath
        xpath("//input[@id='text1']/@value");
        xpath("//foo:input[@id='text1']/@value", Collections.singletonMap("foo", "http://foo.com"));
        //#xpath

        //#jsonPath
        jsonPath("$..foo.bar[2].baz");
        //#jsonPath

        String response =
            """
            //#json-response
            // JSON Response
            {
              "foo": 1,
              "bar" "baz"
            }
            //#json-response
            """;

        //#jmesPath
        jmesPath("foo.bar[2].baz");
        //#jmesPath

        //#css
        css("article.more a", "href");
        //#css

        jsonPath("$..foo.bar[2].baz").
            //#transform
            transform(string -> string + "foo");
            //#transform

        //#is
        status().is(200);
        //#is

        //#isNull
        jsonPath("$.foo").isNull();
        //#isNull

        //#not
        status().not(500);
        //#not

        //#notNull
        jsonPath("$.foo").notNull();
        //#notNull

        //#exists
        jsonPath("$..foo").exists();
        //#exists

        //#notExists
        jsonPath("$..foo").notExists();
        //#notExists

        //#in
        status().in(200, 304);
        //#in

        //#regex-count-is
        regex("https://(.*)").count().is(5);
        //#regex-count-is

        //#regex-findAll-is
        regex("https://(.*)/.*")
            .findAll()
            .is(List.of("www.google.com", "www.mysecuredsite.com"));
        //#regex-findAll-is

        //#regex-find-exists
        regex("aWord").find(1).exists();
        //#regex-find-exists

        //#regex-notExists
        regex("aWord").notExists();
        //#regex-notExists

        //#bodyBytes-is-RawFileBody
        bodyBytes().is(RawFileBody("expected_response.json"));
        //#bodyBytes-is-RawFileBody

        //#bodyString-isElFileBody
        bodyString().is(ElFileBody("expected_template.json"));
        //#bodyString-isElFileBody
    }
}

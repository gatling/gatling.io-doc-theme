
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

import io.gatling.javaapi.core.*

import java.time.Duration

import io.gatling.javaapi.core.CoreDsl.*
import io.gatling.javaapi.http.HttpDsl.*

class CheckSample {

  init {
    //#status-is
    val test = status().`is`(200)
    //#status-is

    //#status-in
    status().`in`((200..210).toList())
    //#status-in

    //#status-is-200
    http("My Request").get("myUrl").check(status().`is`(200))
    //#status-is-200

    //#status-is-not-404-or-500
    http("My Request").get("myUrl").check(status().not(404), status().not(500))
    //#status-is-not-404-or-500
  }
}

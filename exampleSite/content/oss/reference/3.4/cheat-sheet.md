---
title: "Cheat-Sheet"
lead: ""
date: 2021-04-20T18:30:56+02:00
lastmod: 2021-04-20T18:30:56+02:00
type: cheat-sheet
content:

  - title: Simulation configuration
    description: Tune your simulation
    sections:

      - title: Time
        functions:

          - keyword: pauses
            description: Allows to configure pauses. Can also be defined at the scenario level
            syntax:
              - signature: (disablePauses)
                description: Disable the pauses for the simulation
              - signature: (constantPauses)
                description: Default value. Durations are precisely those filled in the <i>pause(duration)</i> elements.
              - signature: (exponentialPauses)
                description: Pause durations are on average those filled in the <i>pause(duration)</i> elements and follow an exponential distribution.
              - signature: (customPauses(pauseDur))
                description: Pauses durations are computed by the provided <i>pauseDur</i>. In this case the filled duration is bypassed
              - signature: (uniformPauses(plusOrMinus))
                description: Pause durations are on average those filled in the <i>pause(duration)</i> elements and follow an uniform distribution.

          - keyword: maxDuration
            description: Set a duration limit on your simulation
            syntax:
              - signature: (maxDuration)
                description: The maximum duration of the simulation

      - title: Throttling
        functions:

          - keyword: throttle
            description: >
              Allows to reason in terms of request per second and not in terms of users.
              Can also be defined at the scenario level.
              Throttle can take one to many building blocks described below.
            syntax:
              - signature: (reachRps(target) in (time unit))
                description: Target a throughput with a ramp in a given <i>time</i>
              - signature: (jumpToRps(target))
                description: Jump immediately to a given targeted throughput
              - signature: (holdFor(duration))
                description: Hold the current throughput for a given duration
            example: |
              setUp(...)
                .throttle(
                  reachRps(100) in (10 seconds),
                  holdFor(10 minute)
                )

  - title: Feeder definition
    description: Inject data in your scenario
    sections:

      - title: Feeder options
        functions:

        - keyword: batch
          syntax:
          - description: Load data by chunks of 200 records instead of loading all the data in memory (local file based feeders only)
          - signature: (bufferSize)
            description: Load data by chunks of <i>bufferSize</i> records instead of loading all the data in memory (local file based feeders only)

        - keyword: unzip
          required: true
          description: Decompress feeder file that is compressed with zip or gzip

        - keyword: shard
          frontline: true
          description: Distribute data amongst nodes when running a cluster of injectors

        - keyword: readRecords
          description: Return the feeder content as a <code>Seq[Map[String, Any]]</code>

      - title: Feeder strategies
        functions:

          - keyword: queue
            description: This is the default strategy (you don't have to specify it). It takes the values in the feeder as in a queue. If the queue is not long enough, you'll get an error at execution.

          - keyword: random
            description: This strategy chooses values randomly in the feeder. In contrast to a <i>shuffle</i> strategy the same values can be chosen several times.

          - keyword: circular
            description: This strategy takes the values of the feeder in their order, and when it reaches the last, it returns to the first one.

          - keyword: shuffle
            description: This strategy shuffles the values in the feeder but then works like the <i>queue</i> strategy.

  - title: JMS
    description: Define the JMS requests sent in your scenario
    sections:

      - title: Start
        functions:

          - keyword: jms
            description: Declares an JMS request
            syntax:
              - signature: (requestName)
                description: Name of the request

      - title: Commons
        functions:

          - keyword: requestReply
            description: Sets the messaging implementation to request/reply

          - keyword: send
            description: Sets the messaging implementation to send

          - keyword: queue
            description: Defines a target destination
            syntax:
              - signature: "(name: Expression[String])"
                description: Where <i>name</i> is the name of the queue

          - keyword: destination
            description: Defines a target destination
            syntax:
              - signature: (destination)
                description: Where <i>destination</i> is an instance of JmsDestination

          - keyword: replyQueue
            description: Defines a reply destination
            syntax:
              - signature: "(name: Expression[String])"
                description: Where <i>name</i> is the name of the queue

          - keyword: replyDestination
            description: Defines a reply destination
            syntax:
              - signature: (destination)
                description: Where <i>destination</i> is an instance of JmsDestination

          - keyword: trackerQueue
            description: |
              On default gatling tracks the replies on the <code>replyQueue</code>.
              Optionally you can overwrite this destination with the parameter <code>trackerQueue</code>
            syntax:
            - signature: (destination)
              description: Where <i>destination</i> is an instance of JmsDestination

          - keyword: trackerDestination
            description: |
              On default gatling tracks the replies on the <code>replyDestination</code>.
              Optionally you can overwrite this destination with the parameter <code>trackerDestination</code>
            syntax:
              - signature: (destination)
                description: Where <i>destination</i> is an instance of JmsDestination

          - keyword: noJmsReplyTo
            description: Don't populate JMSReplyTo message field

          - keyword: selector
            description: Defines a JMS message selector
            syntax:
              - signature: (selector)
                description: Where <i>selector</i> is the selector

          - keyword: textMessage
            description: Sends a text message
            syntax:
              - signature: (textMessage)
                description: Where <i>textMessage</i> is a string

          - keyword: bytesMessage
            description: Sends a byte message
            syntax:
              - signature: (bytesMessage)
                description: Where <i>bytesMessage</i> is a byte array

          - keyword: mapMessage
            description: Sends a map message
            syntax:
              - signature: (mapMessage)
                description: Where <i>mapMessage</i> is a map

          - keyword: objectMessage
            description: Sends an object message
            syntax:
              - signature: (objectMessage)
                description: Where <i>objectMessage</i> is an object implementing JSerializable

          - keyword: property
            description: Sends additional property
            syntax:
              - signature: (key, value)
                description: Sets <i>value</i> as an object property <i>key</i>

          - keyword: jmsType
            description: Set message's JMS type
            syntax:
              - signature: (value)
                description: Sets <i>value</i> as a <a href="https://docs.oracle.com/javaee/6/api/javax/jms/Message.html#setJMSType(java.lang.String)">JMSType</a>

      - title: Checks
        functions:

          - keyword: simpleCheck
            description: Allows to check a message
            syntax:
              - signature: (function)
                description: Where <i>function</i> takes a Message and returns a Boolean

          - keyword: xpath
            description: Allows to check a TextMessage with XPath
            syntax:
              - signature: (expression)
                description: Where <i>expression</i> is an XPath expression

      - title: Protocol Configuration
        functions:

          - keyword: jms
            description: Entry point of your JMS configuration

        subsections:

          - title: Connecting
            functions:

              - keyword: connectionFactoryName
                required: true
                description: Set the name of the ConnectionFactory to use
                syntax:
                  - signature: (name)
                    description: where <em>name</em> is a string

              - keyword: url
                required: true
                description: Set the URL of the queue to connect to.
                syntax:
                  - signature: (url)
                    description: where <em>url</em> is a string

              - keyword: contextFactory
                required: true
                description: Set the name of the JNDI ContextFactory to use.
                syntax:
                  - signature: (contextFactory)
                    description: where <em>contextFactory</em> is a string

              - keyword: credentials
                description: Set the credentials used for the queues JNDI lookup
                syntax:
                  - signature: (username, password)
                    description: the username and password to use as credentials

              - keyword: disableAnonymousConnect
                description: Use credentials for opening connections too

              - keyword: listenerThreadCount
                description: Number of consumers that will listen to incoming messages on the tracker/reply queue
                syntax:
                  - signature: (listenerThreadCount)
                    contract: must be > 0
                    description: The number of consumers

              - keyword: replyTimeout
                syntax:
                - signature: (duration)
                  description: the reply timeout in millis

          - title: Delivery modes
            functions:

              - keyword: useNonPersistentDeliveryMode
                description: Use JMS' non-persistent delivery mode (active by default)

              - keyword: usePersistentDeliveryMode
                description: Use JMS' persistent delivery mode

          - title: Message matching
            functions:

              - keyword: matchByMessageId
                description: Match request and response using JMS's MessageID

              - keyword: matchByCorrelationId
                description: Match request and response using JMS's CorrelationID

              - keyword: messageMatcher
                description: Match request and response using a custom strategy
                syntax:
                  - signature: (messageMatcher)
                    description: an implementation of <em>JmsMessageMatcher</em>, specifying how the <em>requestId</em> and <em>responseId</em> are retrieved from the JMS <em>Message</em>

  - title: MQTT
    description: Define the MQTT requests sent in your scenario
    frontline: true
    sections:

    - title: Start
      functions:

      - keyword: mqtt
        description: Declares an MQTT request
        syntax:
        - signature: (requestName)
          description: Name of the request

    - title: Commons
      functions:

      - keyword: subscribe
        syntax:
        - signature: (topic)
          description: Subscribe to a topic

      - keyword: publish
        syntax:
        - signature: (topic).message(body)
          description: Publish a message with regular <code>Body</code> API to a <i>topic</i>

      - keyword: expect
        description: Set a non-blocking check
        syntax:
        - signature: (duration)
          description: Expect a matching reply message with <i>duration</i>
        - signature: (duration, topic)
          description: Expect a matching reply message with <i>duration</i> from <i>topic</i> topic
        - signature: (duration, topic).check(check)
          description: Validate received message against <i>check</i> using regulare <code>Check</code> API.

      - keyword: await
        description: Set a blocking check
        syntax:
        - signature: (duration)
          description: Expect a matching reply message with <i>duration</i>
        - signature: (duration, topic)
          description: Expect a matching reply message with <i>duration</i> from <i>topic</i> topic
        - signature: (duration, topic).check(check)
          description: Validate received message against <i>check</i> using regulare <code>Check</code> API.

      - keyword: waitForMessages
        syntax:
        - signature: .timeout(duration)
          description: Wait for all pending check to complete

    - title: Protocol Configuration
      functions:

      - keyword: mqtt
        description: Entry point of your MQTT configuration

      - keyword: mqttVersion_3_1
        description: Use protocol version 3.1

      - keyword: mqttVersion_3_1_1
        description: Use protocol version 3.1.1

      - keyword: broker
        syntax:
        - signature: (hostname, port)
          description: Use <i>hostname</i> and<i>port</i> for broker address

      - keyword: useTls
        syntax:
          - signature: (boolean)
            description: Enable TLS

      - keyword: clientId
        syntax:
          - signature: (id)
            description: Set <i>id</i> as MQTT clientId

      - keyword: cleanSession
        syntax:
          - signature: (boolean)
            description: Clean session when connecting

      - keyword: credentials
        syntax:
          - signature: (userName, password)
            description: Use (<i>userName</i>, <i>password</i>) credentials for connecting

      - keyword: keepAlive
        syntax:
          - signature: (duration)
            description: Set connection keep-alive as <i>duration</i> seconds

      - keyword: qosAtMostOnce
        description: Use at-most-once QoS

      - keyword: qosAtLeastOnce
        description: Use at-least-once QoS

      - keyword: qosExactlyOnce
        description: Use exactly-once QoS

      - keyword: retain
        syntax:
          - signature: (boolean)
            description: Enable or disable retain

      - keyword: lastWill
        syntax:
          - signature: (LastWilltopic, willMessage).qosAtLeastOnce.retain(boolean)
            description: Define last will

      - keyword: reconnectAttemptsMax
        syntax:
          - signature: (number)
            description: Try to reconnect <i>number</i> times max

      - keyword: reconnectDelay
        syntax:
          - signature: (delay)
            description: Wait <i>delay</i> millis before reconnecting

      - keyword: reconnectBackoffMultiplier
        syntax:
          - signature: (multiplier)
            description: Use <i>multiplier</i> to compure actual reconnect delay

      - keyword: resendDelay
        syntax:
          - signature: (delay)
            description: Wait <i>delay</i> millis before resending message

      - keyword: resendBackoffMultiplier
        syntax:
          - signature: (multiplier)
            description: Use <i>multiplier</i> to compure actual resend delay

      - keyword: timeoutCheckInterval
        syntax:
          - signature: (duration)
            description: Check every <i>duration</i> for timed out checks

      - keyword: correlateBy
        syntax:
          - signature: (check)
            description: Use <i>check</i> for extracting correlationId from sent and received messages
---

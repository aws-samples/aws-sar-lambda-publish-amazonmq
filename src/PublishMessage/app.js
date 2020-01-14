/*
  Copyright 2019 Amazon.com, Inc. or its affiliates. All Rights Reserved.
  Permission is hereby granted, free of charge, to any person obtaining a copy of this
  software and associated documentation files (the "Software"), to deal in the Software
  without restriction, including without limitation the rights to use, copy, modify,
  merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
  permit persons to whom the Software is furnished to do so.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
  INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
  PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
  HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
  OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const mqtt = require('mqtt')
const uuidv1 = require('uuid/v1')

let mqHost = `wss://${process.env.MQ_HOST}`

const options = {
  username: process.env.MQ_USERNAME,
  password: process.env.MQ_PASSWORD,
  clientId: 'lambda_' + uuidv1(),
  port: 61619
}

const topic = "some/topic"
let response

exports.lambdaHandler = (event, context, callback) => {

    let client = mqtt.connect( mqHost, options)

    // MQTT publish takes a buffer or string
    let message = JSON.stringify(event)

    response = {
      'statusCode': 200,
      'body':  `published on ${topic}`
    }

    client.on('connect', function() {
      client.publish(topic, message)
      client.end()

      callback(null, response)
    })
};

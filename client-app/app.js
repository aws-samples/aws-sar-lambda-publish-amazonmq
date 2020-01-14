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
const uuidv1 = require('uuid/v1');

// Get arguments from the command line
// node app.js "username" "password" "wss://endpoint:port" "some/topic"
const args = process.argv.slice(2)

let options = {
  username: args[0],
  password: args[1],
  clientId: 'mqttLambda_' + uuidv1()
}

let mqEndpoint = args[2]
let topic = args[3]

let client = mqtt.connect( mqEndpoint, options)

// Once connected subscribe to the topic
client.on('connect', function() {
  console.log("connected")
  client.subscribe(topic, function (err) {
    if(err) console.log(err)
  })
})

client.on('error', function (error) {
  console.log(error)
})

// Log messages
client.on('message', function (topic, message) {
  console.log(`message received on ${topic}: ${message.toString()}`)
})

# AWS Lambda publish to Amazon MQ

Deploy an Amazon MQ broker and an AWS Lambda function that can publish to it. This project also includes a sample Node.js client application that can connect to the Amazon MQ broker and receive messages published by the Lambda function.

```bash
.
├── README.MD                   <-- This instructions file
├── src
│  └── PublishMessage               <-- Source code for a lambda function
│       └── app.js                  <-- Lambda handler to publish messages to an MQTT endpoint on Amazon MQ
│       └── package.json            <-- NodeJS dependencies and scripts
├── client-app
│   └── app.js                  <-- Node.js app to subscribe to messages from an MQTT endpoint on Amazon MQ
│   └── package.json            <-- NodeJS dependencies and scripts
├── template.yaml               <-- SAM template
```

## Services Deployed

* A Lambda function for publishing messages to Amazon MQ over MQTT.
* An Amazon MQ SINGLE_INSTANCE broker.


## Requirements

* AWS CLI already configured with Administrator permission
* [NodeJS 8.10+ installed](https://nodejs.org/en/download/)

## Installation Instructions

1. [Create an AWS account](https://portal.aws.amazon.com/gp/aws/developer/registration/index.html) if you do not already have one and login.
1. Go to the app's page on the [Serverless Application Repository](https://serverlessrepo.aws.amazon.com/applications/) and click "Deploy"
1. Provide the required app parameters (see parameter details below) and click "Deploy"

## Parameter Details

**Before deploying, create Admin and Client usernames and passwords in Secrets manager. This template will look for /app/*value* by default.**

* AdminUsername: (Required) A username for AmazonMQ console access.
* AdminPassword: (Required) A password for AmazonMQ console access. 12 characters and at least 4 unique characters.
* ClientUsername: (Required) A username for a client.
* ClientPassword: (Required) A password for a client. 12 characters and at least 4 unique characters.

## Using this Application

To run the Node.js client-app run the following commands in the client-app directory in this repository. Replacing the arguments with credentials from your Amazon MQ broker.

```bash
npm install
node app.js "username" "password" "wss://endpoint:port" "some/topic"
```

Testing the Lambda function:

* Navigate to the [AWS Lambda console](https://console.aws.amazon.com/lambda) and choose the newly created PublishMessage function.
* Create a test event.
* Run a test invocation.
* Messages published will appear in the console of the Node.js client-app.

==============================================

## License

This library is licensed under the MIT-0 License. See the LICENSE file.

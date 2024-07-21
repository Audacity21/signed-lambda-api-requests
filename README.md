# Signed Lambda API Requests

## Description

This project aims to provide a secure way to authenticate and authorize API requests made to AWS Lambda functions. By implementing a signing mechanism, it ensures that only authorized clients can access the Lambda functions.

## Features

- Request signing using HMAC-SHA256 algorithm
- Integration with AWS Lambda and API Gateway
- Support for multiple programming languages

## Installation

1. Fork and clone the repository: `git clone https://github.com/your-username/signed-lambda-api-requests.git`
2. Install the required dependencies: `npm install`
3. Create a .env file and configure the AWS credentials in it.
4. Run the project: `node index.js`

## Usage

1. Generate a signed request using the provided SDK or by implementing the signing logic yourself.
2. Make an HTTP request to the API Gateway endpoint with the signed request.
3. The API Gateway will validate the signature and forward the request to the corresponding Lambda function.
4. The Lambda function can verify the request signature and process the request accordingly.

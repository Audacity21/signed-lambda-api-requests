var aws4 = require("aws4");
var axios = require("axios");

require("dotenv").config();

const accessKey = process.env.AWS_ACCESS_KEY_ID;
const secretKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_REGION;
const service = "lambda";
const url = process.env.URL; // your endpoint URL
const method = "POST"; // or 'POST', 'PUT', etc.

var payload = {
  users_list: [
    {
      site: "codeforces",
      username: "el_2000031281",
    },
  ],
};

var postData = JSON.stringify(payload);

if (!url) {
  console.error("URL is not defined. Please set the URL to your endpoint.");
  process.exit(1); // Exit if the URL is not defined
}

if (!accessKey || !secretKey) {
  console.error(
    "AWS credentials are not defined. Please set both accessKey and secretKey."
  );
  process.exit(1); // Exit if the credentials are not defined
}

var options = {
  method: "POST",
  host: url, // 'hostname' should be 'host' for aws4
  path: "/",
  headers: {
    "Content-Type": "application/json",
  },
  service: service,
  region: region,
  body: postData, // body should be the stringified payload
  maxRedirects: 20,
};

const signedRequest = aws4.sign(options, {
  secretAccessKey: secretKey,
  accessKeyId: accessKey,
});

// signedRequest object needs some adjustments for axios
const axiosConfig = {
  method: signedRequest.method,
  url: `https://${signedRequest.host}${signedRequest.path}`,
  headers: signedRequest.headers,
  data: postData, // axios uses 'data' for the request body
  maxRedirects: signedRequest.maxRedirects,
};

axios(axiosConfig)
  .then((response) => {
    console.log(response.data);
  })
  .catch((error) => {
    console.error(error.response.data);
  });

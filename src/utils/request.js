const https = require("https");
const url =
  "https://api.weatherbit.io/v2.0/current?lat=" +
  111 +
  "&lon=" +
  37 +
  "&key=" +
  "734ecaccbb0940f58626e444d563bc0a";
const request = https.request(url, (response) => {
  let data = "";
  response.on("data", (chunk) => {
    data = data + chunk.toString();
    console.log(data);
  });

  response.on("end", () => {
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on("error", (error) => console.log(error));

request.end();

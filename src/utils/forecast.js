const request = require("request");
const apiKey = "734ecaccbb0940f58626e444d563bc0a";
const forecast = (lat, lon, callback) => {
  const url =
    "https://api.weatherbit.io/v2.0/current?lat=" +
    lat +
    "&lon=" +
    lon +
    "&key=" +
    apiKey;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Network error");
    } else {
      callback(
        undefined,
        body.data[0].weather.description +
          ". The temperature is " +
          body.data[0].temp +
          ". There is a " +
          body.data[0].precip +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;

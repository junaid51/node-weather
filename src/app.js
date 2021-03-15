const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const public = path.join(__dirname, "../public");
const views = path.join(__dirname, "../templates/views");
const partials = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", views);
hbs.registerPartials(partials);

app.use(express.static(public));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Junaid Khan",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Junaid Khan",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Junaid Khan",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      error: "Address not provided",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) return res.send({ error });
      forecast(latitude, longitude, (error, forecastData) => {
        if (error) return res.send({ error });
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Junaid Khan",
    error: "Help Page not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Junaid Khan",
    error: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port 3000");
});

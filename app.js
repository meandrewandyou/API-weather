const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res) {
res.sendFile(__dirname + "/index.html");
})

app.post("/", function(req, res){

  const query = req.body.cityName;
  const apiKey = "fab66b87fc6e3425887d33ec5712ffbf";
  const units = "metric";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey;

  https.get(url, function(response) {
    response.on("data", function(data) {
      const weatherData = JSON.parse(data);
      const weatherDescription = weatherData.weather[0].description;
      const temperture = weatherData.main.temp;
      const icon = weatherData.weather[0].icon
      const iconUrl = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
      console.log(weatherDescription);
      res.write("<p>Current temperature is " + temperture + " degrees.</p>")
      res.write("<h1>The weather in " + query + " is " + weatherDescription + " now. </h1>")
      res.write("<img src ="  + iconUrl + ">")
      res.send()
    })
  })
})








app.listen(3000, function() {
  console.log("Server running on port 3000")
})

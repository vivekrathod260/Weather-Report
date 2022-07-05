const express = require("express");
const app = express();

const https = require("https");

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended : true}));

app.get("/", function (req,res){
    res.sendFile(__dirname + "/weatherReportHomePage.html");
});


app.post("/",function(req,res){

    var cityName = req.body.cityName;
    var stateCode = req.body.stateCode;
    var countryCode = req.body.countryCode;

    var url = "https://api.openweathermap.org/data/2.5/weather?q="+ cityName + ","+ stateCode +","+ countryCode +"&appid=3d0fcc1e5e413ae720602aa58432983e&units=metric";

    https.get(url,function(responce){
        responce.on("data",function (data){
            var parsedJsonData = JSON.parse(data);
            var temp = parsedJsonData.main.temp;
            var weatherDescription = parsedJsonData.weather[0].description;
            var iconCode = parsedJsonData.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/wn/"+ iconCode +"@2x.png";
            res.send("<style>body{background-color:D0C9C0; text-align:center;}</style><h3 style='font-family:arial;'>Todays weather at "+cityName+" is '"+ weatherDescription + "' and <em>" + temp + "</em> degree celsious </h3><img src='"+ iconURL +"' alt='weather-icon'>");

        })
    });

});



app.listen(process.env.PORT || 3000,function (){
    console.log("server is started at port 3000 !!");
});


// My API Key 3d0fcc1e5e413ae720602aa58432983e

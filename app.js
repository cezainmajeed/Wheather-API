const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();

app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="1ba8a15d14896c94f44a2aa2709146d0";
  const unit="metric";
    var url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+unit;
    https.get(url,function(response){
      console.log(response.statusCode);
      response.on("data",function(data){
        const wheatherData=JSON.parse(data);
        const temp=wheatherData.main.temp;
        const desc=wheatherData.weather[0].description;
        const icon=wheatherData.weather[0].icon;
        const imgurl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
        res.write("<h1>The wheather is currently " + desc + "</h1>");
        res.write("<h1>The temperature in "+query+" is " +temp+" degree celsius.</h1>");
        res.write("<img src="+imgurl+">");
        res.send();
      });
    });
});





app.listen(3000,function(){
  console.log("Server in running on port 3000.");
});

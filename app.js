// jshint esversion:6
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const request = require("request");
const https = require("https");

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended:true}));


app.get("/" , function(req , res)
{

  res.sendFile(__dirname + "/signup.html");
});


app.post("/" , function(req , res)
{
  var firstname = req.body.fname;
  var secondname = req.body.sname;
  var email = req.body.email;


  var data = {
    members:
    [
      {
        email_address:email,
        status:"subscribed",
        merge_fields:{
          FNAME: firstname,
          LNAME: secondname
        }
      }
    ]
  };

  const url = "https://us2.api.mailchimp.com/3.0/lists/bf47affa24";
  const options = {
    method :"POST",
    auth:"Gaurav876:7d7dc1b3bf29330d67dc40e1e804bf4a-us2"
  };

  var jsondata = JSON.stringify(data);


  const request = https.request(url , options , function(res1){
  if(res1.statusCode ===200)
  {
    res.sendFile(__dirname + "/success.html");
  }
  else{
    res.send(__dirname + "/failure.html");
  }

    res1.on("data" , function(data){
      console.log(JSON.parse(data));
    });

  });
  request.write(jsondata);
  request.end();

  });








app.listen(process.env.PORT || 3000 , function()
{
  console.log("Server is running on the port 3000");
});

// api key =   7d7dc1b3bf29330d67dc40e1e804bf4a-us2

// audience id = bf47affa24

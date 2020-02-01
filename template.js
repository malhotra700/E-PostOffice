
       //NOW NODE JS SETUPS.........
       //THE LIBRARIES TO BE INCLUDED........
       const express=require("express");//express server .....
       const bodyparser=require("body-parser");
       const app=express();
       //var datime=require("node-datetime");
       const mongoose=require("mongoose");
       const path=require("path");
       const cors=require("cors");
       const nodemailer=require("nodemailer");
       //var DateOnly = require('mongoose-dateonly')(mongoose);
       const comment_route=require('./routes/comment');
       app.use(express.static("public"));
       app.use(bodyparser.json());
       app.use('/comment',comment_route);
       app.use(cors());
       app.use(express.static('public'));
       app.use('/images', express.static(__dirname + '/Images'));
    
       //CONNECTION TO MONGO DATABASE.......
       mongoose.connect("mongodb://localhost:27017/commentsDB",{ useNewUrlParser:true});
           //mongoose.set('debug', true);

           //A SAMPLE HTML FORM IS AS GIVEN BELOW WHAT EVER YOU TYPE IN ACTION BECOMES YOUR URL TO FETCH AT THE ROOT IN THE BACKEND JUST CONSIDER ACTION
           //AND GIVE EVERY ELEMENT A NAME AND WE FETCH IT WITH req.body.[name] parameters............
           //HTML FORM FOR EXAMPLE.....
           
           
           /*<form action="/order" method="post">
           
           //these  above lines are important....
           
                       <fieldset style = "width: 700px; margin:  0px auto;padding:20px">
                           <legend style="margin: 0 auto;color:crimson"> PHILATELY </legend>Select Stamp 
                           <select id="id_select2_example" name="stamp_type" style="width: 600px; margin:20px 20px 20px 20px;">
                               <option data-img_src="2948.jpg">2948 : Customized Spl Cvr Shri Ramji Baba (Rs: 50.00)</option>
                               <option data-img_src="2947.jpg">2947 : Customized Spl Cvr Deen Dayal Sparsh Yojna (Rs: 50.00)</option>
                               <option data-img_src="2944.jpg">2944 : Customized Spl Cvr Indian Ocaen Naval Symposium (Rs: 50.00)</option>
                               <option data-img_src="2941.jpg">2941 : Customized Spl Cvr Karunagappally Taluk Jama Ath U (Rs: 50.00)</option>
                                       <option data-img_src="2939.png">2939 : Customized Spl Cvr CHANDRAYAAN 2 (Rs: 200.00)</option>
                               <option data-img_src="2938.jpg">2938 : Customized Spl Cvr Utkal Divas (Rs: 50.00)</option>
                                       <option data-img_src="2937.jpg">2937 : Customized Spl Cvr Rama Devi Womens University (Rs :50.00)</option>
                           </select><br><br>
                               Enter Quantity <input type="number" name="quantity"><br><br>
                               Enter Address <textarea rows="4" cols="50" name="address"></textarea><br><br>
                               <input type="submit" value="Place Order" style="margin:auto;display:block;background-color:crimson;padding:20px;color:white;">
                           </fieldset>
           
                   </form>*/
                  //COOL NOW WE WILL RECEIVE DATA AT BACKEND OF NODE JS HOW just see this we sent the html file which contained our form with the requeted url first.


  app.get("/order",function(req,res){
  res.sendFile(__dirname+"/order.html");
  //where order  is a sample html file.........
  //now when someone submits the form we get the url /order in post method at backend...how 

  //THIS IS OUR DEFINITION OF post method for /order url
  
  //CREATING DATABASE MODEL and SCHEMA THIS IS REQUIRED FOR DATABASE TO UNDERSTAND WHICH DATABSE YOU ARE ENTERING DATA TO.
    const order_schema=new mongoose.Schema({
    stamp_type:String,
    quantity:Number,
    address:String
    });
    const order_database=mongoose.model("order",order_schema);


  app.post("/order",function(req,res){
    var stamp_type=req.body.stamp_type;
    var quantity=req.body.quantity;
    var address=req.body.address;
    var ord=new order_database({
     stamp_type:stamp_type,
     quantity:quantity,
     address:address
    });
    order_database.insertMany([ord],function(err){
    if(err)
    console.log(err);
    else 
    console.log("ORDER PLACED SUCCESSFULLY......"+ord);
    });
    res.redirect("/");//THIS IS OUT ROOT OR HOME OF PROJECT AFTER CLICKING ON SUBMIT WE WILL ENTER DIRECTLY TO OUR HOME PAGE REMEMBER HOME PAGE IS AT "/" ROUTE.
    });
});



//SET UP NODE JS ,MONGODB, NPM ,MONGO SHELL COMMANDS COMPLETELY IN YOUR OPERATING SYSTEM....THIS IS MANDATORY
//INSTALL PACKAGES INVOLVED LIKE 
//npm install express
//npm install body-parser
//npm install mongoose
//npm install cors
//npm install path
//npm install nodemailer 
//and finally in the directory of your project open terminal and run 
//node app.js ifapp is your node js backend file..
//open browser and enter localhost:3000/
//for home page 
//below is the code for browser to tell on which port we are opening the html file
//port is 3000 and console is our terminal console this was all what I can deliver in short about node and mongo and how to use them.......
app.listen(3000,function()
{
  console.log("Server started on port 3000");
});

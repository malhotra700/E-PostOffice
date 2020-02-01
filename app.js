const express=require("express");
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
var names=[" "];
var comments=[" "];
var dates=[" "];
var i=0;
mongoose.connect("mongodb://localhost:27017/commentsDB",{ useNewUrlParser:true});
//mongoose.set('debug', true);
const comments_schema=new mongoose.Schema({
  comment:String,
  name:String,
  email:String,
   date: {type: Date, 'default': Date.now, index: true},
   url:String,
   position:Number,
   likes:{type:Number,'default':0}
});
const counter_schema=new mongoose.Schema({
  counter:{type: Number,'default':0}
});
const comment_database=mongoose.model("comment",comments_schema);
const counter_database=mongoose.model("counter",counter_schema);
var con=0;
counter_database.find(function(err,couns){
  if(err)
  console.log(err);
  else
  {
    couns.forEach(function(counte)
    {
      con=counte.counter;
    });
  }
});
console.log(con+2);
var likes=[" "];
var like=[" "];
app.use(bodyparser.urlencoded({extended:true}));
comment_database.find(function(err,comet)
{
  if(err)
  console.log(err);
  else
  {
    comet.forEach(function(co){
      var place =co.position;
      names[place]=co.name;
      //console.log(names[i]);
      comments[place]=co.comment;
      //console.log(comments[i]);
      dates[place]=co.date;
      //console.log(dates[i]);
      likes[place]=co.id;
    //  console.log(likes[place]);
      like[place]=co.likes;
      //console.log(like[place]);
      i++;
      //console.log(i);
    });
  }
});
console.log(i);
app.get("/",function(req,res){
  res.sendFile(__dirname+"/epost.html");
});
app.get("/eposting",function(req,res){
  res.sendFile(__dirname+"/eposting.html");
});
app.get("/order",function(req,res){
  res.sendFile(__dirname+"/order.html");
});
app.get("/BulkOrder",function(req,res){
  res.sendFile(__dirname+"/BulkOrder.html");
});
app.get("/track",function(req,res){
  res.sendFile(__dirname+"/track.html");
});
app.get("/contact",function(req,res){
  res.sendFile(__dirname+"/contact.html");
});
app.get("/about",function(req,res){
  res.sendFile(__dirname+"/about.html");
});
app.set("view engine","ejs");
for(let j=0;j<i;j++)
{
  console.log(comments[j]+" "+names[j]+" "+dates[j]+"\n");
}

app.get("/cb",function(req,res){
  //res.sendFile(__dirname+"/cb2.html");
  res.render("show_comments",{names:names,date:dates,comments:comments,nam:"NEW COMMENTER NAME",comment:"NEW COMMENT WAITING FOR YOU",likes:likes,like:like});
});
var flag=0;
app.post("/comments",function(req,res)
{
  var comment=req.body.comment;
  var name=req.body.dname;
  var email=req.body.demail;
  var url=req.body.url;
  flag=1;
  //var dt=require();
  //var formated=dt.format("Y-m-d H:M:S");
//  console.log(comment+"\n"+name+email+url);
var new_counter=con+1;
var comm =new comment_database({
  comment:comment,
  name:name,
  email:email,
  url:url,
  position:new_counter
});
comment_database.insertMany([comm],function(err){
  if(err)
  console.log(err);
  else
  console.log("COMMENT INSERTED IN MONGODB COMMENTS // DEBUG:");
});
if(flag==1)
{
  ++con;
  counter_database.updateOne({_id:"5d0f1baf9e980916b082e3c2"},{counter:con},function(err){
    if(err)
    console.log(err);
    else
    {
      console.log(con+"INCREMENTED THE DATA");
    }
  });
}
res.render("show_comments",{names:names,date:dates,comments:comments,nam:name,comment:comment,likes:likes,like:like});
});
     app.post('/posts/:id/act', (req, res, next) =>{
       var n=req.params.id;
       console.log(n);
       comment_database.findOne({_id:n},function(err,coms){
         if(err)
         {
           console.log(err);
         }
         else
         {
         console.log("TRUE");
         var nl=coms.likes;
         nl+=1;
         comment_database.updateOne({_id:n},{likes:nl},function(err){
           if(err)
           console.log(err);
           else
           {
             console.log("likes_incremented by 1");
           }
         });
         console.log(nl);
       }
       });
     });
     app.post("/post",function(req,res){
     var content=req.body.content;
     var u_email=req.body.email;
     var add=req.body.Sender_add;
     var site=req.body.office;
     //var email_string="HELLO YOU ARE SIGNED UP WITH US NOW";
     process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

     let transporter = nodemailer.createTransport({
    service:"Gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "", // generated ethereal user
      pass: "" // generated ethereal password
    },tls:{
      rejectUnauthorised:false
    },
    debug:true
  });

  // setup email data with unicode symbols
var link="http://"+req.get('host')+"/verify?id="+u_email;
  let mailOptions = {
    from: '"nodemailer👻" <monis.satidasani1@gmail.com>', // sender address
    to: u_email, // list of receivers
    subject: "no_reply just verify your account to be our member", // Subject line
    text: content,
    html: "<b >"+add+"HAVE SENT YOU A POST from "+site+"</b>" // html body
  };

  // send mail with defined transport object
transporter.sendMail(mailOptions,function(err,info){
  if(err)
  console.log(err);
  else {
    console.log("SUCCESS IN SENIDNG THE MAIL FROM NODE nodemailer");
  }
   });
   res.redirect("/");
     });


     const order_schema=new mongoose.Schema({
     stamp_type:String,
     quantity:Number,
     address:String
     });
     const order_database=mongoose.model("order",order_schema);
     const bulkorder_schema=new mongoose.Schema({
     label1:Number,
     label2:Number,
     label3:Number,
     label4:Number,
     label5:Number,
     label6:Number,
     label7:Number
     });
     const bulkorder_database=new mongoose.model("bulkorder",bulkorder_schema);
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
    res.redirect("/");
    });

    app.post("/bulkorder",function(req,res){
      var label1=req.body.label1;
      var label2=req.body.label2;
      var label3=req.body.label3;
      var label4=req.body.label4;
      var label5=req.body.label5;
      var label6=req.body.label6;
      var label7=req.body.label7;
      console.log(label1+" "+label2+" "+label3+" "+label4+" "+label5+" "+label6+" "+label7);
      var bulkord=new bulkorder_database({
       label1:label1,
       label2:label2,
       label3:label3,
       label4:label4,
       label5:label5,
       label6:label6,
       label7:label7
      });
      bulkorder_database.insertMany([bulkord],function(err){
      if(err)
      console.log(err);
      else 
      {
        console.log("BULK ORDER PLACED SUCCESSFULLY.........");
      }
      });
      res.redirect("/");
      });
app.listen(3000,function()
{
  console.log("Server started on port 3000");
});

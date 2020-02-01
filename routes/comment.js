const express=require("express");
const router=express.Router();
const Pusher=require("pusher");
var pusher = new Pusher({
appId: '816127',
key: 'ae3bea68cc6d98d90ada',
secret: '5736f1efc2a7fb8d3ef1',
cluster: 'ap2',
encrypted: true
});
router.get('/',function(req,res){
});
router.post('/',function(req,res){
  var new_like;

  pusher.trigger('my-channel', 'my-event', {
  //new_like:comment_id
});
console.log(new_like);
return res.json({ success: true, message: 'Thank you for voting' });
});
module.exports=router;

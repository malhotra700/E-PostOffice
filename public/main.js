//Pusher.logToConsole = true;
var pusher = new Pusher('ae3bea68cc6d98d90ada',{
  cluster: 'ap2',
  forceTLS: true
});

function get_button_value(clicked_like)
{
  alert(clicked_like);
  //console.log(clicked_like);
  var x=document.getElementById(clicked_like).value;
  var y=parseInt(x);
  console.log(x);
  y++;
  z=y;
  //console.log(y);
  console.log(z);
  document.getElementById(clicked_like).innerHTML=z;
  var data={comment_id:clicked_like};
  //console.log(JSON.stringify(data));
  var postId=clicked_like;
  axios.post('/posts/' + postId + '/act', { action: "like" });
  fetch('http://localhost:3000/comment',{
    method:'post',
    body:JSON.stringify(data),
    headers:new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.log(err));
  var channel = pusher.subscribe('my-channel');
  channel.bind('my-event', function(data) {
    console.log(data);
    alert(JSON.stringify(data));
    console.log(JSON.stringify(data));
  });
}

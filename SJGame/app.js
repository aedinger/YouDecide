var express = require('express'); //make express available
var app = express(); //invoke express
var server = require('http').Server( app ) // start the express server instance
var io = require('socket.io')(server) // use socket.io for real time connections aka. wesockets

//serve out any static files in our public HTML folder
app.use(express.static('public'))

var deathTotal = 0;
var lifeTotal = 0;
var count = 31;
var voters = 0;


var masterTime = setInterval(function(){
  count--
  console.log("count", count);

  if(lifeTotal > deathTotal && count ==4){
    io.emit('survived')
  }

  if(deathTotal > lifeTotal && count == 4){
    io.emit('executed')
  }

  if(count <= 0){
  count = 31;
  voters = 0;
  lifeTotal = 0;
  deathTotal = 0;
}

  io.emit('masterTimeClock', count)
},1000)


//do something when someone connects to our page.
io.on('connection', function(socket){
  console.log(socket.id); // log out the unique ID of each person who connects
  voters++
  console.log("voters:",voters);


  socket.on('death',function(incomingDeathData){
    // console.log("death",incomingDeathData.deathToSend);
    deathTotal++
    console.log("Death Votes:",deathTotal);
  })


socket.on('life',function(incomingLifeData){
  // console.log("death",incomingDeathData.deathToSend);
  lifeTotal++
  console.log("Life Votes:" ,lifeTotal);
  })

})

//makes the app listen for requests on port 3000
server.listen(3000, function(){
  console.log("app listening on port 3000!")
})

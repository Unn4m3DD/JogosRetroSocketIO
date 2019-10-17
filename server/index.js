var Snake = require("./Snake");
var express = require('express');
var app = express()
var server = require('http').Server(app);
var io = require('socket.io')(server);
var cors = require('cors');
let c_id = 0;
var currentPlayers = [
]
server.listen(8000);
app.use(cors());
app.get('/availablePlayers', function (req, res) {
  res.json(avPlayers())
});
function avPlayers() {
  let avPlayer = []
  for (let player of currentPlayers) avPlayer.push({ id: player.id, name: player.name })
  return avPlayer
}
io.on('connection', function (socket) {
  const match_id = c_id
  socket.on("startGame", (msg) => {
    for (let i = currentPlayers.length - 1; i >= 0; i--) {
      if (currentPlayers[i].socket_id === socket.id) {
        //clearInterval(currentPlayers[i].myUpdate)
        currentPlayers = currentPlayers.splice(i, 1)
      }
    }

    let snake = new Snake(match_id, msg.width, msg.height)

    const myUpdate = setInterval(() => {
      socket.emit("update-1", { meta: { width: snake.width, height: snake.height }, board: snake.render() })
    }, 100)
    currentPlayers.push({
      id: match_id,
      name: msg.name,
      board: snake,
      socket_id: socket.id,
      myUpdate
    })
    rerunLogic(snake, msg.delay ? msg.delay : 500)
    socket.on("up", () => { snake.changeDir(snake.Directions.Up) })
    socket.on("down", () => { snake.changeDir(snake.Directions.Down) })
    socket.on("right", () => { snake.changeDir(snake.Directions.Right) })
    socket.on("left", () => { snake.changeDir(snake.Directions.Left) })
    socket.on('disconnect', () => {
      for (let i = 0; i < currentPlayers.length; i++) {
        if (currentPlayers[i].id === match_id) {
          clearInterval(currentPlayers[i].myUpdate)
          currentPlayers.splice(i, 1)
        }
      }
      io.emit("playerUpdate", avPlayers())
    });
    c_id++;
    io.emit("playerUpdate", avPlayers())
  })

});

function rerunLogic(snake, delay) {
  if (snake.logic() !== "Lost")
    setTimeout(() => { rerunLogic(snake, delay) }, delay)
}
setInterval(broadCasts, 100)
function broadCasts() {
  for (let i of currentPlayers) {
    io.emit(`update${i.id}`, { meta: { width: i.board.width, height: i.board.height }, board: i.board.render() })
  }
}

app.use('/', express.static(__dirname + './../client/build'))
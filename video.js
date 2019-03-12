const http = require("http");
const drone = require("dronestream");

const server = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/public/video.html").pipe(res);
});

drone.listen(server);
server.listen(4000);

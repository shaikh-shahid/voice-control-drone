const express = require('express');
const bodyparser = require('body-parser');
var arDrone = require('ar-drone');
const router = express.Router();
const app = express();
const commands = ['takeoff', 'land','up','down','goleft','goright','turn','goforward','gobackward','stop'];

var drone  = arDrone.createClient();
// disable emergency
drone.disableEmergency();
// express
app.use(bodyparser.json());
app.use(express.static(__dirname + '/public'));

router.get('/',(req,res) => {
    res.sendFile('index.html');
});

router.post('/command',(req,res) => {
    console.log('command recieved ', req.body);
    console.log('existing commands', commands);
    let command = req.body.command.replace(/ /g,'');
    if(commands.indexOf(command) !== -1) {
        switch(command.toUpperCase()) {
            case "TAKEOFF": 
                console.log('taking off the drone');
                drone.takeoff();
            break;
            case "LAND":
                console.log('landing the drone');
                drone.land();
            break;
            case "UP":
                console.log('taking the drone up half meter');
                drone.up(0.2);
                setTimeout(() => {
                    drone.stop();
                    clearTimeout();
                },2000);
            break;
            case "DOWN":
                console.log('taking the drone down half meter');
                drone.down(0.2);
                setTimeout(() => {
                    drone.stop();
                    clearTimeout();
                },2000);
            break;
            case "GOLEFT":
                console.log('taking the drone left 1 meter');
                drone.left(0.1);
                setTimeout(() => {
                    drone.stop();
                    clearTimeout();
                },1000);
            break;
            case "GORIGHT":
                console.log('taking the drone right 1 meter');
                drone.right(0.1);
                setTimeout(() => {
                    drone.stop();
                    clearTimeout();
                },1000);
            break;
            case "TURN":
                console.log('turning the drone');
                drone.clockwise(0.4);
                setTimeout(() => {
                    drone.stop();
                    clearTimeout();
                },2000);
            break;            
            case "GOFORWARD":
                console.log('moving the drone forward by 1 meter');
                drone.front(0.1);
                setTimeout(() => {
                    drone.stop();
                    clearTimeout();
                },2000);
            break;
            case "GOBACKWARD":
                console.log('moving the drone backward 1 meter');
                drone.back(0.1);
                setTimeout(() => {
                    drone.stop();
                    clearTimeout();
                },2000);
            break;
            case "STOP":
                drone.stop();
            break;
            default:
            break;        
        }
    }
    res.send('OK');
});

app.use('/',router);

app.listen(process.env.port || 3000);


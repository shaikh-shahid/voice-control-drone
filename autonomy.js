const express = require('express');
const bodyparser = require('body-parser');
const arDrone = require('ar-drone');
const control = require('ardrone-autonomy');
const router = express.Router();
const app = express();
const commands = ['takeoff', 'land','up','down','goleft','goright','turn','goforward','gobackward','stop'];

var client  = arDrone.createClient();
var controller = control.control(client, {debug: false});

// disable emergency
client.disableEmergency();
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
                client.takeoff();
                controller.zero();
            break;
            case "LAND":
                console.log('landing the drone');
                client.land();
            break;
            case "UP":
                console.log('taking the drone up 1 meter up');
                controller.up(0.5,(err,data) => {
                    if(err) {
                        client.stop();
                        client.land();
                    }
                })
            break;
            case "DOWN":
                console.log('taking the drone down 1 meter');
                controller.down(0.5,(err,data) => {
                    if(err) {
                        client.stop();
                        client.land();
                    }
                })
            break;
            case "GOLEFT":
                console.log('taking the drone left half meter');
                controller.left(0.5,(err,data) => {
                    if(err) {
                        client.stop();
                        client.land();
                    }
                })
            break;
            case "GORIGHT":
                console.log('taking the drone right half meter');
                controller.right(0.5,(err,data) => {
                    if(err) {
                        client.stop();
                        client.land();
                    }
                })
            break;
            case "TURN":
                console.log('turning the drone');
                controller.cw(90).run((err, data) => {
                    if(err) {
                        client.client().stop();
                        client.client().land();
                    }
                });
            break;            
            case "GOFORWARD":
                console.log('moving the drone formward by 1 meter');
                controller.forward(1,(err,data) => {
                    if(err) {
                        client.stop();
                        client.land();
                    }
                })
            break;
            case "GOBACKWARD":
                console.log('moving the drone backward by 1 meter');
                controller.backward(1,(err,data) => {
                    if(err) {
                        client.stop();
                        client.land();
                    }
                })
            break;
            case "STOP":
                controller.hover(5000,(err,data) => {
                    if(err) {
                        client.stop();
                        client.land();
                    }
                })
            break;
            default:
            break;        
        }
    }
    res.send('OK');
});

app.use('/',router);

app.listen(process.env.port || 3000);


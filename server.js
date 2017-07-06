/**
 * Created by ss7690 on 7/27/15.
 */
// set up ========================
var express  = require('express');
var app      = express();                               // create our app w/ express
var mongoose = require('mongoose');                     // mongoose for mongodb
var morgan = require('morgan');             // log requests to the console (express4)
var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
// Twilio Credentials
var accountSid = 'AC76e4aea4e3e6f2aa4a6969e44dbb6b8b';
var authToken = 'e7301a8db1e947e2590be9f610d79878';
var twilioClient = require('twilio')(accountSid, authToken);
// configuration =================

//mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
mongoose.connect('mongodb://localhost/ypteamer');

app.use(express.static(__dirname + '/app'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());



// define model =================
var Player = mongoose.model('Player', {
    name : String,
    point: Number
});

var GameSchema = new mongoose.Schema(
    {
        gameDate:Date,
        players:[{type: mongoose.Schema.Types.ObjectId, ref: 'Player'}]
    }
)




// api ---------------------------------------------------------------------


// create Player and send back all players after creation
app.post('/api/game/create', function(req, res) {

    //var game = new GameSchema({gameDate:req.body.gameDate,players:req.body.players});
    var Game =  mongoose.model('game', GameSchema);
    var game = new Game();
    game.gameDate = req.body.gameDate;
    console.log("req.body");
    console.log(req.body);

    game.save(function(err,doc) {
        if (err) {
            res.send(err);
        }
        for (var i = 0; i < req.body.players.length; i++) {
            doc.players.push(req.body.players[i].id);
        }
        doc.save(function(err){
            if (err) {
                res.send(err);
            }
        })
        res.json(doc);
    });

});



// get all players
app.get('/api/players', function(req, res) {

    // use mongoose to get all players in the database
    Player.find(function(err, players) {

        // if there is an error retrieving, send the error. nothing after res.send(err) will execute
        if (err)
            res.send(err)

        res.json(players); // return all players in JSON format
    });
});



// get all players
app.get('/api/players/today', function(req, res) {
    var Game =  mongoose.model('game', GameSchema);
    Game.find({}).sort({gameDate:-1}).limit(1).exec(function(err, docs) {
        var todayGame = docs[0];
        if(todayGame) {
            Player.find()
                .where('_id').in(todayGame.players)
                .exec(function (err, docs) {
                    res.json(docs);
                })
        }
    });
});



// create Player and send back all players after creation
app.post('/api/player/create', function(req, res) {

    // create a player, information comes from AJAX request from Angular
    Player.create({
        name : req.body.name,
        point: req.body.point,
        done : false
    }, function(err, player) {
        if (err)
            res.send(err);

        // get and return all the players after you create another
        Player.find(function(err, players) {
            if (err)
                res.send(err)
            res.json(players);
        });
    });

});



// delete a player
app.delete('/api/player/delete/:player_id', function(req, res) {
    Player.remove({
        _id : req.params.player_id
    }, function(err, player) {
        if (err)
            res.send(err);

        // get and return all the players after you create another
        Player.find(function(err, players) {
            if (err)
                res.send(err)
            res.json(players);
        });

    });
});


app.post('/api/send/sms', function(req,res){

    //var body = req.body.content;
    var body = req.body.content;
    var phone = req.body.phoneNumber;
    twilioClient.sendMessage({
        to: phone,
        from: "+18182104334 ",
        body:body
    }, function(err, message) {
        console.log(err);
    });
});


// application -------------------------------------------------------------
app.get('*', function(req, res) {
    res.sendfile('./app/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

// listen (start app with node server.js) ======================================
app.listen(7690);
console.log("App listening on port 7690");
/**
 * Created by rishabhkhanna on 10/10/16.
 */
const express = require('express');
const http = require('http');
const socket = require('socket.io');
const path = require('path');
const app = express();

const server = http.Server(app);
const io = socket(server);

const bodyparser = require('body-parser');

const getchats = require('./getchat');

let people = {};

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyparser.json());

io.on('connection' , (socket)=>{

    socket.on('setuser' , (username) =>{

        people[username] = {
            name : username,
            id : socket.id ,
            socket: socket
        };

        // console.log(people);

    });

    socket.on("addmsg" , (msg)=>{

        io.emit("chat" , { username : msg.username ,
                               msg:  msg.msg});

    });
    console.log(" id : " + socket.id);

});

app.post('/getchats' , (req , res)=>{


    getchats.getchat((rows)=>{
        // console.log(rows[0].fromuser);

        res.send(rows);

         console.log("again ");
    })



});

app.post('/savechats' , (req , res) =>{

    let username = req.body.username;
    let msg = req.body.msg ;
    // console.log(username);
    // console.log(msg);
     getchats.savechat(username , msg , ()=>{

     })

});


app.use('/' , express.static(__dirname + "/public"));

server.listen(3000 , ()=>{

   console.log("server started at localhost : 3000");

});
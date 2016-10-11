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
let peeps = [];
let userid  = {};

// parse application/x-www-form-urlencoded
app.use(bodyparser.urlencoded({ extended: true}));

// parse application/json
app.use(bodyparser.json());

//io connect
io.on('connection' , (socket)=>{

    socket.on('setuser' , (username) =>{

        console.log(username);
        people[username] = {
            name : username,
            id : socket.id ,
            socket: socket
        };
        userid[socket.id] = username;
        console.log(peeps);
        io.emit('users' , userid);

    });

    socket.on("addmsg" , (msg)=>{

        io.emit("chat" , { username : msg.username , msg:  msg.msg});

    });
    console.log(" id : " + socket.id);

    //io disconnect
    socket.on('disconnect' , ()=>{
        delete userid[socket.id];
        io.emit('users' , userid);
    });

});




app.post('/getchats' , (req , res)=>{


    getchats.getchat((rows)=>{

        console.log(rows[0].fromuser);

        res.send(rows);

         console.log("again ");
    })



});

app.post('/savechats' , (req , res) =>{

    let username = req.body.username;
    let msg = req.body.msg ;
     getchats.savechat(username , msg , ()=>{
     })

});


app.use('/' , express.static(__dirname + "/public"));

server.listen(3000 , ()=>{

   console.log("server started at localhost : 3000");

});
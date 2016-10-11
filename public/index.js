/**
 * Created by rishabhkhanna on 10/10/16.
 */

var socket = io();
var username = "anonymous";
var next = "";
$(function () {

    $('.chats').hide();
    $('.online').hide();


    //add userç
    $('#adduser').click(function () {

        console.log("hello add user button");


         username = $('#username').val();

        socket.emit("setuser" , username);

        $('.username').hide(200);

        $.post('/getchats' ,{username : username}, function(rows){
            var list = "";
            next = rows.length;
            for(var i = 0 ; i < rows.length ; i ++){
                if(i%2 == 0) {
                    list += ("<div class='row'><div class='col s12'><div class='card blue-grey left'><div class='card-title' ><li><span><div class='chip' >"
                    + rows[i].fromuser + "</div></div> " + rows[i].message + "</li></div></div></div>");
                }else{
                    list += ("<div class='row'><div class='col s12'><div class='card blue-grey right'><div class='card-title' ><li><span><div class='chip' >"
                    + rows[i].fromuser + "</div></div> " + rows[i].message + "</li></div></div></div>");
                }
            }
            $('#chat-ul').html(list);
            $('.chats').show(200);
            $('.online').show(200);
        })

    });


// addmessage button whn clicked

    $('#addmsg').click(function () {
        var msg = $('#message').val();
        $.post('/savechats' ,{msg : msg , username : username} , function (rows) {
        } );
        socket.emit("addmsg" , {username : username , msg : msg});
    });

    socket.on('chat' , function(chatmsg){

        if((next)%2 == 0 ) {
            $('#chat-ul').append("<div class='row'><div class='col s12 '><div class='card blue-grey left'><div class='card-title' ><li><span><div class='chip' >" + chatmsg.username + "</div></div> " + chatmsg.msg + "</li></div></div></div>");
        }else {
            $('#chat-ul').append("<div class='row'><div class='col s12 '><div class='card blue-grey right'><div class='card-title' ><li><span><div class='chip' >" + chatmsg.username + "</div></div> " + chatmsg.msg + "</li></div></div></div>");
        }
        next = next + 1;
    });

    socket.on('join' , function (username) {
        alert(username + "joined the chat room");
    });

    socket.on('users' , function (people) {


        var online = "<div class = 'collection-header'>Online People</div>";
        for(var user in people){
            online += ("<div class='collection-item'>" + people[user] + "</div>" );
            console.log(people[user]);
        }

        $('.collection').html(online);

    });


});




/**
 * Created by rishabhkhanna on 10/10/16.
 */

var socket = io();
var username = "Anonymous";

$(function () {

    $('.chats').hide();
    var username = "anonymous";

    $('#adduser').click(function () {

        console.log("hello add user button");


         username = $('#username').val();

        socket.emit("setuser" , username);

        $('.username').hide(200);

        $.post('/getchats' ,{username : username}, function(rows){

            var list = "";
            for(var i = 0 ; i < rows.length ; i ++){
                list += ("<li>"  +rows[i].fromuser + " : " + rows[i].message + "</li>");
            }
            $('#chat-ul').html(list);

            $('.chats').show(200);
        })

    });


    $('#addmsg').click(function () {
        var msg = $('#message').val();

        $.post('/savechats' ,{msg : msg , username : username} , function (rows) {
        } );

        socket.emit("addmsg" , {username : username , msg : msg});
    });



    socket.on('chat' , function(chatmsg){
        $('#chat-ul').append("<li>" + chatmsg.username + ": " + chatmsg.msg + "</li>");
    })


});




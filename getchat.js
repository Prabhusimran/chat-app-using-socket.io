/**
 * Created by rishabhkhanna on 11/10/16.
 */
const mysql = require('mysql');

function getconnection() {

    return mysql.createConnection({
        host: 'localhost',
        user: 'chatuser',
        password: 'beyblade',
        database: 'chatapp'
    });

}

module.exports  = {

    getchat : (cb) =>{

        var connection = getconnection();

        query = "select * from chats"

        connection.query(query , (err , rows , fields)=>{
            if(err) throw err;

            cb(rows);

        });

        connection.end();
    },

    savechat : (from , msg ,cb) =>{
        var connection = getconnection();

        query = "insert into chats(fromuser , message) values('"+ from + "', '" + msg + "');";
        console.log(query);
        connection.query(query , (err , row , fields)=>{
            if(err) throw err;

            cb();
        });

        connection.end();
    }
};
const express = require('express');
const {createServer} = require('node:http');
const {Server} = require('socket.io');
const app = express();
const {join} = require('node:path');

const server = createServer(app);

const io = new Server(server, {
    connectionStateRecovery: {},
});
  
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: '127.0.0.1',
  database: 'easierjustice',
  user: 'root',
  password: 'testfares',
});

app.get('/', (req, res) => {
   res.sendFile(join(__dirname, 'index.html'));
});

io.on('connection', socket => {
  
  console.log("user connected with the serer");
  
  socket.on('get_user_message', (senderId,recievedId) => {
    
    console.log(recievedId , senderId);

    let result;
    const query =
      'SELECT * FROM easierjustice.message WHERE ( sender_id = ' +
      senderId +
      ' AND receiver_id = ' +
      recievedId +
      ' ) OR (sender_id = ' +
      recievedId +
      ' AND receiver_id = ' +
      senderId +
      ') ORDER BY sent_at ASC;';
    
    try {
      connection.query(query, (err, rows, fields) => {
        if (err) throw err;
        if (rows.length == 0) {
          result = 0;
        }
        console.log(rows)  
        socket.emit('users_messages', rows); 
      });
    } catch (err) {
      return;
    }

  });


   if (!socket.recovered) {
    // if the connection state recovery was not successful
    try {
        const query =
          'SELECT * FROM easierjustice.message WHERE ( sender_id = ' +
         7 +
          ' AND receiver_id = ' +
          70 +
          ' ) OR (sender_id = ' +
         70 +
          ' AND receiver_id = ' +
          7 +
          ') ORDER BY sent_at ASC;';
      
      connection.query(query, (err, rows, fields) => {
         if (err) throw err;
         if (rows.length == 0) {
           result = 0;
         }
         socket.emit('users_messages', rows);
       });
    } catch (e) {
      // something went wrong
    }
  }
  
  socket.emit('new_message', ['messgaeone', 'messagetwo']);

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

server.listen(3100, () => {
  console.log('socket io messagin server in port 3100');
});

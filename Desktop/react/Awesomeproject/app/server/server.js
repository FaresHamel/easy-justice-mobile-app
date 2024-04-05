const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '127.0.0.1',
  database: 'easierjustice',
  user: 'root',
  password: 'testfares',
});

const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.raw());

//finished
app.post('/send', async (req, res) => {
  
  const senderId = req.body.senderId;
  const receiverId = req.body.receiverId;
  const content = req.body.content;
  const sent_at = req.body.sent_at;
 
  const getChatId =
    'SELECT id FROM easierjustice.chats WHERE ( sender_id = ' +
    senderId +
    ' AND recieved_id = ' +
    receiverId +
    ' ) OR ( sender_id = ' +
    receiverId +
    ' AND recieved_id = ' +
    senderId +
    ');';
 
  try {
   
    connection.query(getChatId, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length === 0) {
        const result = connection.query(
          'INSERT INTO `easierjustice`.`chats` (`recieved_id`, `sender_id`) VALUES (' +
            senderId +
            ', ' +
            receiverId +
            ');',
        );
      }
      const chatId = rows[0].id;

      if (chatId) {
        const result = connection.query(
          " INSERT INTO `easierjustice`.`message` (`sender_id`,`receiver_id`, `content`, `sent_at`, `chatId`) VALUES  ('" +
            senderId +
            "','" +
            receiverId +
            "','" +
            content +
            "','" +
            sent_at +
            "','" +
            chatId +
            "')",
        );
        res.status(200).send({message: 'Message sent successfully!'});
      }
    });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).send({message: 'Error sending message'});
  }
});

//finished this router
app.get('/getLowData', (req, res) => {
  const title = req.query.title;
  const queryData =
    'SELECT * FROM  easierjustice.law WHERE title = "' + title + '";';

  try {
    connection.query(queryData, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length !== 1) {
        res.status(401).send('Invalid username or password');
      }
      console.log(rows[0]);
      res.send(rows[0]);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

app.get('/chats', async (req, res) => {
  const userId = req.query.userId;

  const queryChatId =
    'SELECT * FROM easierjustice.chats WHERE sender_id = ' +
    userId +
    ' OR recieved_id = ' +
    userId +
    ';';
  try {
    connection.query(queryChatId, (err, result, fields) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send('create new chat please');
      } else {
        if (result.length == 1) {
          let queryMessages_one =
            'SELECT content AS content , sender_id , receiver_id FROM message  WHERE chatId = ' +
            result[0].id;

          // ('ORDER BY sent_at DESC');
          connection.query(queryMessages_one, (err, rowsOne, fields) => {
            if (err) throw err;
            if (rowsOne.length == 0) return "please it's empty";
            console.log(rowsOne[0]);
          });
        } else {
          for (let index = 0; index < result.length; index++) {
            let queryMessages_two =
              'SELECT content AS content , sender_id , receiver_id FROM message WHERE chatId  = ' +
              result[index].id +
              ' ORDER BY sent_at DESC';
            connection.query(queryMessages_two, (err, rowsTwo, fields) => {
              if (err) throw err;
              if (rowsTwo.length == 0) return "please it's empty";
              console.log(rowsTwo, 'this is the result of on index');
            });
          }
        }
      }
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});
//finished
app.get('/messages', (req, res) => {
  const senderId = req.query.senderId;
  const recievedId = req.query.recievedId;
  
  
  console.log(senderId, recievedId)
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
        console.log("makayen walo");
        res.status(200);
      }
      console.log(rows);
      res.send(rows);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

app.get('/lawyers', (req, res) => {
  const query = 'SELECT * FROM easierjustice.users WHERE type = "محامي"';
  try {
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length == 0) {
        res.status(200).send({message: 'no data'});
      }
      res.send(rows);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});
app.get('/judiciel', (req, res) => {
  const query = 'SELECT * FROM easierjustice.users WHERE type = "محضر قضائي"';
  try {
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length == 0) {
        res.status(200);
      }
      res.send(rows);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});
app.get('/notary', (req, res) => {
  const query = 'SELECT * FROM easierjustice.users WHERE type = "موثق"';
  try {
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length == 0) {
        res.status(200);
      }
      res.send(rows);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});
app.get('/clerk', (req, res) => {
  const query = 'SELECT * FROM easierjustice.users WHERE type = "كاتب عمومي"';
  try {
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length == 0) {
        res.status(200);
      }
      res.send(rows);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

app.get('/search', (req, res, next) => {
  const fullnamesearch = req.query.fullnamesearch;
  const query =
    "SELECT * FROM users WHERE (CONCAT(name, ' ', lastname) LIKE '" +
    fullnamesearch +
    "') OR (CONCAT(lastname, ' ',name ) LIKE '" +
    fullnamesearch +
    "');";
  try {
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length == 0) {
        res.status(200).send({resul: 'no data'});
        return;
      }
      res.send(rows);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});

app.post('/signIn', async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);

  const query =
    "SELECT * FROM easierjustice.users WHERE email = '" +
    email +
    "' && password = '" +
    password +
    "';";
  try {
    
    connection.query(query, (err, rows, fields) => {
      if (err) throw err;
      if (rows.length !== 1) {
        console.log(rows);
        res.send("not user name");
      }
      console.log(rows[0]);
      res.send(rows[0]);
    });
  } catch (err) {
    res.status(500).send('Internal server error');
  }
});


app.post("/verification",async (req, res) => {
  
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;

  const verificationQuery =  "SELECT * FROM easierjustice.users WHERE email = '" +
    email +
    "' OR phone = '" +
    phoneNumber +
    "';";
  
     try {
       connection.query(verificationQuery, (err, rows, fields) => {
         if (err) throw err;
         if (rows.length == 1) {
           res.status(200).send({ result: 1 });
           return;
         }
         res.status(200).send({ result: 0 });
         return;
       });
     } catch (err) {
       res.status(500).send('Internal server error');
     }

});

app.post('/signup', async (req, res) => {
  
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const phoneNumber = req.body.phoneNumber;
  const email = req.body.email;
  const password = req.body.password;
  
  const insertionQuery = "INSERT INTO easierjustice.users (name, lastname, email, phone, password) VALUES ( '" +
    firstname +
    "', '" +
    lastname +
    "', '" +
    email +
    "', '" +
    phoneNumber +
    "', '" +
    password +
    "');";
  
   const newUser = 'SELECT * FROM easierjustice.users WHERE email = "'+email +'" OR phone = "'+phoneNumber+'";';
  try {
    const result = await connection.query(insertionQuery);
    // const res = await connection.query(newUser);

     connection.query(newUser, (err, rows, fields) => {
       if (err) throw err;
       if (rows.length == 1) {
         res.send(rows[0]);
         return;
       }
     });
  } catch (error) {
    console.error('Error inserting data:', error);
    res.status(500).json({message: 'Error: Data insertion failed!'});
  }
});

const getChatList = userId => {
  const queryChatId =
    'SELECT * FROM easierjustice.chats WHERE userOne = ' +
    userId +
    ' OR userTwo = ' +
    userId +
    ';';

  try {
  } catch (error) {}
};

app.listen(3000, () => {
  console.log('server of login and sign up in port 3000');
});

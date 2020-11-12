const express = require('express');
app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);
users = {};
const sql = require('mssql');

// config for your database
var config = {
	user: 'cideveloper',
	password: 'Ciuser@2020',
	server: '192.168.1.33',
	database: 'ERP',
};

//Connect to the Database Instance
var cp = new sql.ConnectionPool(config);
cp.connect(err => {
	if(err) {
		console.log("Database error message +++++++++ " + err);
	} else {
		console.log('Connected');
	}
})

app.get('/', function (req, res) {});

io.on('connection', function (socket) {
	socket.join('some room');
	io.to('some room').emit('some event');
	// socket.broadcast.to('the-unique-room-name').emit('message', 'blah')

	// // Listen for sharingWork
	// socket.on('sharingWork', (userName) => {
	// 	// connect to your database
	// 	sql.connect(config, function (err) {
	// 		if (err) console.log(err);

	// 		// create Request object
	// 		var request = new sql.Request(cp);
	// 		let query = 'exec spGetDocumentsharings';
	// 		console.log(query);
	// 		// query to the database and get the records
	// 		request.query(query, function (err, recordset) {
	// 			if (err) {
	// 				console.log(err);
	// 				sql.close();
	// 			}
	// 			sql.close();
	// 			io.emit('notification', recordset);
	// 		});
	// 	});
	// });

	socket.on('sendingMessage', (recipientId) => {
		if(recipientId in users) {
			io.to(users[recipientId]).emit('message', 'testttt');
			alert('testttt')
			console.log('1', users);
		} else {
			// callback(true);
			 socket.broadcast.emit('message', 'testttt')
			 users[recipientId] = socket.id;
			 console.log(users[recipientId]);
			 io.to(users[recipientId]).emit('message', 'testttt');
			 alert('testttt')
			 console.log('2', users);
		}	
	});


	// socket.on('sendingMessage', (content, recipientId) => {
	// 	console.log(socket.id);
	// 	// connect to your database
	// 	sql.connect(config, function (err) {
	// 		if (err) console.log(err);

	// 		// create Request object
	// 		var request = new sql.Request();

	// 		let query =
	// 			"exec spGetMessagesBetweenTwoUsers @SenderUserId='" +
	// 			recipientId +
	// 			"', @RecipientUsername='" +
	// 			userName +
	// 			"';";
	// 		console.log(query);
	// 		// query to the database and get the records
	// 		request.query(query, function (err, recordset) {
	// 			if (err) {
	// 				console.log(err);
	// 				sql.close();
	// 			}

	// 			sql.close();
	// 			io.to(recipientId).emit('message', recordset);
	// 		});
	// 	});
	// });
});
// app.get('/', function (req, res) {
// 	res.send('<h1>Hello world</h1>');
// });

http.listen(3000, function () {
	console.log('listening on *:3000');
});

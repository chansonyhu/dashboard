// import mysql from 'mysql';
var mysql = require('mysql');
// import express from 'express';
// import session from 'express-session';
// import bodyParser from 'body-parser';
// import path from 'path';


// console.log(path.join(__dirname + '/signin.html'));


// console.log('express start');
// var app = express();
// console.log('express finish');
// app.use(session({
// 	secret: 'secret',
// 	resave: true,
// 	saveUninitialized: true
// }));
// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());

// app.get('/', function(request, response) {
// 	console.log(path.join(__dirname + '/signin.html'));
// 	response.sendFile(path.join(__dirname + '/signin.html'));
// });

var attempt = 3; // Variable to count number of attempts.
// Below function Executes on click of login button.

export function validate() {
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '941216yqs',
		database : 'nodelogin'
	});

	// var username = document.getElementById("username").value;
	// var password = document.getElementById("password").value;
	// if ( username == "Formget" && password == "formget#123"){
	// alert ("Login successfully");
	// window.location = "success.html"; // Redirecting to other page.
	// return false;
	// }
	// else{
	// attempt --;// Decrementing by one.
	// alert("You have left "+attempt+" attempt;");
	// // Disabling fields after 3 attempts.
	// if( attempt == 0){
	// document.getElementById("username").disabled = true;
	// document.getElementById("password").disabled = true;
	// document.getElementById("submit").disabled = true;
	// return false;
	// }
	// }

	console.log('validate function');

	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	console.log(username, '\n', password);
	if (username && password) {
		// window.location = "index.html"; 

		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				location = "/00-app_info.html";
				request.session.loggedin = true;
				request.session.username = username;
				// response.redirect('/index.html');
			} else {
				alert('Incorrect Username and/or Password!');
			}			
			// response.end();
		});
	} else {
		alert('Please enter Username and Password!');
		// response.end();
	}
};

// app.get('/index.html', function(request, response) {
// 	if (request.session.loggedin) {
// 		response.send('Welcome back, ' + request.session.username + '!');
// 	} else {
// 		response.send('Please login to view this page!');
// 	}
// 	response.end();
// });

// app.listen(30000);

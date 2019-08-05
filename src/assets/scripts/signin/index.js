import * as $ from 'jquery';
import cookie from 'cookie';

(function f() {	
	console.log('login_btn');
	//document.getElementById("login_btn").addEventListener("click", validate);

	if(document.referrer===undefined) {
		console.log('undefined referer');
		// document.referer = 'http://35.198.243.111:3001';
		// location = '/';
	}
	$("#login_btn").click(function(){
		console.log('validate');
		validate();
	});
} ());

function validate() {
	var username = document.getElementById("dash_username").value;
	var password = document.getElementById("dash_password").value;
	console.log('usr: ', username, '\npwd: ', password);
	if (username && password) {
		console.log('authenticate');
		$.getJSON('/assets/static/data/user.json', function(data){
			console.log(data[username]);
			console.log(password);
			if (data[username] === password) {
				location = "/00-app_info.html";
				$('#usr_name').append(username);
				console.log('enter main page');
				window.usr = username;
				document.usr =username;
				//$.cookie("a","12");
				// response.redirect('/index.html');
			} else {
				alert('Incorrect Username and/or Password!');
			}
		});
	} else {
		alert('Please enter Username and Password!');
	}
};
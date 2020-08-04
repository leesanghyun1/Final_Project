var fs = require('fs');
var ejs = require('ejs');
var http = require('http');
var mysql = require('mysql');
var express = require('express');
var bodyParser = require('body-parser');

var mySqlClient = mysql.createConnection({
	user : 'root',
	password : 'admin',
	database : 'company'
});

var app = express();

http.createServer(app).listen(8000, function(){
	console.log('Server running at http://127.0.0.1:8000');
});

app.get( '/', function(req, res){
	
	fs.readFile('list.html', 'utf8', function(error, data){
		if(error){
			console.log('readFile Error');
		}else{
			mySqlClient.query('select * from products', function(error, results){
				if(error){
					console.log('error : ', error.message);
				}else{
					res.send( ejs.render(data, {
						prodList : results
					}));
				}
			});
		}
	})
});

app.get('/delete/:id', function(req, res){
	mySqlClient.query('delete from products where id = ?', [req.params.id], 
			function(error, result){
				if(error){
					console.log('delete Error');
				}else{
					console.log('delete id = %d', req.params.id);
					res.redirect('/');				
				}
			});
});

app.get('/insert', function(req, res){
	fs.readFile('insert.html', 'utf8', function(error, data){
		if(error){
			console.log('readFile Error');
		}else{
			res.send(data);
		}
	})
});

app.get( '/edit/:id', function(req, res){
	fs.readFile( 'edit.html', 'utf8', function(error, data){
		mySqlClient.query('select * from products where id = ?', [req.params.id], 
				function(error, result){
					if(error){
						console.log('readFile Error');
					}else{
						res.send( ejs.render(data, { 
							product : result[0] 
						}));
					}
				});
	});
});

app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
app.post( '/insert', function(req, res){
	var body = req.body;
	
	mySqlClient.query( 'insert into products(name, modelnumber, series) values(?, ?, ?)',
			[ body.name, body.modelnumber, body.series ], 
			function(error, result){
				if(error){
					console.log('insert error : ', error.message );
				}else{
					res.redirect('/');
				}
	});
});

app.post( '/edit/:id', function(req, res){
	var body = req.body;
	
	mySqlClient.query( 'update products set name=?, modelnumber=?, series=? where id=?',
			[ body.name, body.modelnumber, body.series, body.id ], 
			function(error, result){
				if(error){
					console.log('update error : ', error.message );
				}else{
					res.redirect('/');
				}
	});
});
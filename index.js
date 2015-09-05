var app = require( "express" )();
var http = require( "http" ).Server( app );
var io = require( "socket.io" )( http );
var express = require( "express" );

// serve static files
app.use( "/static", express.static( "static" ) );

// route
app.get( "/", function( req, res ) {

	res.sendFile( __dirname + "/index.html" );

} );

// socket.io connection
io.on( "connection", function( socket ) {

	console.log( "a user connected" );
	io.emit( "chat message", "a user connected" );

	socket.on( "chat message", function( msg ) {

		console.log( "message: " + msg );
		io.emit( "chat message", msg );

	} );

	socket.on( "disconnect", function() {

		console.log( "user disconnected" );
		io.emit( "chat message", "a user disconnected" );

	} );

} );

// server listen on port 3000
http.listen( process.env.PORT || 5000, function() {

	console.log( "Listening on *:5000" );

} );